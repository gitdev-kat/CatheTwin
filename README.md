# Digital Twin MCP Server

AI-powered RAG system built with Next.js, Upstash Vector, and Groq LLM, implementing the Model Context Protocol (MCP).

## 🎯 Overview

This project implements a Digital Twin knowledge base using:
- **Next.js 15** - React framework with server actions
- **Upstash Vector** - Managed vector database for embeddings
- **Groq API** - Fast LLM inference (llama-3.1-8b-instant)
- **MCP Protocol** - Model Context Protocol for AI tool integration

## 📁 Project Structure

```
src/
├── actions/           # Server actions (business logic)
│   ├── query.ts      # Query digital twin with RAG
│   ├── embed.ts      # Add documents to vector DB
│   ├── reindex.ts    # Bulk reindex from JSON
│   └── stats.ts      # Get index statistics
├── app/
│   ├── api/          # API routes (HTTP endpoints)
│   │   ├── query/
│   │   ├── embed/
│   │   ├── reindex/
│   │   ├── health/
│   │   └── test/
│   └── page.tsx      # Landing page
├── lib/
│   └── upstash.ts    # Upstash Vector client
└── mcp/
    └── server.ts     # MCP server implementation
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env.local`:

```bash
UPSTASH_VECTOR_REST_URL="your-upstash-url"
UPSTASH_VECTOR_REST_TOKEN="your-upstash-token"
GROQ_API_KEY="your-groq-api-key"
ADMIN_API_KEY="your-admin-key"
```

### 3. Prepare Data

Place your `digitaltwin.json` in the parent directory or create `data/digitaltwin.json`.

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📡 API Endpoints

See full documentation in the project README.

## 🤖 MCP Server

The MCP server provides AI tool integration with 4 main tools:
- query_digital_twin
- add_document
- reindex_knowledge_base
- get_index_stats

## 📚 Tech Stack

- Next.js 15.5.6, TypeScript 5
- Upstash Vector 1.2.2
- Groq SDK (llama-3.1-8b-instant)
- Model Context Protocol SDK

---
Built for Digital Twin Workshop Step 7

