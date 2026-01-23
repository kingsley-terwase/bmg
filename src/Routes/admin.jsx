/* ----- ADMIN ROUTES ----- */
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
  EditAdminPage,
  AdminRoles,
  AddAdminRole,
  SubCategoriesPage,
  AddSubCategoriesPage,
  ArtificialIntelligencePage,
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
  EbooksPage,
  SubscriptionsPage,
  AdminPermissions,
  PaymentsMethodsPage,
  AddPaymentMethods,
  EditPaymentMethod,
  ServiceTypesPage,
  AddServiceTypePage,
  AddSubscriptionPage,
  AddUsersPage,
  CategoryFaqPage,
  AddCategoryFaqs,
  ServiceFaqsPage,
  AddServiceFaqs,
  FaqsPage,
  AddFaq,
  VouchersPage,
  AddVoucherPage,
  BlogCategoryPage,
  AddBlogCategory,
  CurrenciesPage,
  AddCurrency,
  UserCreditsPage,
  AddEbooks,
} from "../Pages/Dashboard";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="view/admins" element={<Administrators />} />
      <Route path="add/admin" element={<AddAdminPage />} />
      <Route path="edit/admin" element={<EditAdminPage />} />
      <Route path="view/admin-roles" element={<AdminRoles />} />
      <Route path="add/admin-roles" element={<AddAdminRole />} />
      <Route path="admin/customers" element={<UsersPage />} />
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
      <Route path="admin/add/testimonials" element={<AddTestimonialsPage />} />
      <Route path="admin/notifications" element={<NotificationsPage />} />
      <Route path="admin/mails" element={<ComposeMailPage />} />
      <Route path="admin/industries" element={<IndustriesPage />} />
      <Route path="admin/add/industries" element={<AddIndustries />} />
      <Route path="admin/support" element={<SupportPage />} />
      <Route path="admin/settings" element={<SettingsPage />} />
      <Route path="admin/ebooks" element={<EbooksPage />} />
      <Route path="admin/add/ebook" element={<AddEbooks />} />
      <Route path="admin/currencies" element={<CurrenciesPage />} />
      <Route path="admin/subscriptions" element={<SubscriptionsPage />} />
      <Route path="admin/add/currency" element={<AddCurrency />} />
      <Route path="manage/admin-permissions" element={<AdminPermissions />} />
      <Route path="manage/payment-methods" element={<PaymentsMethodsPage />} />
      <Route path="admin/add/payment-method " element={<AddPaymentMethods />} />
      <Route
        path="admin/payment-methods/edit"
        element={<EditPaymentMethod />}
      />
      <Route path="admin/service-types" element={<ServiceTypesPage />} />
      <Route path="admin/add/service-type" element={<AddServiceTypePage />} />
      <Route path="admin/add/subscription" element={<AddSubscriptionPage />} />
      <Route path="admin/add/customer" element={<AddUsersPage />} />
      <Route path="admin/category-faqs" element={<CategoryFaqPage />} />
      <Route path="admin/add/category-faq" element={<AddCategoryFaqs />} />
      <Route path="admin/services-faqs" element={<ServiceFaqsPage />} />
      <Route path="admin/add/service-faq" element={<AddServiceFaqs />} />
      <Route path="admin/faqs" element={<FaqsPage />} />
      <Route path="admin/add/faq" element={<AddFaq />} />
      <Route path="admin/vouchers" element={<VouchersPage />} />
      <Route path="admin/add/vouchers" element={<AddVoucherPage />} />
      <Route path="admin/add/blog-category" element={<AddBlogCategory />} />
      <Route path="admin/blog-categories" element={<BlogCategoryPage />} />
      <Route path="admin/user-credits" element={<UserCreditsPage />} />
    </Routes>
  );
};

export default AdminRoutes;
