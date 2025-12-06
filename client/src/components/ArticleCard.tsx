import placeholderImg from "@/assets/placeholder.jpg";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import dayjs from "dayjs";

const ArticleCard = ({
  title,
  headline,
  category,
  createdAt,
}: {
  title: string;
  headline: string;
  category: string;
  createdAt: string;
}) => {
  const date = dayjs(createdAt).format("MMMM D, YYYY");

  return (
    <div className="flex flex-col shadow min-h-[500px] group rounded-lg bg-white">
      <div className=" overflow-hidden rounded-t-lg">
        <img
          src={placeholderImg}
          alt="Placeholder Image"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-150 rounded-t-lg"
        />
      </div>
      <div className=" p-3.5 overflow-hidden flex flex-col grow">
        <h2 className="font-title font-extrabold text-xl ">{title}</h2>
        <p className="font-satoshi text-paragraph text-sm mt-1.5">{headline}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="font-satoshi text-sm text-paragraph font-medium">
            {date}
          </p>
          <Button
            variant={"ghost"}
            className="text-accent group-hover:text-accent/80 hover:text-accent/80 hover:bg-white flex items-center"
          >
            Read More
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
