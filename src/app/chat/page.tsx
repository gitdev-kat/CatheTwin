'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatGroup {
  id: string
  title: string
  preview: string
  timestamp: Date
}

export default function CatheTwinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "👋 Hello! I'm CatheTwin - Catherine Dalafu's AI Digital Twin assistant! I can tell you about Catherine's experience as an IT Student majoring in Web and Application Development, her technical skills, leadership roles, projects, and education. Ask me anything about her!",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatGroup[]>([])
  const [currentChatId, setCurrentChatId] = useState<string>('default')
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
        content: '❌ Sorry, I had trouble processing your question. Please try again.',
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

  const createNewChat = () => {
    if (messages.length > 1) {
      const newGroup: ChatGroup = {
        id: Date.now().toString(),
        title: messages[1]?.content.substring(0, 40) + '...' || 'New Chat',
        preview: messages[1]?.content.substring(0, 60) + '...' || 'Design thinking...',
        timestamp: new Date()
      }
      setChatHistory(prev => [newGroup, ...prev])
    }
    
    setMessages([
      {
        role: 'assistant',
        content: "👋 Hello! I'm CatheTwin - Catherine Dalafu's AI Digital Twin assistant! I can tell you about Catherine's experience as an IT Student majoring in Web and Application Development, her technical skills, leadership roles, projects, and education. Ask me anything about her!",
        timestamp: new Date()
      }
    ])
    setCurrentChatId(Date.now().toString())
  }

  const quickQuestions = [
    "Tell me about Catherine's database experience",
    "What are Catherine's technical skills?",
    "Describe Catherine's leadership roles",
    "What projects has Catherine worked on?",
    "Tell me about Catherine's education"
  ]

  const askQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Sidebar */}
      <div className={`${showHistory ? 'w-80' : 'w-20'} bg-slate-950 border-r border-slate-800 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {showHistory && (
              <h2 className="text-lg font-bold text-blue-400">CatheTwin</h2>
            )}
          </div>
        </div>

        {/* New Chat Button */}
        {showHistory && (
          <div className="p-4">
            <button
              onClick={createNewChat}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>
          </div>
        )}

        {/* Chat History */}
        {showHistory && (
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <h3 className="text-sm font-semibold text-slate-400 mb-3">Chat History</h3>
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-3 bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
              >
                <div className="text-sm font-medium text-white truncate">{chat.title}</div>
                <div className="text-xs text-slate-400 truncate mt-1">{chat.preview}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {chat.timestamp.toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
              CT
            </div>
            {showHistory && (
              <div className="flex-1">
                <div className="text-sm font-medium text-white">CatheTwin</div>
                <div className="text-xs text-slate-400">AI Assistant</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-slate-950 border-b border-slate-800 p-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div>
              <h1 className="text-xl font-bold text-white">Catherine Dalafu's Digital Twin</h1>
              <p className="text-sm text-slate-400">Ask me anything about Catherine's background and experience</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' 
                      : 'bg-gradient-to-br from-blue-500 to-blue-700'
                  }`}>
                    <span className="text-white text-sm font-bold">
                      {message.role === 'user' ? 'U' : 'CT'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className={`rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white'
                        : 'bg-slate-800 text-slate-100 border border-slate-700'
                    }`}>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 px-2">
                      <span className="text-xs text-slate-500">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.role === 'assistant' && (
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-slate-800 rounded transition-colors">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          <button className="p-1 hover:bg-slate-800 rounded transition-colors">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">CT</span>
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-medium text-slate-400 mb-3">💡 Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => askQuickQuestion(question)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm border border-slate-700 transition-all hover:scale-105"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-slate-950 border-t border-slate-800 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4">
              <div className="flex gap-3 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about Catherine..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none resize-none"
                  rows={1}
                  disabled={loading}
                />
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
