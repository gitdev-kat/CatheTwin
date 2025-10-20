import { NextRequest, NextResponse } from 'next/server'
import { getIndex } from '@/lib/upstash'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const ADMIN_KEY = process.env.ADMIN_API_KEY ?? null

export async function POST(req: NextRequest) {
  try {
    if (ADMIN_KEY) {
      const headerKey = req.headers.get('x-admin-key')
      if (!headerKey || headerKey !== ADMIN_KEY) {
        return NextResponse.json(
          { mcp: { version: '1.0', type: 'response', payload: { status: 'error', message: 'Unauthorized' } } },
          { status: 401 }
        )
      }
    }

    const root = process.cwd()
    const candidates = [path.join(root, 'data', 'digitaltwin.json'), path.join(root, 'digitaltwin.json')]
    const filePath = candidates.find((p) => fs.existsSync(p))
    if (!filePath) {
      return NextResponse.json(
        { mcp: { version: '1.0', type: 'response', payload: { status: 'error', message: 'digitaltwin.json not found' } } },
        { status: 404 }
      )
    }

    const raw = fs.readFileSync(filePath, 'utf-8')
    const doc = JSON.parse(raw)
    const docs = Array.isArray(doc.documents) ? doc.documents : Array.isArray(doc) ? doc : []
    if (!docs || docs.length === 0) {
      return NextResponse.json(
        { mcp: { version: '1.0', type: 'response', payload: { status: 'error', message: 'No documents found to index' } } },
        { status: 400 }
      )
    }

    const idx = getIndex()
    const items = docs.map((d: any) => ({
      id: d.id ?? `doc-${Math.random().toString(36).slice(2, 9)}`,
      data: d.content ?? d.text ?? '',
      metadata: { 
        title: d.title ?? '', 
        type: d.type ?? '', 
        tags: d.tags ?? [],
        text: d.content ?? d.text ?? ''
      },
    }))
    await idx.upsert(items)

    return NextResponse.json({ mcp: { version: '1.0', type: 'response', payload: { status: 'ok', upserted: items.length } } })
  } catch (err: any) {
    return NextResponse.json(
      { mcp: { version: '1.0', type: 'response', payload: { status: 'error', message: err.message } } },
      { status: 500 }
    )
  }
}
