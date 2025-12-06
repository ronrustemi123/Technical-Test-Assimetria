import type { Article } from "../types/Article";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";

const Hero = ({ articles }: { articles: Article[] }) => {
  const featuredArticle: Article = articles[articles.length - 1];
  const title = featuredArticle.title;

  const date = dayjs(featuredArticle.createdAt).format("MMMM D, YYYY");

  return (
    <section className="h-[calc(100vh-80px)] flex items-center">
      <div className="w-1/2 mb-32 flex flex-col gap-4">
        <p className="text-accent font-satoshi text-sm font-medium">
          FEATURED ARTICLE
        </p>
        <span className="text-paragraph -mt-3.5 font-medium text-xs">
          {date}
        </span>
        <h1 className="text-5xl font-title font-bold">{title}</h1>
        <h2 className="text-xl font-satoshi text-paragraph font-medium">
          {featuredArticle.headline}
        </h2>
        <Button className="font-satoshi w-fit bg-accent">
          Read Article
          <ArrowRight />
        </Button>
      </div>
      <div className="w-1/2"></div>
    </section>
  );
};

export default Hero;
