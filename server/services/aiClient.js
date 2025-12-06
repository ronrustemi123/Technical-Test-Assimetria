import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in .env");
}

export async function generateArticle() {
  const prompt = `
Write a blog article about an interesting trend based on one of the categories below.
Use the following structure:

Title: {short, catchy title}
Headline: {1-2 sentence summary}
Category: {one of: Technology, Security, Gaming, Business, Development, Science}

Then write 3–6 paragraphs in simple, easy-to-understand language.

Make every article unique. No markdown or bullet formatting.
`;

  const sysPrompt = `
You are an expert blog writer.
Always follow the exact requested structure including the labels: Title:, Headline:, Category:
Category MUST be exactly one of: Technology, Security, Gaming, Business, Development, Science
Write clearly, friendly, and with variety each time.
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
        { role: "system", content: sysPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("OpenAI API Error:", err);
    throw new Error("Failed to generate article");
  }

  const data = await response.json();
  const text = data.choices[0].message.content.trim();
  const lines = text.split("\n").map(line => line.trim()).filter(Boolean);

  const titleLine = lines.find(line => line.toLowerCase().startsWith("title:"));
  const headlineLine = lines.find(line => line.toLowerCase().startsWith("headline:"));
  const categoryLine = lines.find(line => line.toLowerCase().startsWith("category:"));

  const title = titleLine ? titleLine.replace(/title:\s*/i, "").trim() : "Untitled";
  const headline = headlineLine ? headlineLine.replace(/headline:\s*/i, "").trim() : "";
  let category = categoryLine ? categoryLine.replace(/category:\s*/i, "").trim() : "";

  let lastMetaIndex = Math.max(
    lines.indexOf(titleLine),
    lines.indexOf(headlineLine),
    lines.indexOf(categoryLine)
  );

  const content = lines.slice(lastMetaIndex + 1).join("\n").trim();

  const allowedCategories = [
    "Technology",
    "Security",
    "Gaming",
    "Business",
    "Development",
    "Science",
  ];

  if (!allowedCategories.includes(category)) {
    const lower = text.toLowerCase();
    if (lower.includes("security") || lower.includes("cyber")) category = "Security";
    else if (lower.includes("game")) category = "Gaming";
    else if (lower.includes("business") || lower.includes("economy")) category = "Business";
    else if (lower.includes("developer") || lower.includes("coding")) category = "Development";
    else if (lower.includes("science") || lower.includes("research")) category = "Science";
    else category = "Technology";
  }

  return { title, headline, category, content };
}
