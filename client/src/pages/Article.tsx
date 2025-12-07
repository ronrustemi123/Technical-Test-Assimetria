import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLoaderData } from "react-router";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import RelatedArticles from "@/components/RelatedArticles";

export default function Article() {
  const { title, headline, content, createdAt, id } = useLoaderData();
  const date = dayjs(createdAt).format("MMMM D, YYYY");

  const paragraphs = content.split("\n").map((p: string) => p.trim());

  return (
    <>
      <article className="min-h-[calc(100vh-80px)] article-wrapper">
        <Link
          to={"/"}
          className="flex items-center font-satoshi text-paragraph gap-2 mt-8"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>
        <h1 className="text-4xl md:text-5xl font-title font-bold mt-8 md:mt-16">
          {title}
        </h1>
        <h2 className="font-satoshi text-lg md:text-xl  text-paragraph mt-6">
          {headline}
        </h2>
        <div className="flex items-center gap-3.5 mt-8">
          <span className="flex gap-2 items-center ">
            <Calendar color="#707070" size={16} />
            <p className="font-satoshi text-sm text-paragraph font-medium">
              {date}
            </p>
          </span>
        </div>
        <Separator className="my-8" />
        <img
          src={"https://placehold.co/600x400/000000/FFF"}
          alt="Placeholder Image"
          className="w-full h-full object-cover object-center rounded-xl"
        />
        <div className="mt-8">
          {paragraphs.map((text: string, index: number) => (
            <p
              key={index}
              className="mb-4 leading-relaxed font-satoshi  text-lg"
            >
              {text}
            </p>
          ))}
        </div>
        <Separator className="my-8" />
      </article>
      <RelatedArticles id={id} />
    </>
  );
}
