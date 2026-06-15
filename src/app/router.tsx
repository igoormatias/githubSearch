import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/app/layouts";
import { SearchPage } from "@/features/search";
import { RootErrorBoundary } from "./RootErrorBoundary";
import { repositoryLoader } from "./routes/repository-route";

const UserPage = lazy(() =>
  import("@/features/github-user/pages/UserPage").then((module) => ({
    default: module.UserPage,
  })),
);

const RepositoryPage = lazy(() =>
  import("@/features/repositories/pages/RepositoryPage").then((module) => ({
    default: module.RepositoryPage,
  })),
);

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
