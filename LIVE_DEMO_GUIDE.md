# CatheTwin Live Demo Guide - Step by Step

## Pre-Demo Checklist ✅

### Before Starting Your Recording:
- [ ] Close all unnecessary browser tabs
- [ ] Close unnecessary applications (Discord, Spotify, etc.)
- [ ] Make sure VS Code is open with the project
- [ ] Open a terminal (PowerShell)
- [ ] Test your microphone
- [ ] Check screen recording software is ready
- [ ] Have the project running locally (`npm run dev`)
- [ ] Open browser to `http://localhost:3000`
- [ ] Clear browser history/cache if needed
- [ ] Prepare a glass of water nearby

---

## Part 1: Project Overview in VS Code (2-3 minutes)

### Step 1: Show Project Structure
**Location**: VS Code Explorer Panel (Left sidebar)

```
What to Show:
CatheTwin-Deploy/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          ← CLICK THIS
│   │   └── chat/
│   │       └── page.tsx               ← CLICK THIS
├── digitaltwin.json                    ← CLICK THIS
├── package.json                        ← CLICK THIS
└── README.md
```

**What to Say**:
"Let me first show you the project structure. As you can see, this is a Next.js application with a well-organized folder structure."

---

### Step 2: Show digitaltwin.json
**File**: `CatheTwin-Deploy/digitaltwin.json`

**Action**: Click on `digitaltwin.json` in the Explorer

**What to Say**:
"This is the digitaltwin.json file - the knowledge base that powers CatheTwin. It contains all my professional information structured as documents."

**What to Point Out** (Scroll through slowly):
- Documents array structure
- Different document types: experience, education, skills, projects
- Tags for categorization
- Line 5-12: Professional Summary
- Line 14-22: Experience entries (JPCS Secretary, PSG SITE Representative)
- Line 89-96: Technical Skills
- Line 98-103: Education

**Script**:
"Each document has an ID, title, type, content, and tags. For example, here's my experience at AusBiz Consulting [scroll to it], my technical skills [scroll to it], and my education [scroll to it]. This structured format makes it easy for the AI to retrieve relevant information."

---

### Step 3: Show package.json
**File**: `CatheTwin-Deploy/package.json`

**Action**: Click on `package.json`

**What to Say**:
"Let me show you the technologies we're using in this project."

**What to Point Out** (Lines 5-20 approximately):
```json
"dependencies": {
  "groq-sdk": "^0.8.0",        ← Point out: "AI inference"
  "next": "15.5.6",             ← Point out: "Latest Next.js"
  "react": "^19.0.0",           ← Point out: "React 19"
  "typescript": "^5",           ← Point out: "TypeScript for type safety"
  "@upstash/vector": "...",     ← Point out: "Vector database"
}
```

**Script**:
"As you can see, we're using Next.js 15, React 19, TypeScript for type safety, Groq SDK for AI inference, and Upstash for vector database management."

---

### Step 4: Show API Route (Backend Logic)
**File**: `CatheTwin-Deploy/src/app/api/chat/route.ts`

**Action**: Click on `src/app/api/chat/route.ts`

**What to Say**:
"Now let's look at the backend - this is where the magic happens."

**What to Point Out** (Scroll slowly through key sections):

1. **Lines 1-8: Imports**
   ```typescript
   import Groq from 'groq-sdk'
   import fs from 'fs'
   ```
   Say: "We import Groq for AI and fs for reading our knowledge base"

2. **Lines 18-35: loadProfile() function**
   ```typescript
   function loadProfile(): Document[] {
   ```
   Say: "This function loads the digitaltwin.json file from multiple possible locations"

3. **Lines 37-66: searchProfile() function**
   ```typescript
   function searchProfile(query: string, documents: Document[]): Document[] {
   ```
   Say: "This is the search algorithm that finds relevant documents based on the user's question. It scores each document by counting keyword matches and gives bonus points for title matches."

4. **Lines 68-80: buildContext() function**
   ```typescript
   function buildContext(query: string, documents: Document[]): string {
   ```
   Say: "This builds the context string that gets sent to the AI"

5. **Lines 99-115: Greeting Handler**
   ```typescript
   const greetings = ['hi', 'hello', 'hey', 'hola', 'greetings']
   ```
   Say: "Here's a special feature - when users say 'hi' or 'hello', the chatbot responds with a personalized greeting about my day"

6. **Lines 140-165: System Prompt**
   ```typescript
   content: `You are CatheTwin, an AI assistant...`
   ```
   Say: "This is the system prompt that instructs the AI how to behave. Notice it tells the AI to speak in third person about Catherine, keep responses concise, and suggest follow-up questions."

7. **Lines 180-188: Groq API Call**
   ```typescript
   const completion = await groq.chat.completions.create({
     model: 'llama-3.1-8b-instant',
   ```
   Say: "Finally, we call the Groq API with the llama-3.1-8b-instant model for fast inference"

---

### Step 5: Show Frontend Chat Page
**File**: `CatheTwin-Deploy/src/app/chat/page.tsx`

**Action**: Click on `src/app/chat/page.tsx`

**What to Say**:
"Now let's look at the frontend - the user interface that people interact with."

**What to Point Out** (Scroll through key sections):

1. **Lines 1-10: Imports and Types**
   Say: "We import React hooks and define our message types"

2. **Lines 30-35: State Management**
   ```typescript
   const [messages, setMessages] = useState<Message[]>([])
   const [input, setInput] = useState('')
   const [loading, setLoading] = useState(false)
   const [sidebarOpen, setSidebarOpen] = useState(true)
   ```
   Say: "Here's the state management - we track messages, user input, loading state, and sidebar visibility"

3. **Lines 50-80: sendMessage() function**
   ```typescript
   const sendMessage = async () => {
   ```
   Say: "This function sends the user's message to our API endpoint and handles the response"

4. **Lines 150-220: Sidebar Structure**
   Say: "This is the left sidebar with the New Chat button, chat history, and user profile"

5. **Lines 350-450: Contact Information Sidebar (Right side)**
   Say: "And here's the right sidebar displaying contact information and education with beautiful card designs"

6. **Lines 250-300: Chat Interface**
   Say: "This is the main chat area with welcome screen and message display"

---

## Part 2: Live Application Demo (5-7 minutes)

### Step 6: Open Browser and Show Homepage
**Action**: Switch to browser at `http://localhost:3000`

**What to Say**:
"Now let's see the application in action. This is the landing page users see when they first visit CatheTwin."

**What to Point Out**:
- Animated gradient background
- Pulsing profile avatar with "CD"
- Clear headline and tagline
- Call-to-action buttons
- Scroll down to show:
  - Feature cards
  - Technology stack badges (hover over them)
  - Timeline section
  - Contact cards

**Script**:
"Notice the modern, eye-catching design with animated elements. The purple gradient background, the pulsing avatar, and smooth animations create an engaging first impression."

---

### Step 7: Navigate to Chat Interface
**Action**: Click "Start Chatting" button OR navigate to `/chat`

**What to Say**:
"Let's click 'Start Chatting' to enter the main chat interface."

**What to Point Out** (Take 10-15 seconds to describe the layout):
- Left sidebar: "Here's the left sidebar with New Chat button and chat history"
- Center area: "The main chat area with welcome message and suggestion cards"
- Right sidebar: "And the right sidebar showing contact information and education"

**Script**:
"The interface is divided into three sections. On the left, we have chat management. In the center, the conversation area. And on the right, my professional information for easy access."

---

### Step 8: Demo 1 - Greeting
**Action**: Type "hi" in the chat input and press Enter

**What to Say**:
"Let me start with a simple greeting."

**What to Observe**:
- Message appears in chat area
- Loading indicator shows (three bouncing dots)
- Response appears within 1-2 seconds
- The greeting mentions what Catherine's been working on

**Script**:
"Notice how quickly the response appears - under 2 seconds thanks to Groq API. And the chatbot doesn't just say 'hello' - it gives a personalized response about what I've been working on today. This makes the interaction feel more natural and engaging."

---

### Step 9: Demo 2 - Technical Skills Question
**Action**: Type "What are Catherine's technical skills?" OR click the suggestion card

**What to Say**:
"Now let's ask about technical skills."

**What to Observe**:
- Loading indicator appears
- Response lists: Python, MySQL, JavaScript/NodeJS, PHP/Laravel, etc.
- Follow-up questions appear at the bottom in bullet format

**Script**:
"The response is concise and focused - it only mentions technical skills as requested. And notice at the bottom, the chatbot suggests related questions I might want to ask next. This helps guide the conversation."

**Action**: Read the follow-up questions aloud:
"You might also want to ask:
• What projects has Catherine worked on?
• What was Catherine's role at AusBiz Consulting?
• What are Catherine's leadership experiences?"

---

### Step 10: Demo 3 - Work Experience Question
**Action**: Click one of the suggested questions OR type "Tell me about Catherine's work experience"

**What to Say**:
"Let's follow up with a question about work experience."

**What to Observe**:
- Response mentions AusBiz Consulting internship
- Mentions dates: August 2025 - October 2025
- Lists key responsibilities
- New follow-up questions appear

**Script**:
"Again, notice how the response is direct and concise. It tells you about the AusBiz Consulting internship, the dates, and key responsibilities - exactly what was asked, without unnecessary information."

---

### Step 11: Demo 4 - Show Contact Information Sidebar
**Action**: Scroll down the right sidebar OR point to it with your mouse

**What to Say**:
"Let me highlight the contact information sidebar on the right."

**What to Point Out**:
- Hover over Email card - see the hover effect
- Hover over LinkedIn card
- Hover over GitHub card
- Point out the education card at the bottom

**Script**:
"Each contact method has a beautiful card design with hover effects. Clicking any of these opens the respective platform. And below, you can see my educational background at Saint Paul University Philippines, majoring in Web and Application Development."

---

### Step 12: Demo 5 - Leadership Question
**Action**: Type "What are Catherine's leadership roles?"

**What to Say**:
"Let's ask about leadership experience."

**What to Observe**:
- Response mentions PSG SITE Representative
- Mentions JPCS Secretary
- Includes dates and responsibilities
- Follow-up questions appear

**Script**:
"The chatbot correctly identifies and lists my leadership positions. It speaks in third person about Catherine, maintaining a professional tone throughout."

---

### Step 13: Demo 6 - Project Question
**Action**: Type "What projects has Catherine worked on?"

**What to Say**:
"Let's ask about projects to see how the system retrieves and presents project information."

**What to Observe**:
- Response mentions specific projects
- Technologies used in each project
- Clear, organized format

**Script**:
"Notice how it pulls project information from the knowledge base and presents it in a clear, organized way. This demonstrates the RAG architecture in action - retrieving relevant documents and generating natural language responses."

---

### Step 14: Demo 7 - New Chat Functionality
**Action**: Click "New chat" button in left sidebar

**What to Say**:
"Let me show you the New Chat functionality."

**What to Observe**:
- Current conversation gets added to chat history
- Chat area clears
- Welcome screen reappears

**Script**:
"When I click 'New chat', the current conversation is saved to the history on the left, and we get a fresh start. This allows users to organize different conversation topics."

---

### Step 15: Demo 8 - Sidebar Toggle (Mobile/Desktop)
**Action**: Click the hamburger menu button (top-left of chat area)

**What to Say**:
"The interface is also responsive. Let me show you the sidebar toggle."

**What to Observe**:
- Left sidebar collapses/expands
- More space for chat area
- Smooth transition animation

**Script**:
"Users can collapse the sidebar to have more space for the conversation, especially useful on smaller screens. The transition is smooth and the interface adapts seamlessly."

---

### Step 16: Demo 9 - Invalid/Unknown Question
**Action**: Type something unrelated like "What's the weather like?"

**What to Say**:
"Let me test how the system handles questions outside Catherine's profile."

**What to Observe**:
- System responds gracefully
- Might say something like "I don't have specific information about that"
- Suggests asking about available topics

**Script**:
"When asked about something outside the knowledge base, the chatbot handles it gracefully and redirects users to ask about topics it can help with. This prevents hallucinations and keeps responses accurate."

---

## Part 3: Code Deep-Dive (Optional - 2-3 minutes)

### Step 17: Show How RAG Works (Back to VS Code)
**Action**: Switch back to VS Code

**File**: `src/app/api/chat/route.ts`

**What to Show**:
1. **Line by line explanation of searchProfile()** (lines 37-66)
   - Show the scoring algorithm
   - Explain keyword matching
   - Show title bonus
   - Show sorting by relevance

**Script**:
"Let me show you exactly how the search algorithm works. When a user asks 'What are Catherine's technical skills?', the system:
1. Converts the query to lowercase
2. Splits it into words
3. Searches through all documents
4. Counts matches in content (2 points each)
5. Adds bonus for title matches (5 points)
6. Sorts by score and returns top 5 results"

---

### Step 18: Show System Prompt Engineering
**File**: `src/app/api/chat/route.ts`

**Location**: Lines 140-165

**What to Show**:
Point out specific instructions:
- "Speak in THIRD PERSON"
- "Keep responses SHORT and CONCISE (2-3 sentences maximum)"
- "NO redundant phrases"
- "After your answer, add 2-3 relevant follow-up questions"

**Script**:
"This is where prompt engineering comes in. These specific instructions ensure the AI:
- Always refers to Catherine in third person
- Keeps answers brief and to the point
- Avoids filler words
- Always suggests next questions
This level of control is what makes the chatbot professional and user-friendly."

---

## Part 4: Closing Demo (1-2 minutes)

### Step 19: Return to Homepage
**Action**: Navigate back to `http://localhost:3000`

**What to Say**:
"Let's return to the homepage to wrap up."

**What to Do**:
- Scroll through the page one more time
- Hover over various elements to show interactivity
- Click on contact cards to show they're functional

---

### Step 20: Final Summary
**What to Say**:
"So in summary, CatheTwin demonstrates:

1. **Full-stack development** - From backend API routes to frontend React components
2. **AI integration** - Using Groq API for fast, intelligent responses
3. **RAG architecture** - Combining database retrieval with AI generation
4. **Data processing** - Searching and scoring relevant information
5. **User experience design** - Clean, intuitive, responsive interface
6. **Prompt engineering** - Carefully crafted instructions for consistent AI behavior
7. **Real-world application** - A practical tool for career development

This project showcases my ability to conceptualize, design, and implement complex AI systems from the ground up, applying everything I learned during my internship at AusBiz Consulting."

---

## Troubleshooting During Demo

### If the app isn't running:
1. Open terminal in VS Code (Ctrl + `)
2. Run: `npm run dev`
3. Wait for "Local: http://localhost:3000"
4. Refresh browser

### If API errors occur:
- Check if GROQ_API_KEY is set
- Show the .env.local file (if appropriate)
- Explain: "In production, environment variables are securely configured"

### If responses are slow:
- Explain: "The speed depends on network and API availability"
- Mention: "Typically under 2 seconds"

### If you make a mistake:
- Stay calm
- Say: "Let me try that again"
- Users appreciate authenticity

---

## Post-Demo Checklist

After completing the demo:
- [ ] Show the GitHub repository (if applicable)
- [ ] Show the README.md file
- [ ] Mention deployment plans
- [ ] Invite questions
- [ ] Share contact information
- [ ] Thank the audience

---

## Quick Reference: File Locations

```
Must-Show Files:
1. digitaltwin.json                    → Knowledge base
2. src/app/api/chat/route.ts          → Backend logic
3. src/app/chat/page.tsx              → Frontend UI
4. package.json                        → Dependencies

Nice-to-Show Files:
5. README.md                           → Project documentation
6. next.config.ts                      → Configuration
7. tsconfig.json                       → TypeScript config
```

---

## Demo Flow Timeline

| Time | Section | Action |
|------|---------|--------|
| 0:00-0:30 | Introduction | State your name and project title |
| 0:30-2:30 | Code Overview | Show file structure and key files |
| 2:30-3:00 | digitaltwin.json | Explain knowledge base |
| 3:00-3:30 | package.json | Show technologies |
| 3:30-5:30 | API route | Explain backend logic |
| 5:30-7:00 | Frontend | Show UI components |
| 7:00-7:30 | Homepage | Display landing page |
| 7:30-8:00 | Chat Interface | Navigate to chat |
| 8:00-8:30 | Demo 1 | Test greeting |
| 8:30-9:00 | Demo 2 | Technical skills |
| 9:00-9:30 | Demo 3 | Work experience |
| 9:30-10:00 | Demo 4 | Contact sidebar |
| 10:00-10:30 | Demo 5 | Leadership |
| 10:30-11:00 | Demo 6 | Projects |
| 11:00-11:30 | Demo 7 | New chat |
| 11:30-12:00 | Demo 8 | Sidebar toggle |
| 12:00-12:30 | Demo 9 | Edge case |
| 12:30-14:00 | Deep Dive | RAG explanation (optional) |
| 14:00-15:00 | Closing | Summary and wrap-up |

**Total Time**: 12-15 minutes

---

## Pro Tips for Recording

1. **Practice the flow 2-3 times** before recording
2. **Have a glass of water** nearby
3. **Close all distractions** (notifications, other apps)
4. **Use keyboard shortcuts** to look professional:
   - Ctrl + P (VS Code): Quick file search
   - Ctrl + ` : Toggle terminal
   - Ctrl + B : Toggle sidebar
5. **Speak clearly and at moderate pace**
6. **Pause briefly** between major sections
7. **Show your face** if doing webcam recording - it's more engaging
8. **Smile** - enthusiasm is contagious!
9. **Have notes nearby** but don't read directly from them
10. **Test everything once** before the final recording

---

## Emergency Backup Plan

If technical issues occur during live demo:
1. Have screenshots ready of key screens
2. Have a pre-recorded demo video as backup
3. Have the deployed live URL ready
4. Have the GitHub repository open
5. Be ready to explain verbally with diagrams if needed

**Remember**: Confidence is key! You built this - you know it best. 🚀

Good luck with your demo! 🎉
