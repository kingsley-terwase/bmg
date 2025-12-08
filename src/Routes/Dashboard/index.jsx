import { Routes, Route } from "react-router-dom";
import {
  DashboardHome,
  Administrators,
  UsersPage,
  ExpertsPage,
  CategoriesPage,
  ServicesPage,
  AddServicePage,
  AddCategoriesPage,
  AddExpertPage,
  OrdersPage,
  AddAdminPage,
  AdminRoles,
  AddAdminRole
} from "../../Pages/Dashboard";
import { ExpertOverview, ExpertOrders } from "../../Pages/Experts";
import {
  UserOverview,
  UserOrders,
  UserSingleOrder,
  UserPaymentsPage,
  UserSinglePayment,
  UserAIPage,
  ConsultationsPage
} from "../../Pages/Users";
import DashboardLayout from "../../Layout/dashboard";

const DashboardRoutes = () => {
  return (
    <>
      <DashboardLayout>
        {/* //-----ADMIN DASHBOARD-----// */}
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="/view/admins" element={<Administrators />} />
          <Route path="/add/admin" element={<AddAdminPage />} />
          <Route path="/view/admin-roles" element={<AdminRoles />} />
          <Route path="/add/admin-roles" element={<AddAdminRole />} />

          <Route path="/users" element={<UsersPage />} />
          <Route path="/admin/experts" element={<ExpertsPage />} />
          <Route path="/admin/add/experts" element={<AddExpertPage />} />
          <Route path="/admin/services" element={<ServicesPage />} />
          <Route path="/admin/add/services" element={<AddServicePage />} />
          <Route path="/admin/categories" element={<CategoriesPage />} />
          <Route path="/admin/add/categories" element={<AddCategoriesPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
        </Routes>

        {/* //-----EXPERT DASHBOARD-----// */}
        <Routes>
          <Route path="/expert/overview" element={<ExpertOverview />} />
          <Route path="/expert/orders" element={<ExpertOrders />} />
        </Routes>

        {/* //-----USER DASHBOARD-----// */}
        <Routes>
          <Route path="/user/overview" element={<UserOverview />} />
          <Route path="/user/orders" element={<UserOrders />} />
          <Route path="/user/orders/single" element={<UserSingleOrder />} />
          <Route path="/user/payments" element={<UserPaymentsPage />} />

          <Route path="/user/payments/single" element={<UserSinglePayment />} />
          <Route
            path="/user/artificial-intelligence"
            element={<UserAIPage />}
          />
          <Route path="/user/consultations" element={<ConsultationsPage />} />
        </Routes>
      </DashboardLayout>
    </>
  );
};

export default DashboardRoutes;
