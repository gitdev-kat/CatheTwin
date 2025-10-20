'use server'

import { getIndex } from '@/lib/upstash'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

interface QueryResult {
  id: string
  score: number
  title?: string
  excerpt?: string
  metadata?: Record<string, any>
}

interface QueryResponse {
  results: QueryResult[]
  answer: string
  context: string
}

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
 * Server action: Query the digital twin knowledge base
 */
export async function queryDigitalTwin(
  question: string,
  topK: number = 5
): Promise<QueryResponse> {
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
