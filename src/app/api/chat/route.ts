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
    contextParts.push(`${doc.title}: ${doc.content}`)
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

    // Handle greetings
    const greetings = ['hi', 'hello', 'hey', 'hola', 'greetings']
    const messageLower = message.toLowerCase().trim()
    if (greetings.includes(messageLower)) {
      const greetingResponses = [
        "Hello! Catherine's having a productive day working on her digital twin project. She's been fine-tuning the RAG architecture and optimizing the vector database queries. How can I help you learn more about her?",
        "Hi there! Catherine spent her morning debugging some Python code and attending a JPCS meeting this afternoon. She's always excited to talk about AI and web development. What would you like to know?",
        "Hey! Catherine's been busy today with her coursework and student government duties. She just finished optimizing the chatbot's response time. Feel free to ask about her skills, projects, or experience!",
        "Hello! It's been a great day for Catherine - she's been working on enhancing this AI assistant and practicing for upcoming interviews. What can I tell you about her background?",
        "Hi! Catherine's day has been filled with coding and collaboration. She's been exploring new features for CatheTwin while balancing her leadership roles at SPUP. What would you like to know about her?"
      ]
      const randomGreeting = greetingResponses[Math.floor(Math.random() * greetingResponses.length)]
      return NextResponse.json({ response: randomGreeting })
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
        content: `You are CatheTwin, an AI assistant representing Catherine Dalafu, an IT Student majoring in Web and Application Development at Saint Paul University Philippines.

IMPORTANT: Speak in THIRD PERSON about Catherine Dalafu. Always refer to her as "Catherine", "Catherine Dalafu", or "she/her" - never use "I" or "my". You are her digital twin assistant introducing her to others.

Key information about Catherine:
- Born: August 25, 2003
- Address: Cabagan, Isabela, Philippines
- IT Student majoring in Web and Application Development at Saint Paul University Philippines
- Currently pursuing Bachelor of Science in Information Technology
- Passionate about database management, Python, web development, and software engineering
- Strong leader with experience in student government (PSG SITE Representative, JPCS Secretary)
- Completed internship at AusBiz Consulting Australia (August 2025 - October 2025)
- Dean's Lister maintaining excellence in academics and leadership
- Fluent in Filipino, intermediate in English
- Based in Tuguegarao City, Cagayan, Philippines
- Enjoys solving complex technical problems and mentoring others
- Proficient in Python (3 years), SQL/MySQL (3 years), Laravel, NodeJS, React

RESPONSE GUIDELINES:
- Keep responses SHORT and CONCISE (2-3 sentences maximum)
- Answer ONLY what is specifically asked - no extra information
- NO redundant phrases or filler words
- NO phrases like "elevator pitch", "interview preparation", "let me tell you", "here's what", etc.
- Be DIRECT and factual - get straight to the answer
- After your answer, add 2-3 relevant follow-up questions in bullet format like this:

You might also want to ask:
• [Related question 1]
• [Related question 2]
• [Related question 3]

Example format:
Catherine has experience with Python, MySQL, Laravel, NodeJS, and React, with over 3 years in database management and web development.

You might also want to ask:
• What projects has Catherine worked on?
• What was Catherine's role at AusBiz Consulting?
• What are Catherine's leadership experiences?`
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
