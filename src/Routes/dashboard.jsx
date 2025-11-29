import { Routes, Route } from "react-router-dom";
import { DashboardHome } from "../Pages/Dashboard";

const DashboardRoutes = () => {
  return (
    // <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
      </Routes>
    // </DashboardLayout>
  );
};

export default DashboardRoutes;
