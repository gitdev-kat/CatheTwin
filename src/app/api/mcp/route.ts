import { NextRequest, NextResponse } from 'next/server'
import { queryDigitalTwin } from '@/actions/query'
import { addDocument } from '@/actions/embed'
import { reindexKnowledgeBase } from '@/actions/reindex'
import { getIndexStats } from '@/actions/stats'

export const dynamic = 'force-dynamic'

/**
 * MCP HTTP Endpoint
 * Implements JSON-RPC 2.0 protocol for Model Context Protocol
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { jsonrpc, method, params, id } = body

    // Validate JSON-RPC 2.0 format
    if (jsonrpc !== '2.0') {
      return NextResponse.json({
        jsonrpc: '2.0',
        error: {
          code: -32600,
          message: 'Invalid Request: jsonrpc must be "2.0"',
        },
        id,
      })
    }

    // Handle different MCP methods
    switch (method) {
      case 'initialize':
        return NextResponse.json({
          jsonrpc: '2.0',
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              tools: {},
            },
            serverInfo: {
              name: 'digital-twin-mcp',
              version: '1.0.0',
            },
          },
          id,
        })

      case 'tools/list':
        return NextResponse.json({
          jsonrpc: '2.0',
          result: {
            tools: [
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
                  'Add or update a document in the digital twin knowledge base.',
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
                  },
                  required: ['id', 'title', 'text'],
                },
              },
              {
                name: 'get_index_stats',
                description:
                  'Get statistics about the digital twin knowledge base index',
                inputSchema: {
                  type: 'object',
                  properties: {},
                },
              },
            ],
          },
          id,
        })

      case 'tools/call':
        const { name, arguments: args } = params

        try {
          let result

          switch (name) {
            case 'query_digital_twin': {
              const { question, topK = 5 } = args
              result = await queryDigitalTwin(question, topK)
              break
            }

            case 'add_document': {
              const { id: docId, title, text, tags, metadata } = args
              result = await addDocument({
                id: docId,
                title,
                text,
                tags,
                metadata,
              })
              break
            }

            case 'get_index_stats': {
              result = await getIndexStats()
              break
            }

            default:
              return NextResponse.json({
                jsonrpc: '2.0',
                error: {
                  code: -32601,
                  message: `Tool not found: ${name}`,
                },
                id,
              })
          }

          return NextResponse.json({
            jsonrpc: '2.0',
            result: {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2),
                },
              ],
            },
            id,
          })
        } catch (error) {
          return NextResponse.json({
            jsonrpc: '2.0',
            error: {
              code: -32603,
              message:
                error instanceof Error ? error.message : 'Internal error',
            },
            id,
          })
        }

      case 'ping':
        return NextResponse.json({
          jsonrpc: '2.0',
          result: {
            status: 'ok',
            message: 'Digital Twin MCP Server is running',
            timestamp: new Date().toISOString(),
          },
          id,
        })

      default:
        return NextResponse.json({
          jsonrpc: '2.0',
          error: {
            code: -32601,
            message: `Method not found: ${method}`,
          },
          id,
        })
    }
  } catch (error) {
    console.error('MCP endpoint error:', error)
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: -32700,
          message: 'Parse error',
        },
        id: null,
      },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'digital-twin-mcp',
    version: '1.0.0',
    description: 'Digital Twin RAG MCP Server for interview preparation',
    protocol: 'Model Context Protocol (MCP)',
    endpoints: {
      http: '/api/mcp (POST)',
      methods: ['initialize', 'tools/list', 'tools/call', 'ping'],
    },
    tools: [
      'query_digital_twin',
      'add_document',
      'get_index_stats',
    ],
    status: 'online',
  })
}
