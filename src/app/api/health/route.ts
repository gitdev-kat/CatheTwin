import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Digital Twin RAG API is running',
    endpoints: {
      query: 'POST /api/query - Query the knowledge base',
      embed: 'POST /api/embed - Add documents',
      reindex: 'POST /api/reindex - Reindex from JSON',
      health: 'GET /api/health - Health check',
    },
  })
}
