import { addArticle, getAllArticles, getArticleById } from "../services/articleService.js";
import { generateArticle } from "../services/aiClient.js";

export function listArticles(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 6;
  const category = req.query.category?.toLowerCase() || "all";

  let data = getAllArticles();

  if (category !== "all") {
    data = data.filter(
      (a) => a.category?.toLowerCase() === category
    );
  }

  const totalCount = data.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const articles = data.slice(start, end);

  res.json({
    articles,
    totalCount,
    page,
    pageSize,
    category,
  });
}


export function getArticle(req, res) {
  const id = parseInt(req.params.id, 10);
  const article = getArticleById(id);

  if (!article) {
    return res.status(404).json({ error: "Article not found" });
  }

  res.json(article);
}

export async function generateArticleDb(titles, category) {
  const text = await generateArticle(titles, category);

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
