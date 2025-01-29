import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import AuthContainer from "./features/auth/Auth.container.tsx";
import DashboardContainer from "./features/dashboard/Dashboard.container.tsx";
import AboutContainer from "./features/about/About.container.tsx";
import { AuthProvider } from "./features/auth/context/Auth.context.tsx";
import { BoardProvider } from "./features/board/context/Board.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BoardProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<AuthContainer />} />
              <Route path="dashboard" element={<DashboardContainer />} />
              <Route path="about" element={<AboutContainer />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BoardProvider>
    </AuthProvider>
  </StrictMode>
);
