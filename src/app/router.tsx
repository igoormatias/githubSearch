import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/shared/layout";
import { SearchPage } from "@/features/search";
import { UserPage, UserPageError } from "@/features/user";
import { userLoader } from "./routes/user-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: "user/:username",
        element: <UserPage />,
        loader: userLoader,
        errorElement: <UserPageError />,
      },
    ],
  },
]);
