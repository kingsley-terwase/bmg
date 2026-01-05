import { FactoryRounded } from "@mui/icons-material";
import { EMOJI_ICONS } from "../../Config/emojiIcons";
import { PERMISSIONS } from "../../Config/auth/permissions";

export const getNav = (role, subRole = null, type = null) => {
  const adminNav = [
    role === 1 && {
      label: "Dashboard",
      path: "/dashboard",
      icon: EMOJI_ICONS.gridView,
      children: []
    },
    role === 1 && {
      label: "Administrators",
      path: "#",
      icon: EMOJI_ICONS.adminPanel,
      children: [
        { label: "Add Admin", path: "/dashboard/add/admin" },
        { label: "View Admins", path: "/dashboard/view/admins" }
      ]
    },
    role === 1 && {
      label: "Roles and Permissions",
      path: "/dashboard/view/admin-roles",
      icon: EMOJI_ICONS.adminPanel,
      children: []
    },
    {
      label: "Manage Users",
      path: "/dashboard/users",
      icon: EMOJI_ICONS.people,
      children: []
    },
    {
      label: "Manage Experts",
      path: "#",
      icon: EMOJI_ICONS.handyman,
      children: [
        { label: "Add Expert", path: "/dashboard/admin/add/experts" },
        { label: "View Expert", path: "/dashboard/admin/experts" }
      ]
    },
    {
      label: "Categories",
      path: "#",
      icon: EMOJI_ICONS.category,
      children: [
        {
          label: "Requirements",
          path: "/dashboard/admin/categories-requirements"
        },
        { label: "Add Category", path: "/dashboard/admin/add/categories" },
        { label: "View Categories", path: "/dashboard/admin/categories" }
      ]
    },
    {
      label: "Sub Categories",
      path: "#",
      icon: EMOJI_ICONS.accountTree,
      children: [
        {
          label: "Add Sub Category",
          path: "/dashboard/admin/add/sub-categories"
        },
        {
          label: "View Sub Categories",
          path: "/dashboard/admin/sub-categories"
        }
      ]
    },
    {
      label: "Services",
      path: "#",
      icon: EMOJI_ICONS.shoppingBasket,
      children: [
        { label: "Add Service", path: "/dashboard/admin/add/services" },
        { label: "View Services", path: "/dashboard/admin/services" }
      ]
    },
    {
      label: "Orders",
      path: "/dashboard/admin/orders",
      icon: EMOJI_ICONS.shoppingCart,
      children: []
    },
    {
      label: "Payments",
      path: "/dashboard/admin/payments",
      icon: EMOJI_ICONS.creditCard,
      children: []
    },
    {
      label: "AI",
      path: "/dashboard/admin/artificial-intelligence",
      icon: EMOJI_ICONS.tips,
      children: []
    },
    {
      label: "Portfolio",
      path: "/dashboard/admin/portfolios",
      icon: EMOJI_ICONS.work,
      children: []
    },
    {
      label: "Blog",
      path: "/dashboard/admin/blogs",
      icon: EMOJI_ICONS.rss,
      children: []
    },
    {
      label: "Gifts",
      path: "/dashboard/admin/gifts",
      icon: EMOJI_ICONS.cardGift,
      children: []
    },
    {
      label: "Coupons",
      path: "/dashboard/admin/coupons",
      icon: EMOJI_ICONS.localActivity,
      children: []
    },
    {
      label: "Consultations",
      path: "/dashboard/admin/consultations",
      icon: EMOJI_ICONS.helpCenter,
      children: []
    },
    {
      label: "Campaigns",
      path: "/dashboard/admin/campaigns",
      icon: EMOJI_ICONS.campaign,
      children: []
    },
    {
      label: "Testimonials",
      path: "/dashboard/admin/testimonials",
      icon: EMOJI_ICONS.contactPage,
      children: []
    },
    {
      label: "Notifications",
      path: "/dashboard/admin/notifications",
      icon: EMOJI_ICONS.notifications,
      children: []
    },
    {
      label: "Mails",
      path: "/dashboard/admin/mails",
      icon: EMOJI_ICONS.mail,
      children: []
    },
    {
      label: "Support",
      path: "/dashboard/admin/support",
      icon: EMOJI_ICONS.supportAgent,
      children: []
    },
    {
      label: "Industry",
      path: "/dashboard/admin/industries",
      icon: <FactoryRounded />,
      children: []
    },
    {
      label: "Resources",
      path: "/dashboard/admin/resources",
      icon: EMOJI_ICONS.layers,
      children: []
    },
    {
      label: "Subscription",
      path: "/dashboard/admin/subscriptions",
      icon: EMOJI_ICONS.subscriptions,
      children: []
    },
    {
      label: "Colors",
      path: "/dashboard/admin/colors",
      icon: EMOJI_ICONS.colorLens,
      children: []
    },
    {
      label: "Settings",
      path: "/dashboard/admin/settings",
      icon: EMOJI_ICONS.settings,
      children: []
    }
  ];

  const ADMIN_NAV_EXAMPLE = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: EMOJI_ICONS.gridView
    },
    {
      label: "Blogs",
      path: "/dashboard/admin/blogs",
      icon: EMOJI_ICONS.rss,
      permission: PERMISSIONS.BLOGS.VIEW
    },
    {
      label: "Orders",
      path: "/dashboard/admin/orders",
      icon: EMOJI_ICONS.shoppingCart,
      permission: PERMISSIONS.ORDERS.VIEW
    },
    {
      label: "Finance",
      path: "/dashboard/admin/payments",
      icon: EMOJI_ICONS.creditCard,
      permission: PERMISSIONS.FINANCE.VIEW
    },
    {
      label: "Users",
      path: "/dashboard/admin/users",
      icon: EMOJI_ICONS.people,
      permission: PERMISSIONS.USERS.VIEW
    },
    {
      label: "Support",
      path: "/dashboard/admin/support",
      icon: EMOJI_ICONS.supportAgent,
      permission: PERMISSIONS.SUPPORT.VIEW
    },
    {
      label: "Settings",
      path: "/dashboard/admin/settings",
      icon: EMOJI_ICONS.settings,
      permission: PERMISSIONS.SETTINGS.MANAGE
    }
  ];

  const expertNav = [
    {
      label: "Dashboard",
      path: "/dashboard/expert/overview",
      icon: EMOJI_ICONS.gridView,
      children: []
    },
    {
      label: "Orders",
      path: "/dashboard/expert/orders",
      icon: EMOJI_ICONS.shoppingCart,
      children: []
    },
    {
      label: "Earnings",
      path: "/dashboard/expert/earnings",
      icon: EMOJI_ICONS.assessment,
      children: []
    },
    {
      label: "Notifications",
      path: "/dashboard/expert/notifications",
      icon: EMOJI_ICONS.notifications,
      children: []
    },
    {
      label: "Support",
      path: "/dashboard/expert/support",
      icon: EMOJI_ICONS.supportAgent,
      children: []
    },
    {
      label: "Settings",
      path: "/dashboard/expert/settings",
      icon: EMOJI_ICONS.settings,
      children: []
    }
  ];

  const userNav = [
    {
      label: "Dashboard",
      path: "/dashboard/user/overview",
      icon: EMOJI_ICONS.gridView,
      children: []
    },
    {
      label: "Orders",
      path: "/dashboard/user/orders",
      icon: EMOJI_ICONS.shoppingCart,
      children: []
    },
    {
      label: "Payments",
      path: "/dashboard/user/payments",
      icon: EMOJI_ICONS.creditCard,
      children: []
    },
    {
      label: "AI",
      path: "/dashboard/user/artificial-intelligence",
      icon: EMOJI_ICONS.tips,
      children: []
    },
    {
      label: "Consultations",
      path: "/dashboard/user/consultations",
      icon: EMOJI_ICONS.helpCenter,
      children: []
    },
    {
      label: "Notifications",
      path: "/dashboard/user/notifications",
      icon: EMOJI_ICONS.notifications,
      children: []
    },
    {
      label: "Support",
      path: "/dashboard/user/support",
      icon: EMOJI_ICONS.supportAgent,
      children: []
    },
    {
      label: "Subscriptions",
      path: "/dashboard/user/subscriptions",
      icon: EMOJI_ICONS.subscriptions,
      children: []
    },
    {
      label: "Settings",
      path: "/dashboard/user/settings",
      icon: EMOJI_ICONS.settings,
      children: []
    }
  ];

  // Return navigation based on role
  if (role === "1") return adminNav;
  if (role === "4") return expertNav;
  if (role === "3") return userNav;

  return [];
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
      borderRadius: "10px"
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
