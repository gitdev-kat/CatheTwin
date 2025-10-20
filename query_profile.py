import json
import sys

# Load documents
with open('digitaltwin.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    documents = data.get('documents', [])

# Get query from command line
query = ' '.join(sys.argv[1:]).lower() if len(sys.argv) > 1 else ''

print(f"\n🔍 Searching your digital twin for: '{query}'\n")
print("=" * 70)

# Simple keyword search
matches = []
for doc in documents:
    content = doc.get('content', '').lower()
    title = doc.get('title', '').lower()
    
    # Check if query keywords are in the document
    if query in content or query in title:
        matches.append(doc)
    else:
        # Check individual words
        words = query.split()
        score = sum(1 for word in words if word in content or word in title)
        if score > 0:
            matches.append((score, doc))

# Sort by relevance if we have scored matches
if matches and isinstance(matches[0], tuple):
    matches.sort(reverse=True, key=lambda x: x[0])
    matches = [doc for score, doc in matches[:5]]
else:
    matches = matches[:5]

# Display results
if matches:
    print(f"\n✅ Found {len(matches)} relevant documents:\n")
    for i, doc in enumerate(matches, 1):
        print(f"{i}. [{doc['type'].upper()}] {doc['title']}")
        content = doc['content'][:200] + "..." if len(doc['content']) > 200 else doc['content']
        print(f"   {content}")
        print()
else:
    print("\n❌ No matches found. Try different keywords.\n")
    print("Available document types:")
    types = set(doc['type'] for doc in documents)
    for t in types:
        count = sum(1 for doc in documents if doc['type'] == t)
        print(f"  - {t}: {count} documents")

print("=" * 70)
print(f"\n💡 Total documents in your digital twin: {len(documents)}")
print(f"   Types: {', '.join(set(doc['type'] for doc in documents))}\n")
