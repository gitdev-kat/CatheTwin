'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatHistory {
  id: string
  title: string
  timestamp: Date
}

export default function CatheTwinChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Technical Skills Discussion', timestamp: new Date(Date.now() - 86400000) },
    { id: '2', title: 'Leadership Experience', timestamp: new Date(Date.now() - 172800000) },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startNewChat = () => {
    if (messages.length > 0) {
      const firstMessage = messages.find(m => m.role === 'user')
      if (firstMessage) {
        const newChat: ChatHistory = {
          id: Date.now().toString(),
          title: firstMessage.content.substring(0, 30) + '...',
          timestamp: new Date()
        }
        setChatHistory(prev => [newChat, ...prev])
      }
    }
    setMessages([])
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages.slice(-8) })
      })

      const data = await response.json()

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I had trouble processing your question. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-slate-900 transition-all duration-300 overflow-hidden flex flex-col`}>
        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-sm font-semibold">New chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Recent Chats</h3>
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-3 text-slate-300 hover:bg-slate-800 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm truncate">{chat.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">CD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">Catherine Dalafu</div>
              <div className="text-xs text-slate-400">IT Student</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-sm font-semibold text-slate-800">CatheTwin</h1>
          <div className="w-10"></div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="h-full flex items-center justify-center p-8">
              <div className="max-w-2xl text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">Welcome to CatheTwin</h2>
                  <p className="text-slate-600">
                    I&apos;m Catherine Dalafu&apos;s AI Digital Twin. Ask me about her technical skills, 
                    leadership experience, projects, or education background.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                  <button
                    onClick={() => setInput("Tell me about Catherine&apos;s technical skills")}
                    className="p-4 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl text-left transition-all group"
                  >
                    <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600">Technical Skills</div>
                    <div className="text-xs text-slate-500 mt-1">Learn about programming and technologies</div>
                  </button>
                  <button
                    onClick={() => setInput("What are Catherine&apos;s leadership roles?")}
                    className="p-4 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl text-left transition-all group"
                  >
                    <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600">Leadership Experience</div>
                    <div className="text-xs text-slate-500 mt-1">Explore leadership positions and roles</div>
                  </button>
                  <button
                    onClick={() => setInput("Describe Catherine&apos;s work experience")}
                    className="p-4 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl text-left transition-all group"
                  >
                    <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600">Work Experience</div>
                    <div className="text-xs text-slate-500 mt-1">View internships and projects</div>
                  </button>
                  <button
                    onClick={() => setInput("Tell me about Catherine&apos;s education")}
                    className="p-4 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl text-left transition-all group"
                  >
                    <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600">Education</div>
                    <div className="text-xs text-slate-500 mt-1">Academic background and achievements</div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Messages
            <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
              {messages.map((message, index) => (
                <div key={index} className="space-y-4">
                  {message.role === 'user' ? (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">You</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-slate-800">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">CT</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">CT</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center gap-2 bg-white border border-slate-300 rounded-xl shadow-sm focus-within:border-blue-500 focus-within:shadow-md transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-slate-800 placeholder-slate-400"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="mr-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-slate-500 text-center mt-2">
              CatheTwin can make mistakes. Consider checking important information.
            </p>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Contact Information */}
      <div className="w-80 bg-slate-50 border-l border-slate-200 overflow-y-auto">
        {/* Contact Information */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Contact Information</h3>
          
          {/* Email */}
          <a
            href="mailto:catherinedalafu@spup.edu.ph"
            className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-blue-50 rounded-xl transition-all group border border-slate-200 hover:border-blue-300 shadow-sm"
          >
            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium mb-0.5">Email</div>
              <div className="text-sm text-slate-800 font-medium truncate">catherinedalafu@spup.edu.ph</div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/catherinedalafu@spup.edu.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-blue-50 rounded-xl transition-all group border border-slate-200 hover:border-blue-300 shadow-sm"
          >
            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium mb-0.5">LinkedIn</div>
              <div className="text-sm text-slate-800 font-medium truncate">catherinedalafu@spup.edu.ph</div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/gitdev-kat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-white hover:bg-blue-50 rounded-xl transition-all group border border-slate-200 hover:border-blue-300 shadow-sm"
          >
            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium mb-0.5">GitHub</div>
              <div className="text-sm text-slate-800 font-medium truncate">gitdev-kat</div>
            </div>
          </a>
        </div>

        {/* Education */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Education</h3>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold text-slate-800 mb-2">Saint Paul University</div>
                <div className="text-sm text-slate-700 leading-relaxed">BS Information Technology</div>
                <div className="text-sm text-slate-600 mt-1">Major in Web and App Development</div>
                <div className="text-xs text-slate-500 mt-3 font-semibold bg-white/50 px-3 py-1.5 rounded-lg inline-block">2022 - 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
