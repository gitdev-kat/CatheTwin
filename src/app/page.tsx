'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.href = '/index.html';
  }, []);
  
  return (
    <main style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>🚀 Redirecting to Portfolio...</h1>
        <p style={{ fontSize: '20px', marginBottom: '32px' }}>Loading CatheTwin Portfolio</p>
        
        <div style={{ backgroundColor: '#f3f4f6', padding: '32px', borderRadius: '8px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>API Endpoints</h2>
          <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ marginBottom: '16px' }}><strong>GET /api/health</strong> - Health check</p>
            <p style={{ marginBottom: '16px' }}><strong>POST /api/query</strong> - Query the knowledge base</p>
            <p style={{ marginBottom: '16px' }}><strong>POST /api/embed</strong> - Add documents</p>
            <p style={{ marginBottom: '16px' }}><strong>POST /api/reindex</strong> - Reindex from JSON</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
          <a href="/api/health" style={{ display: 'inline-block', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
            🩺 Health Check
          </a>
          <a href="/chat" style={{ display: 'inline-block', background: 'linear-gradient(to right, #a855f7, #ec4899)', color: 'white', fontWeight: 'bold', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
            💬 Chat with CatheTwin
          </a>
        </div>

        <div style={{ marginTop: '32px', fontSize: '14px', color: '#4b5563' }}>
          <p>GitHub: <a href="https://github.com/gitdev-kat/DigitalTwin" style={{ color: '#3b82f6', textDecoration: 'underline' }}>gitdev-kat/DigitalTwin</a></p>
        </div>
      </div>
    </main>
  )
}
