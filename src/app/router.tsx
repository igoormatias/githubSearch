import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/shared/layout";
import { SearchPage } from "@/features/search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
    ],
  },
]);
