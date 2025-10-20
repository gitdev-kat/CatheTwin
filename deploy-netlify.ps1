# CatheTwin Netlify Deployment Script
# This script will help you deploy to Netlify step by step

Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "           CatheTwin Netlify Deployment Helper" -ForegroundColor Cyan
Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Login to Netlify" -ForegroundColor Yellow
Write-Host "This will open your browser for authentication..." -ForegroundColor Gray
Write-Host ""
netlify login

Write-Host ""
Write-Host "Step 2: Initialize Netlify site" -ForegroundColor Yellow
Write-Host "Creating a new Netlify site..." -ForegroundColor Gray
Write-Host ""
netlify init

Write-Host ""
Write-Host "Step 3: Build the project" -ForegroundColor Yellow
Write-Host "Installing dependencies and building..." -ForegroundColor Gray
Write-Host ""
pnpm install
pnpm build

Write-Host ""
Write-Host "Step 4: Deploy to production" -ForegroundColor Yellow
Write-Host "Deploying to Netlify..." -ForegroundColor Gray
Write-Host ""
netlify deploy --prod --dir=.next

Write-Host ""
Write-Host "==================================================================" -ForegroundColor Green
Write-Host "           Deployment Complete!" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green
