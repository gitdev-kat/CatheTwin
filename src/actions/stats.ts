'use server'

import { getIndex } from '@/lib/upstash'

interface IndexStats {
  vectorCount: number
  pendingVectorCount: number
  indexSize: number
  dimension: number
  similarityFunction: string
}

/**
 * Server action: Get index statistics
 */
export async function getIndexStats(): Promise<IndexStats> {
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
