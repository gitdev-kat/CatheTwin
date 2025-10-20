# Job Postings Directory

This directory contains real job postings from Seek.com.au for interview simulation practice.

## Purpose

Use these job postings with your Digital Twin MCP Server to:
- Conduct realistic interview simulations
- Test your profile against real job requirements
- Identify skills gaps and areas for improvement
- Practice with different interviewer personas

## How to Use

### 1. Find a Job on Seek.com.au

Visit https://www.seek.com.au/ and search for jobs matching your skills:
- Look for roles that match 70-80% of your skills
- Select postings with detailed requirements
- Choose roles realistic for your experience level

### 2. Create a New Job File

```powershell
# Create a new job posting file
New-Item job-postings\job2.md
```

### 3. Copy Job Content

- Open the new .md file
- Copy entire job posting from Seek
- Include all details: description, requirements, salary, benefits
- Save the file

### 4. Run Interview Simulation

Use GitHub Copilot with this prompt:

```
@workspace You are a senior recruiter conducting a comprehensive interview simulation using the job posting in job-postings/job1.md and my digital twin MCP server data.

[Follow the complete interview process from Step 4]
```

## Interview Personas

Test with different interviewer types:

1. **HR Recruiter** - Cultural fit, basic qualifications
2. **Technical Interviewer** - Deep technical assessment
3. **Hiring Manager** - Role fit and team dynamics
4. **Project Manager** - Collaboration and delivery
5. **Head of People & Culture** - Values and culture fit
6. **Executive** - Strategic thinking and leadership

**Pro Tip:** Start a new Copilot chat session for each persona to avoid bias!

## Current Job Postings

- `job1.md` - [Add job title and company when filled in]

## Improvement Workflow

After each interview simulation:

1. **Review Feedback** - Note all scores and recommendations
2. **Identify Gaps** - List missing skills or weak areas
3. **Update Profile** - Enhance `digitaltwin.json` with:
   - STAR format project examples
   - Quantified achievements
   - Missing technical skills
   - Salary/location preferences
4. **Re-embed** - Run `python embed_digitaltwin.py`
5. **Re-test** - Run simulation again to verify improvements

## Success Metrics

Target scores for different interview stages:

- ✅ **HR Screen:** Pass recommendation
- ✅ **Technical:** 7+ on core skills
- ✅ **Hiring Manager:** 8+ role fit
- ✅ **Project Manager:** 7+ collaboration
- ✅ **People & Culture:** 8+ cultural fit
- ✅ **Executive:** 6+ leadership potential

## Tips for Better Results

### Job Selection
- Choose roles slightly above your current level (stretch goals)
- Look for detailed technical requirements
- Select companies whose culture matches your values

### Profile Enhancement
- Use STAR format for all major achievements
- Quantify everything with metrics
- Include salary/location preferences
- Add leadership and collaboration examples
- List specific tech stack experience years

### Interview Practice
- Answer concisely and directly
- Provide specific examples
- Reference quantified achievements
- Show enthusiasm for the role
- Ask clarifying questions when needed

## Example Enhanced Profile Structure

```json
{
  "salary_location": {
    "current_salary": "$90,000 AUD",
    "expectations": "$100,000 - $115,000 AUD",
    "location_preferences": ["Sydney", "Melbourne", "Remote"],
    "relocation_willing": true
  },
  "projects_star": [
    {
      "name": "E-commerce Platform Redesign",
      "situation": "Legacy system causing performance issues",
      "task": "Lead migration to microservices",
      "action": "Designed architecture, led team of 4",
      "result": "60% performance improvement, $200K savings"
    }
  ]
}
```

## Resources

- [Seek.com.au](https://www.seek.com.au/)
- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [Digital Twin Workshop](https://aiagents.ausbizconsulting.com.au/)
- [STAR Interview Method](https://www.seek.com.au/career-advice/article/how-to-use-the-star-interview-technique)
