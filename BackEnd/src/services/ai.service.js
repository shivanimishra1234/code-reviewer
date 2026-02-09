import Groq from "groq-sdk";

let lastCallTime = 0;
const COOLDOWN_MS = 4_000;

function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  return new Groq({
    apiKey: process.env.GROQ_API_KEY.trim(),
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateContent(code) {
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;

  if (timeSinceLastCall < COOLDOWN_MS) {
    const waitTime = COOLDOWN_MS - timeSinceLastCall;
    console.log(`Rate limit hit. Waiting ${waitTime} ms...`);
    await sleep(waitTime); // ✅ wait instead of error
  }

  try {
    console.log("Calling Groq...");

    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are an AI-powered code reviewer.

Analyze the code and provide:
1. Errors
2. Bad practices
3. Fixes
4. Improvements
5. Security issues
6. Performance optimizations
          `,
        },
        {
          role: "user",
          content: code,
        },
      ],
      temperature: 0.3,
    });

    lastCallTime = Date.now();
    return completion.choices[0].message.content;

  } catch (error) {
    throw new Error(`AI Service Error: ${error.message}`);
  }
}

export default generateContent;
