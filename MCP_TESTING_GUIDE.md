# MCP Server Testing Guide - Step 8

## ✅ Setup Complete

Your MCP server is now configured and running!

### Files Created:
- ✅ `.vscode/mcp.json` - VS Code MCP configuration
- ✅ `src/app/api/mcp/route.ts` - HTTP MCP endpoint
- ✅ Server running at `http://localhost:3000`

## 🧪 Testing Your MCP Server

### 1. Test MCP HTTP Endpoint

Open your browser or use these PowerShell commands:

**GET Request (Server Info):**
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/mcp" -Method GET | Select-Object -ExpandProperty Content
```

**POST Request (Ping):**
```powershell
$body = @{
    jsonrpc = "2.0"
    method = "ping"
    id = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/mcp" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Expected Response:**
```json
{
  "jsonrpc": "2.0",
  "result": {
    "status": "ok",
    "message": "Digital Twin MCP Server is running",
    "timestamp": "2025-10-21T..."
  },
  "id": 1
}
```

### 2. Test MCP Tools

**List Available Tools:**
```powershell
$body = @{
    jsonrpc = "2.0"
    method = "tools/list"
    id = 2
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/mcp" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Query Digital Twin:**
```powershell
$body = @{
    jsonrpc = "2.0"
    method = "tools/call"
    params = @{
        name = "query_digital_twin"
        arguments = @{
            question = "What are the key achievements?"
            topK = 5
        }
    }
    id = 3
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:3000/api/mcp" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Get Index Stats:**
```powershell
$body = @{
    jsonrpc = "2.0"
    method = "tools/call"
    params = @{
        name = "get_index_stats"
        arguments = @{}
    }
    id = 4
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:3000/api/mcp" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

## 🤖 Testing with GitHub Copilot

### Step 1: Verify MCP Configuration

1. Open VS Code Insiders
2. Navigate to `.vscode/mcp.json`
3. Verify the configuration is loaded

### Step 2: Test with Copilot Chat

Use these prompts in GitHub Copilot Chat:

```
@workspace Can you tell me about my work experience using the digital twin MCP server?
```

```
@workspace Using my digital twin data, what are my key technical skills?
```

```
@workspace Query my digital twin MCP server to help me prepare for a technical interview. What projects should I highlight?
```

## 📊 MCP Server Status

### Available MCP Methods:
- ✅ `initialize` - Initialize MCP session
- ✅ `tools/list` - List available tools
- ✅ `tools/call` - Call a specific tool
- ✅ `ping` - Health check

### Available Tools:
1. **query_digital_twin** - Query knowledge base with RAG
2. **add_document** - Add new documents to vector DB
3. **get_index_stats** - Get database statistics

## 🔍 Troubleshooting

### Server Not Responding?

1. **Check if server is running:**
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET
   ```

2. **Restart the dev server:**
   ```powershell
   cd c:\DigitalTwin\digital-twin-workshop\digital-twin-new
   npx next dev
   ```

3. **Check server logs in terminal**
   - Look for "Ready in Xs"
   - Look for "Local: http://localhost:3000"

### MCP Endpoint Not Found?

1. **Verify route file exists:**
   - `src/app/api/mcp/route.ts` should be present

2. **Check for TypeScript errors:**
   ```powershell
   npm run lint
   ```

3. **Rebuild the project:**
   ```powershell
   npm run build
   ```

### GitHub Copilot Not Using MCP?

1. **Ensure VS Code Insiders is updated** to the latest version
2. **Check that GitHub Copilot Chat extension is installed**
3. **Verify `.vscode/mcp.json` is in the project root**
4. **Restart VS Code Insiders** after adding MCP config
5. **Use `@workspace` prefix** in your prompts

## 📝 MCP Protocol Spec

Your server implements JSON-RPC 2.0 with these methods:

```json
{
  "jsonrpc": "2.0",
  "method": "METHOD_NAME",
  "params": { ... },
  "id": 1
}
```

Response format:
```json
{
  "jsonrpc": "2.0",
  "result": { ... },
  "id": 1
}
```

## 🎯 Next Steps

1. ✅ Server is running
2. ✅ MCP endpoint is accessible
3. ⏳ Test with GitHub Copilot
4. ⏳ Try different queries
5. ⏳ Verify RAG responses

## 📚 Resources

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Digital Twin Workshop](https://aiagents.ausbizconsulting.com.au/developer-productivity)

---

**Status:** ✅ MCP Server Ready for Testing  
**Endpoint:** http://localhost:3000/api/mcp  
**Protocol:** JSON-RPC 2.0 (Model Context Protocol)
