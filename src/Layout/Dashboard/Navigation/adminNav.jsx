import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { PERMISSIONS } from "../../../Config/auth/permissions";
import { FactoryRounded } from "@mui/icons-material";

export const ADMIN_NAV = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: EMOJI_ICONS.gridView,
    children: []
  },
  {
    label: "Administrators",
    path: "#",
    icon: EMOJI_ICONS.adminPanel,
    children: [
      { label: "Add Admin", path: "/dashboard/add/admin" },
      { label: "View Admins", path: "/dashboard/view/admins" }
    ]
  },
  {
    label: "Manage Roles and Permissions",
    path: "/dashboard/view/admin-roles",
    icon: EMOJI_ICONS.permissions,
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
      {
        label: "Add Category",
        path: "/dashboard/admin/add/categories",
        permission: PERMISSIONS.CATEGORIES.CREATE
      },
      {
        label: "View Categories",
        path: "/dashboard/admin/categories",
        permission: PERMISSIONS.CATEGORIES.MANAGE
      }
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
    label: "Payment Methods",
    path: "/dashboard/admin/payment-methods",
    icon: EMOJI_ICONS.paymethods,
    children: []
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
