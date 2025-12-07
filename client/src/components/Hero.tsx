import type { Article } from "../types/Article";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Hero = ({ articles }: { articles: Article[] }) => {
  const featuredArticle = articles[articles.length - 1];

  if (!featuredArticle) {
    return (
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  const title = featuredArticle.title;
  const date = dayjs(featuredArticle.createdAt).format("MMMM D, YYYY");

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col mt-12 md:flex-row items-center">
      <div className="w-full md:w-1/2 mb-32 flex flex-col gap-4">
        <p className="text-accent font-satoshi text-sm font-medium">
          FEATURED ARTICLE
        </p>
        <span className="text-paragraph -mt-3.5 font-medium text-xs">
          {date}
        </span>
        <h1 className="text-4xl md:text-5xl font-title font-bold">{title}</h1>
        <h2 className="text-base md:text-xl font-satoshi text-paragraph font-medium">
          {featuredArticle.headline}
        </h2>
        <Link to={`/article/${featuredArticle.id}`}>
          <Button className="font-satoshi w-fit bg-accent">
            Read Article
            <ArrowRight />
          </Button>
        </Link>
      </div>
      <div className="w-full md:w-1/2"></div>
    </section>
  );
};

export default Hero;
