import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router";

export const AppProviders = () => {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};
