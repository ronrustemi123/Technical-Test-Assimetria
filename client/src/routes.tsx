import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Article from "./pages/Article";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        Component: Home,
        loader: async ({ request }) => {
          const url = new URL(request.url);

          const page = Number(url.searchParams.get("page") ?? 1);
          const pageSize = 6;
          const category = url.searchParams.get("category") ?? "All";

          const response = await fetch(
            `http://localhost:8000/articles?page=${page}&pageSize=${pageSize}&category=${category}`,
            { signal: request.signal }
          );

          return response.json();
        },
      },
      {
        path: "article/:id",
        Component: Article,
        loader: ({ request, params }) =>
          fetch(`http://localhost:8000/articles/${params.id}`, {
            signal: request.signal,
          }),
      },
    ],
  },
]);
