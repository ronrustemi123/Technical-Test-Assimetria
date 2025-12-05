import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in .env");
}

export async function generateArticle() {
  const prompt = `
  Write a blog article with:
  - a short, catchy title
  - 3–6 paragraphs of text
  - simple language
  - no formatting (no markdown)
  Topic: something interesting about technology.
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You generate simple blog articles." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("OpenAI API Error:", err);
    throw new Error("Failed to generate article");
  }

  const data = await response.json();
  const text = data.choices[0].message.content.trim();

  const [firstLine, ...rest] = text.split("\n");
  return {
    title: firstLine.replace(/"/g, ""),
    content: rest.join("\n").trim(),
  };
}
