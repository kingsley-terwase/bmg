/* ----- EXPERT ROUTES ----- */

import { Routes, Route } from "react-router-dom";
import { ExpertOverview, ExpertOrders } from "../Pages/Experts";

const ExpertRoutes = () => {
  return (
    <Routes>
      <Route path="expert/overview" element={<ExpertOverview />} />
      <Route path="expert/orders" element={<ExpertOrders />} />
    </Routes>
  );
};

export default ExpertRoutes;
