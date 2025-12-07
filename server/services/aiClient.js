import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in .env");
}



export async function generateArticle(existingTitles, leastUsedCategory) {
  const avoidTopics = existingTitles.length
    ? `Avoid writing about these topics: ${existingTitles.join(", ")}.`
    : "";
  const prompt = `
Write a blog article in the category: ${leastUsedCategory}

${avoidTopics}


Use this EXACT structure and labels:

Title: {short, catchy, original}
Headline: {1-2 sentence summary}
Category: {choose one: Technology, Security, Gaming, Business, Development, Science}

Then write 3–6 paragraphs in friendly, easy-to-understand language.

Rules:
- Do NOT change the required category
- No AI assistants / chatbots / daily helper bots
- Topic must be unique compared to all existing titles
- No markdown or bullet lists
`;
  const sysPrompt = `
You are an expert blog writer.
Strictly follow the structure:

Title:
Headline:
Category:

Category MUST be exactly one of:
Technology, Security, Gaming, Business, Development, Science.

Never repeat topics involving:
AI assistants, AI companions, chatbots, or personal AI helpers.

Vary the subject matter and writing style every time.
Write with clarity, creativity, and uniqueness.
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
