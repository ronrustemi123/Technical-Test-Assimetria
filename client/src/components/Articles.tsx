import { useState } from "react";
import ArticlesHeader from "./ArticlesHeader";
import type { Article } from "@/types/Article";
import ArticleCard from "./ArticleCard";

const categories: string[] = [
  "All",
  "Technology",
  "Security",
  "Gaming",
  "Business",
  "Development",
  "Science",
];

const Articles = ({ articles }: { articles: Article[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? articles
      : articles.filter(
          (el) =>
            el?.category?.toLowerCase() === selectedCategory?.toLowerCase()
        );

  return (
    <section className="min-h-screen">
      <ArticlesHeader
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-3 gap-10 mt-12">
        {filtered.map((el) => (
          <ArticleCard
            key={el.id}
            category={el.category}
            title={el.title}
            headline={el.headline}
            createdAt={el.createdAt}
          />
        ))}
      </div>
    </section>
  );
};

export default Articles;
