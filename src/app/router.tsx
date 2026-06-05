import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/shared/layout";
import { SearchPage } from "@/features/search";
import { UserPage, UserPageError } from "@/features/user";
import { RepositoryPage } from "@/features/repositories";
import { RootErrorBoundary } from "./RootErrorBoundary";
import { userLoader } from "./routes/user-route";
import { repositoryLoader } from "./routes/repository-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <RootErrorBoundary />,
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
      {
        path: "repository/:owner/:repo",
        element: <RepositoryPage />,
        loader: repositoryLoader,
        errorElement: <RootErrorBoundary />,
      },
    ],
  },
]);
