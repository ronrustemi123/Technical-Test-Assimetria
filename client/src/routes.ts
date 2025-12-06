import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Article from "./pages/Article";

export let router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    loader: ({ request }) =>
      fetch(`http://localhost:8000/articles`, {
        signal: request.signal,
      }),
  },
  {
    path: "/article/:id",
    Component: Article,
    loader: ({ request, params }) =>
      fetch(`http://localhost:8000/articles/${params.id}`, {
        signal: request.signal,
      }),
  },
]);
