import { createBrowserRouter, Outlet } from "react-router";
import { Home } from "@/app/components/Home";
import { ArticlePage } from "@/app/components/ArticlePage";
import { CategoryPage } from "@/app/components/CategoryPage";
import { ChatPage } from "@/app/components/ChatPage";
import { ScrollToTop } from "@/app/components/ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/category/:category",
        Component: CategoryPage,
      },
      {
        path: "/article/:id",
        Component: ArticlePage,
      },
      {
        path: "/chat",
        Component: ChatPage,
      },
    ],
  },
]);