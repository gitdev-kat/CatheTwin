import json

# Load your profile
with open('digitaltwin.json', 'r', encoding='utf-8') as f:
    profile = json.load(f)

# Create documents from your profile
documents = []

# Summary document
documents.append({
    'id': 'summary-1',
    'title': 'Professional Summary',
    'type': 'summary',
    'content': f"{profile['name']} - {profile['title']}. {profile['summary']}",
    'tags': ['summary', 'profile']
})

# Experience documents
for i, exp in enumerate(profile.get('experience', [])):
    achievements = ' '.join(exp.get('achievements', []))
    content = f"{exp['role']} at {exp['company']} ({exp.get('start_date', '')} - {exp.get('end_date', '')}). {achievements}"
    documents.append({
        'id': f'experience-{i+1}',
        'title': f"{exp['role']} - {exp['company']}",
        'type': 'experience',
        'content': content,
        'tags': ['experience', 'work']
    })

# Projects documents
for i, proj in enumerate(profile.get('projects', [])):
    result_text = ' '.join(proj.get('result', []))
    action_text = ' '.join(proj.get('action', []))
    content = f"{proj['name']}. {proj.get('situation', '')} {proj.get('task', '')} Actions: {action_text} Results: {result_text}"
    documents.append({
        'id': f'project-{i+1}',
        'title': proj['name'],
        'type': 'project',
        'content': content,
        'tags': ['project'] + proj.get('tech_stack', [])[:3]
    })

# Skills document
skills_text = ', '.join([s['name'] for s in profile.get('skills', {}).get('programming_languages', [])])
documents.append({
    'id': 'skills-1',
    'title': 'Technical Skills',
    'type': 'skills',
    'content': f"Programming skills: {skills_text}. Frameworks: Laravel, NodeJS, Pandas, NumPy, scikit-learn",
    'tags': ['skills', 'technical']
})

# Education documents
for i, edu in enumerate(profile.get('education', [])):
    content = f"{edu['degree']} from {edu['institution']}. {edu.get('specialization', '')} {edu.get('status', '')}"
    documents.append({
        'id': f'education-{i+1}',
        'title': f"{edu['degree']} - {edu['institution']}",
        'type': 'education',
        'content': content,
        'tags': ['education']
    })

# Interview prep document
interview_prep = profile.get('interview_preparation', {})
screening = interview_prep.get('screening_call', {})
content = f"Elevator pitch: {screening.get('elevator_pitch', '')} Questions to expect: {' '.join(screening.get('top_questions_to_expect', []))}"
documents.append({
    'id': 'interview-prep-1',
    'title': 'Interview Preparation',
    'type': 'interview',
    'content': content,
    'tags': ['interview', 'preparation']
})

# Save in the format expected by reindex
output = {'documents': documents}
with open('digitaltwin.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f'✅ Created {len(documents)} documents ready for indexing')
print(f'   - {len([d for d in documents if d["type"] == "experience"])} experience entries')
print(f'   - {len([d for d in documents if d["type"] == "project"])} projects')
print(f'   - {len([d for d in documents if d["type"] == "education"])} education entries')
print(f'   - Plus summary, skills, and interview prep')
