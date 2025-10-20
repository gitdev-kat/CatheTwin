# Connect Claude Desktop to Digital Twin MCP Server
# This script creates a bridge between your local MCP server and Claude Desktop

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  MCP Remote Bridge for Claude Desktop" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if Next.js server is running
Write-Host "📡 Checking if MCP server is running..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/mcp" -Method GET -ErrorAction Stop
    Write-Host "✅ MCP server is responding on localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Cannot connect to http://localhost:3000/api/mcp" -ForegroundColor Red
    Write-Host "`n   Steps to fix:" -ForegroundColor Yellow
    Write-Host "   1. Open a new PowerShell terminal" -ForegroundColor White
    Write-Host "   2. cd c:\DigitalTwin\digital-twin-workshop\digital-twin-new\" -ForegroundColor White
    Write-Host "   3. Run: .\start-mcp-server.ps1" -ForegroundColor White
    Write-Host "   4. Wait for 'Ready' message" -ForegroundColor White
    Write-Host "   5. Then run this script again`n" -ForegroundColor White
    exit 1
}

Write-Host "`n🌉 Starting MCP Remote bridge..." -ForegroundColor Green
Write-Host "   This will connect Claude Desktop to your local MCP server" -ForegroundColor Cyan
Write-Host "`n📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Keep this terminal open (don't close it!)" -ForegroundColor White
Write-Host "   2. Open Claude Desktop" -ForegroundColor White
Write-Host "   3. Go to Settings → Developer → Edit Config" -ForegroundColor White
Write-Host "   4. Add the configuration shown in STEP10_INSTRUCTIONS.md" -ForegroundColor White
Write-Host "   5. Restart Claude Desktop" -ForegroundColor White
Write-Host "   6. Start asking questions about your professional background!`n" -ForegroundColor White

Write-Host "🚀 Starting bridge now...`n" -ForegroundColor Green

# Start mcp-remote
npx -y mcp-remote http://localhost:3000/api/mcp
