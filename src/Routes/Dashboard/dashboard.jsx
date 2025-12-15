import {
  DashboardHome,
  Administrators,
  UsersPage,
  ExpertsPage,
  CategoriesPage,
  ServicesPage,
  OrdersPage,
  PaymentsPage,
  ArtificialIntelligencePage,
  PortfoliosPage,
  BlogsPage,
  GiftsPage,
  ConsultationsPage,
  CampaignsPage,
  TestimonialsPage,
  NotificationsPage,
  MailsPage,
  ResourcesPage,
  SubscriptionsPage,
  ColorsPage,
  SettingsPage,
} from "../../Pages/Dashboard";

import { ExpertOverview } from "../../Pages/Experts";
import { UserOverview } from "../../Pages/Users";

// Admin Routes
export const adminRoutes = [
  {
    path: "",
    element: <DashboardHome />,
    name: "Dashboard",
  },
  {
    path: "add/admin",
    element: <Administrators />,
    name: "Add Admin",
  },
  {
    path: "view/admins",
    element: <Administrators />,
    name: "View Admins",
  },
  {
    path: "users",
    element: <UsersPage />,
    name: "Users",
  },
  {
    path: "add/expert",
    element: <ExpertsPage />,
    name: "Add Expert",
  },
  {
    path: "view/expert",
    element: <ExpertsPage />,
    name: "View Experts",
  },
  {
    path: "add/category",
    element: <CategoriesPage />,
    name: "Add Category",
  },
  {
    path: "view/categories",
    element: <CategoriesPage />,
    name: "View Categories",
  },
  {
    path: "add/service",
    element: <ServicesPage />,
    name: "Add Service",
  },
  {
    path: "view/services",
    element: <ServicesPage />,
    name: "View Services",
  },
  {
    path: "orders",
    element: <OrdersPage />,
    name: "Orders",
  },
  {
    path: "payments",
    element: <PaymentsPage />,
    name: "Payments",
  },
  {
    path: "artificial-intelligence",
    element: <ArtificialIntelligencePage />,
    name: "AI",
  },
  {
    path: "portfolios",
    element: <PortfoliosPage />,
    name: "Portfolios",
  },
  {
    path: "blogs",
    element: <BlogsPage />,
    name: "Blogs",
  },
  {
    path: "gifts",
    element: <GiftsPage />,
    name: "Gifts",
  },
  {
    path: "consultations",
    element: <ConsultationsPage />,
    name: "Consultations",
  },
  {
    path: "campaigns",
    element: <CampaignsPage />,
    name: "Campaigns",
  },
  {
    path: "testimonials",
    element: <TestimonialsPage />,
    name: "Testimonials",
  },
  {
    path: "notifications",
    element: <NotificationsPage />,
    name: "Notifications",
  },
  {
    path: "mails",
    element: <MailsPage />,
    name: "Mails",
  },
  {
    path: "resources",
    element: <ResourcesPage />,
    name: "Resources",
  },
  {
    path: "subscriptions",
    element: <SubscriptionsPage />,
    name: "Subscriptions",
  },
  {
    path: "colors",
    element: <ColorsPage />,
    name: "Colors",
  },
  {
    path: "settings",
    element: <SettingsPage />,
    name: "Settings",
  },
];

// Expert Routes
export const expertRoutes = [
  {
    path: "expert/overview",
    element: <ExpertOverview />,
    name: "Expert Dashboard",
  },
  {
    path: "expert/orders",
    element: <OrdersPage />,
    name: "Expert Orders",
  },
  {
    path: "expert/earnings",
    element: <div>Expert Earnings</div>,
    name: "Expert Earnings",
  },
  {
    path: "expert/notifications",
    element: <NotificationsPage />,
    name: "Expert Notifications",
  },
  {
    path: "expert/support",
    element: <div>Expert Support</div>,
    name: "Expert Support",
  },
  {
    path: "expert/settings",
    element: <SettingsPage />,
    name: "Expert Settings",
  },
];

// User Routes
export const userRoutes = [
  {
    path: "user/overview",
    element: <UserOverview />,
    name: "User Dashboard",
  },
  {
    path: "user/orders",
    element: <OrdersPage />,
    name: "User Orders",
  },
  {
    path: "user/payments",
    element: <PaymentsPage />,
    name: "User Payments",
  },
  {
    path: "user/artificial-intelligence",
    element: <ArtificialIntelligencePage />,
    name: "User AI",
  },
  {
    path: "user/consultations",
    element: <ConsultationsPage />,
    name: "User Consultations",
  },
  {
    path: "user/notifications",
    element: <NotificationsPage />,
    name: "User Notifications",
  },
  {
    path: "user/support",
    element: <div>User Support</div>,
    name: "User Support",
  },
  {
    path: "user/subscriptions",
    element: <SubscriptionsPage />,
    name: "User Subscriptions",
  },
  {
    path: "user/settings",
    element: <SettingsPage />,
    name: "User Settings",
  },
];