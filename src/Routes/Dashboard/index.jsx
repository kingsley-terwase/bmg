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
  AddAdminRole,
  SubCategoriesPage,
  AddSubCategoriesPage,
  ArtificialIntelligencePage,
  CategoryRequirementPage,
  AddCategoryRequirement,
  PaymentsPage,
  PortfoliosPage,
  AddPorfolios,
  BlogsPage,
  AddBlogsPage,
  GiftsPage,
  AddGiftsPage,
  AddCoupon,
  CouponsPage,
  ConsultationsPage,
  CampaignsPage,
  AddCampaigns,
  TestimonialsPage,
  AddTestimonialsPage,
  NotificationsPage,
  ComposeMailPage,
  IndustriesPage,
  AddIndustries,
  SupportPage,
  SettingsPage,
  ResourcesPage,
  ColorsPage,
  SubscriptionsPage,
  AddColors
} from "../../Pages/Dashboard";

import { ExpertOverview, ExpertOrders } from "../../Pages/Experts";

import {
  UserOverview,
  UserOrders,
  UserSingleOrder,
  UserPaymentsPage,
  UserSinglePayment,
  UserAIPage,
  UserConsultationsPage,
  UserNotificationsPage,
  UserSettingsPage,
  UserSubscriptionsPage
} from "../../Pages/Users";

import DashboardLayout from "../../Layout/dashboard";
import UserSupportPage from "../../Pages/Users/Support";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* ----- ADMIN ROUTES ----- */}
        <Route index element={<DashboardHome />} />
        <Route path="view/admins" element={<Administrators />} />
        <Route path="add/admin" element={<AddAdminPage />} />
        <Route path="view/admin-roles" element={<AdminRoles />} />
        <Route path="add/admin-roles" element={<AddAdminRole />} />

        <Route path="users" element={<UsersPage />} />
        <Route path="admin/experts" element={<ExpertsPage />} />
        <Route path="admin/add/experts" element={<AddExpertPage />} />
        <Route path="admin/services" element={<ServicesPage />} />
        <Route path="admin/add/services" element={<AddServicePage />} />
        <Route path="admin/categories" element={<CategoriesPage />} />
        <Route path="admin/add/categories" element={<AddCategoriesPage />} />
        <Route path="admin/sub-categories" element={<SubCategoriesPage />} />
        <Route
          path="admin/add/sub-categories"
          element={<AddSubCategoriesPage />}
        />
        <Route
          path="admin/categories-requirements"
          element={<CategoryRequirementPage />}
        />
        <Route
          path="admin/add/categories-requirement"
          element={<AddCategoryRequirement />}
        />

        <Route path="admin/orders" element={<OrdersPage />} />
        <Route
          path="admin/artificial-intelligence"
          element={<ArtificialIntelligencePage />}
        />
        <Route path="admin/payments" element={<PaymentsPage />} />
        <Route path="admin/portfolios" element={<PortfoliosPage />} />
        <Route path="admin/add/portfolios" element={<AddPorfolios />} />
        <Route path="admin/blogs" element={<BlogsPage />} />
        <Route path="admin/add/blogs" element={<AddBlogsPage />} />
        <Route path="admin/gifts" element={<GiftsPage />} />
        <Route path="admin/add/gifts" element={<AddGiftsPage />} />
        <Route path="admin/coupons" element={<CouponsPage />} />
        <Route path="admin/add/coupons" element={<AddCoupon />} />
        <Route path="admin/consultations" element={<ConsultationsPage />} />
        <Route path="admin/campaigns" element={<CampaignsPage />} />
        <Route path="admin/add/campaigns" element={<AddCampaigns />} />
        <Route path="admin/testimonials" element={<TestimonialsPage />} />
        <Route
          path="admin/add/testimonials"
          element={<AddTestimonialsPage />}
        />
        <Route path="admin/notifications" element={<NotificationsPage />} />
        <Route path="admin/mails" element={<ComposeMailPage />} />
        <Route path="admin/industries" element={<IndustriesPage />} />
        <Route path="admin/add/industries" element={<AddIndustries />} />
        <Route path="admin/support" element={<SupportPage />} />
        <Route path="admin/settings" element={<SettingsPage />} />
        <Route path="admin/resources" element={<ResourcesPage />} />
        <Route path="admin/colors" element={<ColorsPage />} />
        <Route path="admin/subscriptions" element={<SubscriptionsPage />} />
        <Route path="admin/add/colors" element={<AddColors />} />

        {/* ----- EXPERT ROUTES ----- */}
        <Route path="expert/overview" element={<ExpertOverview />} />
        <Route path="expert/orders" element={<ExpertOrders />} />

        {/* ----- USER ROUTES ----- */}
        <Route path="user/overview" element={<UserOverview />} />
        <Route path="user/orders" element={<UserOrders />} />
        <Route path="user/orders/single" element={<UserSingleOrder />} />
        <Route path="user/payments" element={<UserPaymentsPage />} />
        <Route path="user/payments/single" element={<UserSinglePayment />} />
        <Route path="user/artificial-intelligence" element={<UserAIPage />} />
        <Route path="user/consultations" element={<UserConsultationsPage />} />
        <Route path="user/notifications" element={<UserNotificationsPage />} />
        <Route path="user/settings" element={<UserSettingsPage />} />
        <Route path="user/subscriptions" element={<UserSubscriptionsPage />} />
        <Route path="user/support" element={<UserSupportPage />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
