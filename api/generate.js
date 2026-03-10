export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set in Vercel Environment Variables' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: 'Failed to parse request body: ' + e.message });
  }

  try {
    const { prompt } = body;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a world-class marketing strategist. Always respond with valid JSON only. No markdown, no explanation, no preamble.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.9,
        max_tokens: 4000,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'Groq API error' });
    }

    const text = data?.choices?.[0]?.message?.content;
    if (!text) return res.status(500).json({ error: 'No text in Groq response' });

    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
