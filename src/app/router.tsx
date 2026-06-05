import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/shared/layout";

const HomePlaceholder = () => {
  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-4">
      <p className="text-foreground-muted">GitHub User Explorer</p>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePlaceholder />,
      },
    ],
  },
]);
