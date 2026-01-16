import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./public";
import DashboardRoutes from "./dashboard";

export default function Router() {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />

      <Route path="/dashboard/*" element={<DashboardRoutes />} />
    </Routes>
  );
}
