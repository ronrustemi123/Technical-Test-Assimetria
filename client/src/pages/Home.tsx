import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
import { useLoaderData } from "react-router";

const Home = () => {
  const articles = useLoaderData();

  return (
    <main>
      <Header />
      <div className="main-wrapper">
        <Hero articles={articles} />
        <Articles articles={articles} />
      </div>
    </main>
  );
};

export default Home;
