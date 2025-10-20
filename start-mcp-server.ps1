# Start MCP Server for Digital Twin
# This script starts the Next.js development server for Claude Desktop integration

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Digital Twin MCP Server" -ForegroundColor Cyan  
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if pnpm is available
if (!(Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: pnpm is not installed" -ForegroundColor Red
    Write-Host "   Install with: npm install -g pnpm" -ForegroundColor Yellow
    exit 1
}

# Check if in correct directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found" -ForegroundColor Red
    Write-Host "   Run this script from: c:\DigitalTwin\digital-twin-workshop\digital-twin-new\" -ForegroundColor Yellow
    exit 1
}

# Check if .env.local exists
if (!(Test-Path ".env.local")) {
    Write-Host "⚠️  Warning: .env.local not found" -ForegroundColor Yellow
    Write-Host "   Make sure environment variables are configured" -ForegroundColor Yellow
}

Write-Host "📦 Installing dependencies (if needed)..." -ForegroundColor Green
pnpm install

Write-Host "`n🚀 Starting Next.js development server..." -ForegroundColor Green
Write-Host "   MCP Endpoint: http://localhost:3000/api/mcp" -ForegroundColor Cyan
Write-Host "`n⏱️  Please wait for 'Ready' message...`n" -ForegroundColor Yellow

# Start the development server
pnpm dev
