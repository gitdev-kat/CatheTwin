/**
 * Digital Twin MCP Server
 * 
 * This MCP server provides tools for querying and managing a RAG-based digital twin
 * using Upstash Vector and Groq LLM.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'
import { getIndex } from '@/lib/upstash'
import Groq from 'groq-sdk'
import fs from 'fs'
import path from 'path'

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Define the tools available through this MCP server
const TOOLS: Tool[] = [
  {
    name: 'query_digital_twin',
    description:
      'Query the digital twin knowledge base using RAG. Returns relevant documents and an AI-generated answer.',
    inputSchema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: 'The question to ask the digital twin',
        },
        topK: {
          type: 'number',
          description: 'Number of top results to return (default: 5)',
          default: 5,
        },
      },
      required: ['question'],
    },
  },
  {
    name: 'add_document',
    description:
      'Add or update a document in the digital twin knowledge base. The document will be embedded and stored in Upstash Vector.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier for the document',
        },
        title: {
          type: 'string',
          description: 'Document title',
        },
        text: {
          type: 'string',
          description: 'Document content/text to embed',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional tags for categorization',
        },
        metadata: {
          type: 'object',
          description: 'Additional metadata to store with the document',
        },
      },
      required: ['id', 'title', 'text'],
    },
  },
  {
    name: 'reindex_knowledge_base',
    description:
      'Reindex the entire knowledge base from the digitaltwin.json file. This will clear and rebuild the vector index.',
    inputSchema: {
      type: 'object',
      properties: {
        adminKey: {
          type: 'string',
          description: 'Admin API key for authorization',
        },
      },
      required: ['adminKey'],
    },
  },
  {
    name: 'get_index_stats',
    description: 'Get statistics about the digital twin knowledge base index',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
]

// Zod schemas for validation
const QueryInputSchema = z.object({
  question: z.string(),
  topK: z.number().optional().default(5),
})

const AddDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional(),
})

const ReindexSchema = z.object({
  adminKey: z.string(),
})

/**
 * Generate AI response using Groq
 */
async function generateWithGroq(
  question: string,
  context: string
): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant answering questions about a professional's digital twin (resume, skills, projects, interview prep). Use the provided context to answer accurately. If the context doesn't contain the answer, say so.`,
        },
        {
          role: 'user',
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return completion.choices[0]?.message?.content || 'No response generated'
  } catch (error) {
    console.error('Groq API error:', error)
    throw new Error(`Failed to generate response: ${error}`)
  }
}

/**
 * Query the digital twin knowledge base
 */
async function queryDigitalTwin(question: string, topK: number = 5) {
  try {
    const index = getIndex()

    // Query the vector database
    const results = await index.query({
      data: question,
      topK,
      includeMetadata: true,
      includeVectors: false,
    })

    // Extract context from results
    const context = results
      .map(
        (match, i) =>
          `[${i + 1}] ${match.metadata?.title || 'Untitled'}\n${match.metadata?.text || ''}`
      )
      .join('\n\n')

    // Generate AI response
    const answer = await generateWithGroq(question, context)

    return {
      results: results.map((match) => ({
        id: String(match.id),
        score: match.score,
        title: match.metadata?.title as string | undefined,
        excerpt: typeof match.metadata?.text === 'string' ? match.metadata.text.substring(0, 200) : undefined,
        metadata: match.metadata,
      })),
      answer,
      context,
    }
  } catch (error) {
    console.error('Query error:', error)
    throw new Error(`Failed to query digital twin: ${error}`)
  }
}

/**
 * Add a document to the knowledge base
 */
async function addDocument(doc: z.infer<typeof AddDocumentSchema>) {
  try {
    const index = getIndex()

    await index.upsert({
      id: doc.id,
      data: doc.text,
      metadata: {
        title: doc.title,
        text: doc.text,
        tags: doc.tags,
        ...doc.metadata,
      },
    })

    return {
      success: true,
      message: `Document "${doc.title}" added successfully`,
      id: doc.id,
    }
  } catch (error) {
    console.error('Add document error:', error)
    throw new Error(`Failed to add document: ${error}`)
  }
}

/**
 * Reindex the entire knowledge base
 */
async function reindexKnowledgeBase(adminKey: string) {
  const ADMIN_KEY = process.env.ADMIN_API_KEY

  if (!ADMIN_KEY || adminKey !== ADMIN_KEY) {
    throw new Error('Unauthorized: Invalid admin key')
  }

  try {
    const index = getIndex()

    // Look for digitaltwin.json in multiple locations
    const possiblePaths = [
      path.join(process.cwd(), 'data', 'digitaltwin.json'),
      path.join(process.cwd(), '..', 'digitaltwin.json'),
      path.join(process.cwd(), '..', '..', 'digitaltwin.json'),
    ]

    let dataPath = ''
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        dataPath = p
        break
      }
    }

    if (!dataPath) {
      throw new Error(
        'digitaltwin.json not found in data/ or parent directories'
      )
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8')
    const data = JSON.parse(rawData)

    // Extract documents from the nested structure
    let documents = []
    if (data.documents) {
      documents = data.documents
    } else if (Array.isArray(data)) {
      documents = data
    } else {
      throw new Error('Invalid digitaltwin.json format')
    }

    // Reset the index (delete all and reindex)
    console.log(`Reindexing ${documents.length} documents...`)

    // Upsert documents in batches
    const batchSize = 10
    let indexed = 0

    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize)

      await Promise.all(
        batch.map((doc: any) =>
          index.upsert({
            id: doc.id,
            data: doc.content || doc.text,
            metadata: {
              title: doc.title,
              text: doc.content || doc.text,
              type: doc.type,
              tags: doc.tags,
              ...doc.metadata,
            },
          })
        )
      )

      indexed += batch.length
    }

    return {
      success: true,
      message: `Successfully reindexed ${indexed} documents`,
      indexed,
    }
  } catch (error) {
    console.error('Reindex error:', error)
    throw new Error(`Failed to reindex: ${error}`)
  }
}

/**
 * Get index statistics
 */
async function getIndexStats() {
  try {
    const index = getIndex()
    const info = await index.info()

    return {
      vectorCount: info.vectorCount || 0,
      pendingVectorCount: info.pendingVectorCount || 0,
      indexSize: info.indexSize || 0,
      dimension: info.dimension || 0,
      similarityFunction: info.similarityFunction || 'COSINE',
    }
  } catch (error) {
    console.error('Get stats error:', error)
    throw new Error(`Failed to get index stats: ${error}`)
  }
}

/**
 * Main MCP server setup
 */
async function main() {
  const server = new Server(
    {
      name: 'digital-twin-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  )

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: TOOLS,
    }
  })

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params

    try {
      switch (name) {
        case 'query_digital_twin': {
          const input = QueryInputSchema.parse(args)
          const result = await queryDigitalTwin(input.question, input.topK)
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          }
        }

        case 'add_document': {
          const input = AddDocumentSchema.parse(args)
          const result = await addDocument(input)
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          }
        }

        case 'reindex_knowledge_base': {
          const input = ReindexSchema.parse(args)
          const result = await reindexKnowledgeBase(input.adminKey)
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          }
        }

        case 'get_index_stats': {
          const result = await getIndexStats()
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          }
        }

        default:
          throw new Error(`Unknown tool: ${name}`)
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      }
    }
  })

  // Start the server
  const transport = new StdioServerTransport()
  await server.connect(transport)

  console.error('Digital Twin MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
