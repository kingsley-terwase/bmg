import DashboardLayout from "../Layout/Dashboard";
import AdminRoutes from "./admin";
import ExpertRoutes from "./expert";
import UsersRoutes from "./users";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <AdminRoutes />
      <ExpertRoutes />
      <UsersRoutes />
    </DashboardLayout>
  );
};

export default DashboardRoutes;
