import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/shared/styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
