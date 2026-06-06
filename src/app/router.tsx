import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/app/layouts";
import { SearchPage } from "@/features/search";
import { UserPage } from "@/features/github-user";
import { RepositoryPage } from "@/features/repositories";
import { RootErrorBoundary } from "./RootErrorBoundary";
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
