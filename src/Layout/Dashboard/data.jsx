import {
  GridViewRounded,
  SettingsRounded,
  ShoppingCartRounded,
  AssessmentRounded,
  NotificationsRounded,
  SupportAgentRounded,
  TipsAndUpdatesRounded,
  HelpCenterRounded,
  SubscriptionsRounded,
  CreditCardRounded,
  AdminPanelSettingsRounded,
  PeopleRounded,
  HandymanRounded,
  CategoryRounded,
  ShoppingBasketRounded,
  WorkRounded,
  RssFeedRounded,
  CardGiftcardRounded,
  CampaignRounded,
  ContactPageRounded,
  MailRounded,
  FactoryRounded,
  LayersRounded,
  ColorLensRounded
} from "@mui/icons-material";
export const getNav = (role = "user", userRole = null, subRole = null) => {
  const baseNav = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <GridViewRounded />,
      children: []
    },
    {
      label: "Administrators",
      path: "#",
      icon: <AdminPanelSettingsRounded />,
      children: [
        { label: "Add Admin", path: "/dashboard/add/admin" },
        { label: "View Admins", path: "/dashboard/view/admins" },
        { label: "Admin Roles", path: "/dashboard/admin/roles" },
        { label: "Admin Permissions", path: "/dashboard/admin/permissions" }
      ]
    },
    {
      label: "Users",
      path: "/dashboard/users",
      icon: <PeopleRounded />,
      children: []
    },
    {
      label: "Experts",
      path: "#",
      icon: <HandymanRounded />,
      children: [
        { label: "Add Expert", path: "/dashboard/admin/add/experts" },
        { label: "View Expert", path: "/dashboard/admin/experts" }
      ]
    },
    {
      label: "Categories",
      path: "#",
      icon: <CategoryRounded />,
      children: [
        { label: "Add Category", path: "/dashboard/admin/add/categories" },
        { label: "View Categories", path: "/dashboard/admin/categories" }
      ]
    },
    {
      label: "Services",
      path: "#",
      icon: <ShoppingBasketRounded />,
      children: [
        { label: "Add Service", path: "/dashboard/admin/add/services" },
        { label: "View Services", path: "/dashboard/admin/services" }
      ]
    },
    {
      label: "Orders",
      path: "/dashboard/admin/orders",
      icon: <ShoppingCartRounded />,
      children: []
    },
    {
      label: "Payments",
      path: "/dashboard/payments",
      icon: <CreditCardRounded />,
      children: []
    },
    {
      label: "AI",
      path: "/dashboard/artificial-intelligence",
      icon: <TipsAndUpdatesRounded />,
      children: []
    },
    {
      label: "Portfolio",
      path: "/dashboard/portfolios",
      icon: <WorkRounded />,
      children: []
    },
    {
      label: "Blog",
      path: "/dashboard/blogs",
      icon: <RssFeedRounded />,
      children: []
    },
    {
      label: "Gifts",
      path: "/dashboard/gifts",
      icon: <CardGiftcardRounded />,
      children: []
    },
    {
      label: "Consultations",
      path: "/dashboard/consultations",
      icon: <HelpCenterRounded />,
      children: []
    },
    {
      label: "Campaigns",
      path: "/dashboard/campaigns",
      icon: <CampaignRounded />,
      children: []
    },
    {
      label: "Testimonials",
      path: "/dashboard/testimonials",
      icon: <ContactPageRounded />,
      children: []
    },
    {
      label: "Notifications",
      path: "/dashboard/notifications",
      icon: <NotificationsRounded />,
      children: []
    },
    {
      label: "Mails",
      path: "/dashboard/mails",
      icon: <MailRounded />,
      children: []
    },
    {
      label: "Support",
      path: "/dashboard/campaigns",
      icon: <CampaignRounded />,
      children: []
    },
    {
      label: "Industry",
      path: "/dashboard/campaigns",
      icon: <FactoryRounded />,
      children: []
    },
    {
      label: "Resources",
      path: "/dashboard/resources",
      icon: <LayersRounded />,
      children: []
    },
    {
      label: "Subscription",
      path: "/dashboard/subscriptions",
      icon: <SubscriptionsRounded />,
      children: []
    },
    {
      label: "Colors",
      path: "/dashboard/colors",
      icon: <ColorLensRounded />,
      children: []
    },
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <SettingsRounded />,
      children: []
    }
  ];

  const expertNav = [
    {
      label: "Dashboard",
      path: "/dashboard/expert/overview",
      icon: <GridViewRounded />,
      children: []
    },
    {
      label: "Orders",
      path: "/dashboard/expert/orders",
      icon: <ShoppingCartRounded />,
      children: []
    },
    {
      label: "Earnings",
      path: "/dashboard/expert/earnings",
      icon: <AssessmentRounded />,
      children: []
    },
    {
      label: "Notifications",
      path: "/dashboard/expert/notifications",
      icon: <NotificationsRounded />,
      children: []
    },
    {
      label: "Support",
      path: "/dashboard/expert/support",
      icon: <SupportAgentRounded />,
      children: []
    },
    {
      label: "Settings",
      path: "/dashboard/expert/settings",
      icon: <SettingsRounded />,
      children: []
    }
  ];

  const userNav = [
    {
      label: "Dashboard",
      path: "/dashboard/user/overview",
      icon: <GridViewRounded />,
      children: []
    },
    {
      label: "Orders",
      path: "/dashboard/user/orders",
      icon: <ShoppingCartRounded />,
      children: []
    },
    {
      label: "Payments",
      path: "/dashboard/user/payments",
      icon: <CreditCardRounded />,
      children: []
    },
    {
      label: "AI",
      path: "/dashboard/user/artificial-intelligence",
      icon: <TipsAndUpdatesRounded />,
      children: []
    },
    {
      label: "Consultations",
      path: "/dashboard/user/consultations",
      icon: <HelpCenterRounded />,
      children: []
    },
    {
      label: "Notifications",
      path: "/dashboard/user/notifications",
      icon: <NotificationsRounded />,
      children: []
    },
    {
      label: "Support",
      path: "/dashboard/user/support",
      icon: <SupportAgentRounded />,
      children: []
    },
    {
      label: "Subscriptions",
      path: "/dashboard/user/subscriptions",
      icon: <SubscriptionsRounded />,
      children: []
    },
    {
      label: "Settings",
      path: "/dashboard/user/settings",
      icon: <SettingsRounded />,
      children: []
    }
  ];

  // Return navigation based on role
  if (role === "admin") {
    return [...baseNav, ...expertNav, ...userNav];
  }

  return [...baseNav];
};

// side nav drawer styles
export const sideNavPaperStyles = (width) => ({
  "& .MuiDrawer-paper": {
    width: width,
    boxSizing: "border-box",
    backgroundColor: "#F9FAFB",
    borderRight: "1px solid #e0e0e0",
    padding: "10px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "4px"
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#D2D7D7",
      borderRadius: "10px",
      "&:hover": {
        background: "#9f9f9fff"
      }
    }
  }
});
