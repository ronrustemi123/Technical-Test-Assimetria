import { addArticle, getAllArticles, getArticleById } from "../services/articleService.js";
import { generateArticle } from "../services/aiClient.js";

export function listArticles(req, res) {
  res.json(getAllArticles());
}

export function getArticle(req, res) {
  const id = parseInt(req.params.id, 10);
  const article = getArticleById(id);

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.json(article);
}

export async function generateArticleDb() {
  const text = await generateArticle();

  const article = {
    id: Date.now(),
    title: text.title,
    headline: text.headline,
    content: text.content,
    category: text.category,
    createdAt: new Date().toISOString(),
  };

  addArticle(article);

  console.log(article);
}
