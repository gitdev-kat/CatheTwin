'use server'

import { getIndex } from '@/lib/upstash'
import fs from 'fs'
import path from 'path'

interface ReindexResponse {
  success: boolean
  message: string
  indexed: number
}

/**
 * Server action: Reindex the entire knowledge base
 */
export async function reindexKnowledgeBase(
  adminKey: string
): Promise<ReindexResponse> {
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
