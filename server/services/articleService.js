import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../db/articles.json");

export function readArticles() {
  const raw = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(raw);
}

export function writeArticles(articles) {
  fs.writeFileSync(dbPath, JSON.stringify(articles, null, 2));
}

export function getAllArticles() {
  return readArticles();
}

export function getArticleById(id) {
  return readArticles().find((a) => a.id === id);
}

export function addArticle(article) {
  const articles = readArticles();
  articles.push(article);
  writeArticles(articles);
}
