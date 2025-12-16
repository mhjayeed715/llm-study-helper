require('dotenv').config();

async function studyHelper(userText) {
  const prompt = `You are an AI study assistant.

Given the topic or text below:
1. Explain it in simple terms (2-3 sentences).
2. List 5 key points as bullets.
3. Generate 3 practice questions with brief answers.

Input: ${userText}

Output format (exactly):
## Explanation
[Your simple explanation here]

## Key Points
- Point 1
- Point 2
- Point 3
- Point 4
- Point 5

## Practice Questions
1. [Question]?  
   **Answer:** [Brief answer]

2. [Question]?  
   **Answer:** [Brief answer]

3. [Question]?  
   **Answer:** [Brief answer]`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',  // Current free model
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 800
    })
  });

  const data = await response.json();
  if (data.choices && data.choices[0]) {
    console.log(data.choices[0].message.content);
  } else {
    console.error('Error:', data.error?.message || JSON.stringify(data, null, 2));
  }
}

const userText = process.argv.slice(2).join(' ') || 'Photosynthesis process';
studyHelper(userText);
