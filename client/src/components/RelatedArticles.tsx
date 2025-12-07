import { useEffect, useState } from "react";
import type { Article } from "@/types/Article";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router";

const RelatedArticles = ({ id }: { id: number }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://16.171.253.245:4000/articles/");
      const data = await res.json();

      if (!res.ok) {
        console.error("Error fetching related articles");
        return;
      }

      setArticles(data.articles);
    };

    fetchData();
  }, []);

  return (
    <section className="main-wrapper min-h-[50vh] pt-6 ">
      <h3 className="font-title font-extrabold text-3xl mb-6">
        Other Articles
      </h3>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles
          .filter((el) => id != el.id)
          .slice(0, 3)
          .map((el) => (
            <Link to={`/article/${el.id}`} key={el.id}>
              <ArticleCard
                category={el.category}
                title={el.title}
                createdAt={el.createdAt}
                headline={el.headline}
              />
            </Link>
          ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
