import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import AuthContainer from "./features/auth/Auth.container.tsx";
import DashboardContainer from "./features/dashboard/Dashboard.container.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AuthContainer />} />
          <Route path="dashboard" element={<DashboardContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
