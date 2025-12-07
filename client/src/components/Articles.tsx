import ArticlesHeader from "./ArticlesHeader";
import type { Article } from "@/types/Article";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";
import { CustomPagination } from "./CustomPagination";
import { useNavigate, useSearchParams } from "react-router-dom";

const categories: string[] = [
  "All",
  "Technology",
  "Security",
  "Gaming",
  "Business",
  "Development",
  "Science",
];

const Articles = ({
  articles,
  page,
  totalCount,
}: {
  articles: Article[];
  page: number;
  pageSize: number;
  totalCount: number;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const selectedCategory = searchParams.get("category") || "All";

  const setSelectedCategory = (value: string) => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set("category", value);
    newSearch.set("page", "1");
    navigate(`?${newSearch.toString()}`);
  };

  return (
    <section className="min-h-screen mt-12">
      <ArticlesHeader
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {articles?.length ? (
          articles.map((el: Article) => (
            <Link key={el.id} to={`/article/${el.id}`}>
              <ArticleCard {...el} />
            </Link>
          ))
        ) : (
          <p className="text-accent text-2xl col-span-3 mt-12 text-center">
            No articles found
          </p>
        )}
      </div>

      <div className="mt-12">
        <CustomPagination page={page} totalCount={totalCount} />
      </div>
    </section>
  );
};

export default Articles;
