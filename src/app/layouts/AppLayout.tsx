import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Container } from "./Container";
import { Skeleton } from "@/shared/ui";

const RouteFallback = () => (
  <Container className="py-5" aria-busy="true" aria-label="Carregando...">
    <Skeleton className="w-100 rounded" style={{ height: "12rem" }} />
  </Container>
);

export const AppLayout = () => {
  return (
    <div className="app-shell min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
