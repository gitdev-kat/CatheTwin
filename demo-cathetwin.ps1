#!/usr/bin/env powershell
# CatheTwin Demo Script
# Demonstrates both web and CLI chatbot functionality

Write-Host "`n" -NoNewline
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "   ___      _   _         _____        _       " -ForegroundColor Cyan
Write-Host "  / __\__ _| |_| |__   __|_   _|_      _(_)_ __  " -ForegroundColor Cyan
Write-Host " / /  / _` | __| '_ \ / _ \| | \ \ /\ / / | '_ \ " -ForegroundColor Cyan
Write-Host "/ /__| (_| | |_| | | |  __/| |  \ V  V /| | | | |" -ForegroundColor Cyan
Write-Host "\____/\__,_|\__|_| |_|\___||_|   \_/\_/ |_|_| |_|" -ForegroundColor Cyan
Write-Host "\n    AI Digital Twin Chatbot for Catherine Dalafu" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""

Write-Host "🎯 Welcome to CatheTwin Demo!" -ForegroundColor Green
Write-Host ""
Write-Host "CatheTwin is an interactive AI chatbot that helps you explore" -ForegroundColor White
Write-Host "Catherine Dalafu's professional profile through natural conversation." -ForegroundColor White
Write-Host ""

# Menu
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host "   Choose Your Experience:" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""
Write-Host "   1. 🌐 Web Chat Interface" -ForegroundColor Cyan
Write-Host "      Beautiful, modern chat UI in your browser" -ForegroundColor Gray
Write-Host "      Full conversation history and quick question buttons" -ForegroundColor Gray
Write-Host ""
Write-Host "   2. 💻 Command-Line Chat" -ForegroundColor Cyan
Write-Host "      Interactive terminal-based chatbot" -ForegroundColor Gray
Write-Host "      AI-powered responses with conversation memory" -ForegroundColor Gray
Write-Host ""
Write-Host "   3. 🧪 Quick Test" -ForegroundColor Cyan
Write-Host "      Run automated demo queries" -ForegroundColor Gray
Write-Host "      See sample interactions instantly" -ForegroundColor Gray
Write-Host ""
Write-Host "   4. 📚 View Documentation" -ForegroundColor Cyan
Write-Host "      Read the complete CatheTwin guide" -ForegroundColor Gray
Write-Host ""
Write-Host "   5. 🚀 Launch All" -ForegroundColor Cyan
Write-Host "      Start web server + open chat in browser" -ForegroundColor Gray
Write-Host ""
Write-Host "   0. ❌ Exit" -ForegroundColor Red
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Magenta
Write-Host ""

$choice = Read-Host "Enter your choice (0-5)"

switch ($choice) {
    "1" {
        Write-Host "`n🌐 Starting Web Chat Interface..." -ForegroundColor Cyan
        Write-Host ""
        
        # Check if server is running
        try {
            $response = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method GET -ErrorAction Stop
            Write-Host "✅ Server already running!" -ForegroundColor Green
        } catch {
            Write-Host "📡 Starting Next.js server..." -ForegroundColor Yellow
            Start-Job -ScriptBlock {
                Set-Location c:\DigitalTwin\digital-twin-workshop\digital-twin-new
                pnpm dev
            } | Out-Null
            Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
            Start-Sleep -Seconds 12
        }
        
        Write-Host "`n✅ Opening CatheTwin in your browser..." -ForegroundColor Green
        Start-Process "http://localhost:3000/chat"
        
        Write-Host "`n💬 Web chat is now open in your browser!" -ForegroundColor Cyan
        Write-Host "   URL: http://localhost:3000/chat" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Press any key to return to menu..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
    "2" {
        Write-Host "`n💻 Launching Command-Line Chat..." -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Tips:" -ForegroundColor Yellow
        Write-Host "  • Type 'clear' to reset conversation" -ForegroundColor Gray
        Write-Host "  • Type 'help' for more information" -ForegroundColor Gray
        Write-Host "  • Type 'exit' to quit" -ForegroundColor Gray
        Write-Host ""
        
        python cathetwin.py
    }
    
    "3" {
        Write-Host "`n🧪 Running Quick Test Demo..." -ForegroundColor Cyan
        Write-Host ""
        
        $queries = @(
            "Tell me about your database experience",
            "What leadership roles have you held?",
            "What are your technical skills?",
            "Describe your education background"
        )
        
        foreach ($query in $queries) {
            Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
            Write-Host "Question: " -NoNewline -ForegroundColor Yellow
            Write-Host $query -ForegroundColor White
            Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
            Write-Host ""
            
            python query_profile.py $query
            
            Write-Host ""
            Start-Sleep -Seconds 2
        }
        
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
        Write-Host "`n✅ Demo Complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Press any key to return to menu..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
    "4" {
        Write-Host "`n📚 Opening Documentation..." -ForegroundColor Cyan
        
        if (Test-Path "CATHETWIN_README.md") {
            code CATHETWIN_README.md
            Write-Host "✅ Documentation opened in VS Code!" -ForegroundColor Green
        } else {
            Write-Host "❌ Documentation not found!" -ForegroundColor Red
        }
        
        Write-Host ""
        Write-Host "Press any key to return to menu..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
    "5" {
        Write-Host "`n🚀 Launching Complete CatheTwin Experience..." -ForegroundColor Cyan
        Write-Host ""
        
        # Start server
        Write-Host "📡 Starting Next.js server..." -ForegroundColor Yellow
        try {
            $response = Invoke-RestMethod -Uri "http://localhost:3000/api/health" -Method GET -ErrorAction Stop
            Write-Host "✅ Server already running!" -ForegroundColor Green
        } catch {
            Start-Job -ScriptBlock {
                Set-Location c:\DigitalTwin\digital-twin-workshop\digital-twin-new
                pnpm dev
            } | Out-Null
            Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
            Start-Sleep -Seconds 12
            Write-Host "✅ Server started!" -ForegroundColor Green
        }
        
        # Open browser
        Write-Host "🌐 Opening web chat..." -ForegroundColor Yellow
        Start-Process "http://localhost:3000/chat"
        
        # Show URLs
        Write-Host "`n" -NoNewline
        Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host "   ✅ CatheTwin is Ready!" -ForegroundColor Green
        Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "🌐 Web Chat:  " -NoNewline -ForegroundColor Cyan
        Write-Host "http://localhost:3000/chat" -ForegroundColor White
        Write-Host "🏠 Home Page: " -NoNewline -ForegroundColor Cyan
        Write-Host "http://localhost:3000" -ForegroundColor White
        Write-Host "💻 CLI Chat:  " -NoNewline -ForegroundColor Cyan
        Write-Host "python cathetwin.py" -ForegroundColor White
        Write-Host ""
        Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Green
        Write-Host ""
        Write-Host "Press any key to return to menu..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
    
    "0" {
        Write-Host "\n👋 Thanks for checking out CatheTwin!" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Made with 💜 by Catherine Dalafu" -ForegroundColor Magenta
        Write-Host ""
        exit
    }
    
    default {
        Write-Host "`n❌ Invalid choice. Please run the script again." -ForegroundColor Red
        Write-Host ""
    }
}

Write-Host ""
