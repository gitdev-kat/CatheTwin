'use server'

import { getIndex } from '@/lib/upstash'

interface AddDocumentInput {
  id: string
  title: string
  text: string
  tags?: string[]
  metadata?: Record<string, any>
}

interface AddDocumentResponse {
  success: boolean
  message: string
  id: string
}

/**
 * Server action: Add a document to the knowledge base
 */
export async function addDocument(
  doc: AddDocumentInput
): Promise<AddDocumentResponse> {
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
