import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
import { useLoaderData } from "react-router";

const Home = () => {
  const { articles, page, pageSize, totalCount } = useLoaderData();
  console.log(articles);
  return (
    <main>
      <div className="main-wrapper">
        <Hero articles={articles} />
        <Articles
          articles={articles}
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      </div>
    </main>
  );
};

export default Home;
