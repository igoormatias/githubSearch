import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const AppLayout = () => {
  return (
    <div className="app-shell min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
    </div>
  );
};
