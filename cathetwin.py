#!/usr/bin/env python3
"""
CatheTwin - AI Chatbot for Catherine Dalafu's Digital Twin
Interactive chat interface powered by your professional profile
"""

import json
import os
from datetime import datetime

# Try to import Groq, fall back to basic mode if not available
try:
    from groq import Groq
    GROQ_AVAILABLE = True
except ImportError:
    GROQ_AVAILABLE = False
    print("⚠️  Groq not installed. Run: pip install groq")

class CatheTwin:
    def __init__(self):
        self.load_profile()
        self.conversation_history = []
        
        # Initialize Groq if available
        if GROQ_AVAILABLE and os.environ.get('GROQ_API_KEY'):
            self.groq = Groq(api_key=os.environ.get('GROQ_API_KEY'))
            self.ai_enabled = True
        else:
            self.groq = None
            self.ai_enabled = False
    
    def load_profile(self):
        """Load Catherine's digital twin profile"""
        try:
            with open('digitaltwin.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.documents = data.get('documents', [])
                self.profile_loaded = True
        except FileNotFoundError:
            print("❌ Error: digitaltwin.json not found!")
            self.documents = []
            self.profile_loaded = False
    
    def search_profile(self, query):
        """Search through Catherine's profile for relevant information"""
        query_lower = query.lower()
        matches = []
        
        for doc in self.documents:
            content = doc.get('content', '').lower()
            title = doc.get('title', '').lower()
            
            # Calculate relevance score
            score = 0
            words = query_lower.split()
            for word in words:
                if word in content:
                    score += content.count(word) * 2
                if word in title:
                    score += 5
            
            if score > 0:
                matches.append((score, doc))
        
        # Sort by relevance and return top matches
        matches.sort(reverse=True, key=lambda x: x[0])
        return [doc for score, doc in matches[:5]]
    
    def build_context(self, query):
        """Build context from relevant profile documents"""
        matches = self.search_profile(query)
        
        if not matches:
            return "No specific information found in Catherine's profile."
        
        context_parts = []
        for doc in matches:
            context_parts.append(f"[{doc['type'].upper()}] {doc['title']}")
            context_parts.append(doc['content'])
            context_parts.append("")
        
        return "\n".join(context_parts)
    
    def generate_ai_response(self, user_question, context):
        """Generate AI response using Groq"""
        if not self.ai_enabled:
            return self.generate_basic_response(context)
        
        try:
            # Build conversation messages
            messages = [
                {
                    "role": "system",
                    "content": """You are CatheTwin, an AI assistant representing Catherine Dalafu, a Full-Stack Developer and IT student at Saint Paul University Philippines.

You speak in first person AS Catherine, using her professional background and experiences. Be friendly, professional, and enthusiastic about technology and leadership.

Key personality traits:
- Passionate about database management, Python, and web development
- Strong leader with experience in student government (PSG SITE Representative, JPCS Secretary)
- Currently working remotely with AusBiz Consulting Australia
- Dean's Lister maintaining excellence in academics and leadership
- Fluent in Filipino, intermediate in English
- Based in Tuguegarao City, Cagayan, Philippines

Use the provided context to answer accurately. If information isn't in the context, you can make reasonable inferences based on Catherine's background, but be honest about what's confirmed vs. inferred."""
                }
            ]
            
            # Add recent conversation history (last 4 exchanges)
            for msg in self.conversation_history[-8:]:
                messages.append(msg)
            
            # Add current question with context
            messages.append({
                "role": "user",
                "content": f"Context from Catherine's profile:\n{context}\n\nQuestion: {user_question}"
            })
            
            # Generate response
            completion = self.groq.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=messages,
                temperature=0.7,
                max_tokens=500,
            )
            
            response = completion.choices[0].message.content
            
            # Save to conversation history
            self.conversation_history.append({
                "role": "user",
                "content": user_question
            })
            self.conversation_history.append({
                "role": "assistant",
                "content": response
            })
            
            return response
            
        except Exception as e:
            print(f"⚠️  AI Error: {e}")
            return self.generate_basic_response(context)
    
    def generate_basic_response(self, context):
        """Generate basic response without AI"""
        if not context or context == "No specific information found in Catherine's profile.":
            return "I don't have specific information about that in Catherine's profile. You can ask about her work experience, technical skills, education, or leadership roles."
        
        return f"Based on Catherine's profile:\n\n{context}\n\nWould you like to know more about any specific aspect of her background?"
    
    def chat(self, user_input):
        """Process user input and generate response"""
        if not self.profile_loaded:
            return "❌ Sorry, I couldn't load my profile data. Please make sure digitaltwin.json exists."
        
        # Build context from profile
        context = self.build_context(user_input)
        
        # Generate response
        response = self.generate_ai_response(user_input, context)
        
        return response
    
    def display_welcome(self):
        """Display welcome message"""
        print("\n" + "="*70)
        print("   ___      _   _         _____        _       ")
        print("  / __\\__ _| |_| |__   __|_   _|_      _(_)_ __  ")
        print(" / /  / _` | __| '_ \\ / _ \\| | \\ \\ /\\ / / | '_ \\ ")
        print("/ /__| (_| | |_| | | |  __/| |  \\ V  V /| | | | |")
        print("\\____/\\__,_|\\__|_| |_|\\___||_|   \\_/\\_/ |_|_| |_|")
        print("\n" + "="*70)
        print("\n👋 Hi! I'm CatheTwin - Catherine Dalafu's AI Digital Twin!")
        print("\n📚 I can tell you about:")
        print("   • My work experience (AusBiz Consulting Australia, PSG roles)")
        print("   • Technical skills (Python, MySQL, Laravel, NodeJS)")
        print("   • Leadership positions (JPCS Secretary, PSG SITE Rep)")
        print("   • Projects (Database Integration, Event Management)")
        print("   • Education (SPUP - BS Information Technology)")
        print("   • Interview preparation tips")
        
        if self.ai_enabled:
            print("\n✨ AI Mode: ENABLED (Powered by Groq)")
        else:
            print("\n⚡ Basic Mode: Search-based responses")
            if not GROQ_AVAILABLE:
                print("   💡 Tip: Install Groq for AI responses: pip install groq")
            else:
                print("   💡 Tip: Set GROQ_API_KEY environment variable for AI mode")
        
        print("\n💬 Ask me anything! Type 'exit' or 'quit' to end the chat.")
        print("   Type 'clear' to clear conversation history.")
        print("="*70 + "\n")
    
    def run(self):
        """Run the interactive chat interface"""
        self.display_welcome()
        
        while True:
            try:
                # Get user input
                user_input = input("You: ").strip()
                
                if not user_input:
                    continue
                
                # Handle special commands
                if user_input.lower() in ['exit', 'quit', 'bye', 'goodbye']:
                    print("\n👋 Thanks for chatting with CatheTwin! Good luck with your interview prep!")
                    print("="*70 + "\n")
                    break
                
                if user_input.lower() == 'clear':
                    self.conversation_history = []
                    print("\n🧹 Conversation history cleared!\n")
                    continue
                
                if user_input.lower() == 'help':
                    print("\n📖 CatheTwin Help:")
                    print("   - Ask about work experience, skills, projects, education")
                    print("   - Request interview tips or career advice")
                    print("   - Type 'clear' to reset conversation")
                    print("   - Type 'exit' to quit\n")
                    continue
                
                # Generate response
                print("\nCatheTwin: ", end="", flush=True)
                response = self.chat(user_input)
                print(response + "\n")
                
            except KeyboardInterrupt:
                print("\n\n👋 Goodbye! Thanks for using CatheTwin!\n")
                break
            except Exception as e:
                print(f"\n❌ Error: {e}\n")

def main():
    """Main entry point"""
    cathetwin = CatheTwin()
    cathetwin.run()

if __name__ == "__main__":
    main()
