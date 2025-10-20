import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import Groq from 'groq-sdk'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Document {
  id: string
  title: string
  type: string
  content: string
  tags?: string[]
}

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
})

function loadProfile(): Document[] {
  try {
    // Try multiple possible locations
    const possiblePaths = [
      path.join(process.cwd(), 'digitaltwin.json'),
      path.join(process.cwd(), 'data', 'digitaltwin.json'),
      path.join(process.cwd(), '..', 'digitaltwin.json'),
    ]

    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
        return data.documents || []
      }
    }

    return []
  } catch (error) {
    console.error('Error loading profile:', error)
    return []
  }
}

function searchProfile(query: string, documents: Document[]): Document[] {
  const queryLower = query.toLowerCase()
  const matches: Array<{ score: number; doc: Document }> = []

  for (const doc of documents) {
    const content = doc.content?.toLowerCase() || ''
    const title = doc.title?.toLowerCase() || ''
    
    let score = 0
    const words = queryLower.split(/\s+/)
    
    for (const word of words) {
      if (word.length < 3) continue // Skip short words
      
      // Count occurrences in content
      const contentMatches = (content.match(new RegExp(word, 'g')) || []).length
      score += contentMatches * 2
      
      // Bonus for title matches
      if (title.includes(word)) {
        score += 5
      }
    }

    if (score > 0) {
      matches.push({ score, doc })
    }
  }

  // Sort by relevance and return top 5
  matches.sort((a, b) => b.score - a.score)
  return matches.slice(0, 5).map(m => m.doc)
}

function buildContext(query: string, documents: Document[]): string {
  const matches = searchProfile(query, documents)
  
  if (matches.length === 0) {
    return "No specific information found in Catherine's profile."
  }

  const contextParts: string[] = []
  for (const doc of matches) {
    contextParts.push(`[${doc.type.toUpperCase()}] ${doc.title}`)
    contextParts.push(doc.content)
    contextParts.push('')
  }

  return contextParts.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Load profile
    const documents = loadProfile()
    
    if (documents.length === 0) {
      return NextResponse.json({
        response: "I'm sorry, I couldn't load my profile data. Please make sure the digitaltwin.json file is properly configured."
      })
    }

    // Build context from profile
    const context = buildContext(message, documents)

        // Check if Groq is available
        if (!process.env.GROQ_API_KEY) {
          // Fallback to basic response
          return NextResponse.json({
            response: context === "No specific information found in Catherine's profile."
              ? "I don't have specific information about that in Catherine's profile. You can ask about her work experience, technical skills, education, or leadership roles."
              : `Based on Catherine's profile:\n\n${context}\n\nWould you like to know more about any specific aspect of her background?`
          })
        }    // Build messages for Groq
    const messages: Array<{ role: string; content: string }> = [
      {
        role: 'system',
        content: `You are CatheTwin, an AI assistant representing Catherine Dalafu, an AI Data Analyst Track student at Saint Paul University Philippines.

IMPORTANT: Speak in THIRD PERSON about Catherine Dalafu. Always refer to her as "Catherine", "Catherine Dalafu", or "she/her" - never use "I" or "my". You are her digital twin assistant introducing her to others.

Examples:
- "Catherine Dalafu is an AI Data Analyst Track student..."
- "She has experience with Python, MySQL, and data analysis..."
- "Catherine currently works remotely with AusBiz Consulting..."
- "Her technical skills include..."

Key information about Catherine:
- AI Data Analyst Track student at Saint Paul University Philippines
- Passionate about database management, Python, data analysis, and AI technologies
- Strong leader with experience in student government (PSG SITE Representative, JPCS Secretary)
- Completed internship at AusBiz Consulting Australia (August 2025 - October 2025)
- Dean's Lister maintaining excellence in academics and leadership
- Fluent in Filipino, intermediate in English
- Based in Tuguegarao City, Cagayan, Philippines
- Enjoys solving complex technical problems and mentoring others
- Proficient in Python (3 years), SQL/MySQL (3 years), Laravel, NodeJS, React

RESPONSE GUIDELINES:
- Be SPECIFIC and DIRECT - answer exactly what is asked
- Keep responses focused (2-3 sentences for simple questions, more detail only when specifically requested)
- Avoid generic statements - provide concrete details from the context
- If asked about a specific skill, project, or role, focus ONLY on that topic
- Don't add extra information unless it's directly relevant to the question
- Be friendly and professional, but prioritize clarity and precision to avoid misunderstandings`
      }
    ]

    // Add conversation history (last 8 messages)
    const recentHistory = history.slice(-8) as Message[]
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role,
        content: msg.content
      })
    }

    // Add current question with context
    messages.push({
      role: 'user',
      content: `Context from Catherine's profile:\n${context}\n\nQuestion: ${message}`
    })

    // Generate AI response
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content || 
      "I'm sorry, I had trouble generating a response. Please try again."

    return NextResponse.json({ response })

  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
