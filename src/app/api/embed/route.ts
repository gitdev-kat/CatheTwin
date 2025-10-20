import { NextRequest, NextResponse } from 'next/server'
import { getIndex } from '@/lib/upstash'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, text, tags, meta } = body
    if (!id || !text) {
      return NextResponse.json(
        { mcp: { version: '1.0', type: 'response', payload: { status: 'error', message: 'Missing id or text' } } },
        { status: 400 }
      )
    }

    const idx = getIndex()
    const item = { id, vector: [0], metadata: { title: title ?? '', tags: tags ?? [], ...meta }, payload: { text } }
    await idx.upsert([item])

    return NextResponse.json({ mcp: { version: '1.0', type: 'response', payload: { status: 'ok', id } } })
  } catch (err: any) {
    return NextResponse.json(
      { mcp: { version: '1.0', type: 'response', payload: { status: 'error', message: err.message } } },
      { status: 500 }
    )
  }
}
