import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainHomepage } from "./screens/MainHomepage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <MainHomepage />
  </StrictMode>,
);
