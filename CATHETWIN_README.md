# 💬 CatheTwin - AI Digital Twin Chatbot

**CatheTwin** is an interactive AI chatbot that represents Catherine Dalafu's professional profile. Chat naturally to learn about her experience, skills, projects, and career journey!

## 🌟 Features

### Web Chat Interface
- **Beautiful UI**: Modern gradient design with purple/pink theme
- **Real-time Chat**: Instant AI-powered responses
- **Conversation Memory**: Maintains context across messages
- **Quick Questions**: Pre-built prompts to get started
- **Responsive Design**: Works on desktop and mobile

### Command-Line Interface
- **Interactive Terminal Chat**: Run chatbot from command line
- **Profile Search**: Intelligent keyword matching
- **AI Mode**: Powered by Groq LLM (when configured)
- **Basic Mode**: Falls back to search-based responses
- **Conversation History**: Maintains context across questions

## 🚀 Quick Start

### Web Interface

1. **Start the server:**
   ```powershell
   cd c:\DigitalTwin\digital-twin-workshop\digital-twin-new
   pnpm dev
   ```

2. **Open in browser:**
   - Navigate to: http://localhost:3000/chat
   - Start chatting with CatheTwin!

### Command-Line Interface

1. **Run the chatbot:**
   ```powershell
   cd c:\DigitalTwin\digital-twin-workshop\digital-twin-new
   python cathetwin.py
   ```

2. **Ask questions:**
   ```
   You: Tell me about your database experience
   CatheTwin: I work as a Database Administrator & Developer at AudiOn...
   
   You: What are your technical skills?
   CatheTwin: I'm proficient in Python (3 years), SQL/MySQL (3 years)...
   ```

3. **Special commands:**
   - `clear` - Reset conversation history
   - `help` - Show help information
   - `exit` or `quit` - End chat session

## 📋 What You Can Ask

### Work Experience
- "Tell me about your database experience"
- "What did you do at AusBiz Consulting Australia?"
- "Describe your role as Database Administrator"

### Leadership
- "What leadership positions have you held?"
- "Tell me about your PSG SITE experience"
- "What was your role in JPCS?"

### Technical Skills
- "What programming languages do you know?"
- "What's your experience with Python?"
- "Tell me about your database skills"

### Projects
- "What projects have you worked on?"
- "Describe the Logbook Vector Database project"
- "Tell me about your Event Registration System"

### Education
- "What's your educational background?"
- "Tell me about your degree at SPUP"
- "What are your academic achievements?"

### Career & Interview Prep
- "Give me your elevator pitch"
- "How would you answer 'Tell me about yourself'?"
- "What are your career goals?"

## 🛠️ Technical Details

### Web Chatbot (`/chat`)

**Stack:**
- Next.js 15.5.6 with TypeScript
- React Server Components
- Tailwind CSS for styling
- Groq API for AI responses

**API Endpoint:** `/api/chat`
- Method: POST
- Request: `{ message: string, history: Message[] }`
- Response: `{ response: string }`

**Features:**
- Conversation history (last 8 messages)
- Intelligent profile search
- Context-aware AI responses
- Fallback to basic mode if Groq unavailable

### CLI Chatbot (`cathetwin.py`)

**Requirements:**
- Python 3.11+
- groq library (optional, for AI mode)

**Installation:**
```powershell
pip install groq
```

**Configuration:**
- Set `GROQ_API_KEY` environment variable for AI mode
- Falls back to search-based responses without API key

**Features:**
- Loads `digitaltwin.json` with 16 profile documents
- Keyword-based relevance scoring
- Conversation memory
- Colorful ASCII art welcome screen

## 🎨 Design Elements

### Color Scheme
- **Primary**: Purple (#a855f7) to Pink (#ec4899) gradient
- **Accent**: Purple shades for UI elements
- **Background**: Soft purple/pink/blue gradients
- **Text**: Gray scale for readability

### Personality
CatheTwin speaks as Catherine in first person with:
- **Professional yet friendly** tone
- **Enthusiasm** for technology and leadership
- **Honesty** about experience and capabilities
- **Helpfulness** in interview preparation

## 📊 Profile Coverage

CatheTwin has access to 16 searchable documents:

1. **Summary** (1 doc): Professional overview
2. **Experience** (7 docs): Work and leadership positions
   - AusBiz Consulting Australia
   - PSG SITE Representative
   - JPCS Secretary
   - Press Relations Officer
   - Publicity Committee Head
   - PSG Councilor
   - Student Volunteer

3. **Projects** (3 docs): STAR format case studies
   - Logbook Vector Database Integration
   - Student Event Registration System
   - Database Optimization Initiative

4. **Education** (3 docs): Academic background
   - BS Information Technology - SPUP
   - High School
   - Junior High School

5. **Skills** (1 doc): Technical stack
6. **Interview Prep** (1 doc): Elevator pitch & answers

## 🔧 Configuration

### Environment Variables

Required for AI-powered responses:
```bash
GROQ_API_KEY=gsk_...
```

Already configured in `.env.local`:
```bash
GROQ_API_KEY=your_groq_api_key_here
UPSTASH_VECTOR_REST_URL=your_upstash_url_here
UPSTASH_VECTOR_REST_TOKEN=your_upstash_token_here
ADMIN_API_KEY=your_admin_key_here
```

### Profile Data

Location: `digitaltwin.json`

Format:
```json
{
  "documents": [
    {
      "id": "summary-1",
      "title": "Professional Summary",
      "type": "summary",
      "content": "...",
      "tags": []
    }
  ]
}
```

## 🎯 Use Cases

### Interview Preparation
- Practice answering common interview questions
- Review achievements and experiences
- Prepare elevator pitch and career story
- Get familiar with STAR format examples

### Portfolio Showcase
- Interactive way to explore your professional profile
- Engaging alternative to static resume
- Shareable link for recruiters/employers

### Personal Branding
- Demonstrates technical skills (AI, web dev, databases)
- Shows creativity and innovation
- Highlights personality and communication style

## 🚦 Status Indicators

### Web Interface
- **Typing Animation**: Three bouncing dots while AI thinks
- **Timestamps**: Each message shows send time
- **Online Status**: Green indicator when connected

### CLI Interface
- **✨ AI Mode: ENABLED** - Groq API available
- **⚡ Basic Mode** - Search-based responses
- **⚠️ Groq not installed** - Missing dependencies

## 📱 Responsive Design

The web interface adapts to all screen sizes:
- **Desktop**: Full 5-column layout with sidebar
- **Tablet**: 2-column layout, stacked cards
- **Mobile**: Single column, touch-optimized buttons

## 🎓 Learning Resources

Built using:
- [Next.js Documentation](https://nextjs.org/docs)
- [Groq AI](https://groq.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hooks](https://react.dev/reference/react)

## 🔮 Future Enhancements

Potential features to add:
- [ ] Voice input/output
- [ ] Multi-language support (Filipino/English toggle)
- [ ] Export chat history
- [ ] Resume download link
- [ ] Calendar integration for interview scheduling
- [ ] LinkedIn/GitHub profile integration
- [ ] Analytics dashboard (most asked questions)
- [ ] Sentiment analysis of conversations

## 💡 Tips for Best Results

1. **Be Specific**: "Tell me about your Python database projects" works better than just "projects"
2. **Ask Follow-ups**: CatheTwin remembers conversation context
3. **Use Natural Language**: Chat like you're talking to a person
4. **Explore Different Topics**: Work, education, skills, projects, leadership
5. **Request Details**: "Tell me more about..." or "Can you elaborate on..."

## 🎉 Example Conversations

### Technical Interview Prep
```
You: Tell me about your most challenging project
CatheTwin: My Logbook Vector Database Integration project was 
particularly challenging. I migrated a legacy system to modern 
vector search, reducing query times by 40% while handling 10,000+ 
daily transactions...

You: What specific technologies did you use?
CatheTwin: I used Python for the backend processing, Upstash Vector 
for the vector database, and implemented RAG (Retrieval-Augmented 
Generation) for semantic search. I also worked with PostgreSQL for 
relational data...
```

### Leadership Discussion
```
You: What leadership experience do you have?
CatheTwin: I've held several leadership positions! As PSG SITE 
Representative, I represented 200+ IT students. I was also JPCS 
Vice-President where I coordinated events with 150+ participants 
and managed cross-functional teams...

You: How did you handle conflicts in your team?
CatheTwin: [AI generates response based on leadership context]
```

## 📞 Contact

This chatbot represents **Catherine Dalafu**:
- 📧 Email: catherinedalafu@spup.edu.ph
- 📱 Phone: +639670912142
- 📍 Location: Tuguegarao City, Cagayan, Philippines

---

**Made with 💜 by Catherine Dalafu**
*Powered by Groq AI, Next.js, and Python*
