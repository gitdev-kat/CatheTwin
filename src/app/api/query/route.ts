import { NextRequest, NextResponse } from 'next/server'
import { getIndex } from '@/lib/upstash'

export const dynamic = 'force-dynamic'

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_MODEL = process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant'

type MatchResult = {
  id: string;
  score?: number;
  vector?: number[];
  metadata?: Record<string, any> | null;
  payload?: Record<string, any> | null;
}

type ProcessedMatch = {
  id: string;
  score: number | undefined;
  metadata: Record<string, any> | null;
  payload: Record<string, any> | null;
}

async function generateWithGroq(prompt: string) {
  if (!GROQ_API_KEY) return null

  const res = await fetch('https://api.groq.ai/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Groq error: ${res.status} ${text}`)
  }
  const data = await res.json()
  return (data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text) ?? null
}

export async function POST(req: NextRequest) {
  try {
    const { question, topK = 5 } = await req.json()
    if (!question) return NextResponse.json({ error: 'Missing question' }, { status: 400 })

    const idx = getIndex()
    const results = await idx.query({ data: question, topK, includeMetadata: true }) as unknown as MatchResult[]
    
    const matches: ProcessedMatch[] = results.map((m: MatchResult) => ({
      id: m.id,
      score: m.score,
      metadata: m.metadata ?? null,
      payload: m.payload ?? null,
    }))

    let answer: string | null = null
    if (GROQ_API_KEY && matches.length > 0) {
      const context = matches
        .map((m: ProcessedMatch) => `${m.metadata?.title ?? m.id}: ${m.metadata?.content ?? m.payload?.text ?? ''}`)
        .join('\n\n')

      const prompt = `Based on the following information about the person, answer the question in first person.\n\nContext:\n${context}\n\nQuestion: ${question}\n\nAnswer:`
      try {
        answer = (await generateWithGroq(prompt)) ?? null
      } catch (e: any) {
        answer = `Groq generation failed: ${e.message}`
      }
    }

    // MCP envelope
    const envelope = {
      mcp: {
        version: '1.0',
        type: 'response',
        payload: { status: 'ok', results: matches, answer },
      },
    }

    return NextResponse.json(envelope)
  } catch (err: any) {
    return NextResponse.json({ mcp: { version: '1.0', type: 'response', payload: { status: 'error', message: err.message } } }, { status: 500 })
  }
}