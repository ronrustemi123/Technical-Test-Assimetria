import { Router } from "express";
import {
  listArticles,
  getArticle,
  generateArticleDb,
} from "../controllers/articlesController.js";

const router = Router();

router.get("/", listArticles);
router.get("/:id", getArticle);
router.post("/generate", generateArticleDb);

export default router;
