import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
import { useLoaderData } from "react-router";

const Home = () => {
  const { articles, page, pageSize, totalCount } = useLoaderData();
  return (
    <main>
      <div className="main-wrapper">
        <Hero articles={articles} />
        <Articles
          originalArticles={articles}
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    </main>
  );
};

export default Home;
