import { EMOJI_ICONS } from "../../../Config/emojiIcons";
import { PERMISSIONS } from "../../../Config/auth/permissions";
import { FactoryRounded } from "@mui/icons-material";

export const ADMIN_NAV = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: EMOJI_ICONS.gridView,
    children: [],
  },
  {
    label: "Administrators",
    path: "#",
    icon: EMOJI_ICONS.adminPanel,
    children: [
      { label: "Add Admin", path: "/dashboard/add/admin" },
      { label: "View Admins", path: "/dashboard/view/admins" },
    ],
  },
  {
    label: "Manage Roles and Permissions",
    path: "/dashboard/view/admin-roles",
    icon: EMOJI_ICONS.permissions,
    children: [],
  },
  {
    label: "Manage Users",
    path: "/dashboard/admin/customers",
    icon: EMOJI_ICONS.people,
    children: [],
  },
  {
    label: "Manage Experts",
    path: "#",
    icon: EMOJI_ICONS.handyman,
    children: [
      { label: "Add Expert", path: "/dashboard/admin/add/experts" },
      { label: "View Expert", path: "/dashboard/admin/experts" },
    ],
  },
  {
    label: "Categories",
    path: "#",
    icon: EMOJI_ICONS.category,
    children: [
      {
        label: "Add Category",
        path: "/dashboard/admin/add/categories",
        permission: PERMISSIONS.CATEGORIES.CREATE,
      },
      {
        label: "View Categories",
        path: "/dashboard/admin/categories",
        permission: PERMISSIONS.CATEGORIES.MANAGE,
      },
    ],
  },
  {
    label: "Sub Categories",
    path: "#",
    icon: EMOJI_ICONS.accountTree,
    children: [
      {
        label: "Add Sub Category",
        path: "/dashboard/admin/add/sub-categories",
      },
      {
        label: "View Sub Categories",
        path: "/dashboard/admin/sub-categories",
      },
    ],
  },
  {
    label: "Category FAQs",
    path: "/dashboard/admin/category-faqs",
    icon: EMOJI_ICONS.faqs,
    children: [],
  },
  {
    label: "Services",
    path: "#",
    icon: EMOJI_ICONS.shoppingBasket,
    children: [
      { label: "Add Service", path: "/dashboard/admin/add/services" },
      { label: "View Services", path: "/dashboard/admin/services" },
    ],
  },
  {
    label: "Service Types",
    path: "/dashboard/admin/service-types",
    icon: EMOJI_ICONS.types,
    children: [],
  },
  {
    label: "Services FAQs",
    path: "/dashboard/admin/services-faqs",
    icon: EMOJI_ICONS.faqs,
    children: [],
  },
  {
    label: "Payment Methods",
    path: "/dashboard/manage/payment-methods",
    icon: EMOJI_ICONS.paymethods,
    children: [],
  },
  {
    label: "Orders",
    path: "/dashboard/admin/orders",
    icon: EMOJI_ICONS.shoppingCart,
    children: [],
  },
  {
    label: "Payments",
    path: "/dashboard/admin/payments",
    icon: EMOJI_ICONS.creditCard,
    children: [],
  },
  {
    label: " FAQs",
    path: "/dashboard/admin/faqs",
    icon: EMOJI_ICONS.faq,
    children: [],
  },
  {
    label: " User Credits",
    path: "/dashboard/admin/user-credits",
    icon: EMOJI_ICONS.credits,
    children: [],
  },
  {
    label: "AI",
    path: "/dashboard/admin/artificial-intelligence",
    icon: EMOJI_ICONS.tips,
    children: [],
  },
  {
    label: "Portfolio",
    path: "/dashboard/admin/portfolios",
    icon: EMOJI_ICONS.work,
    children: [],
  },
  {
    label: "Manage Blogs",
    path: "/dashboard/admin/blogs",
    icon: EMOJI_ICONS.rss,
    children: [],
  },
  {
    label: "Blog Category",
    path: "/dashboard/admin/blog-categories",
    icon: EMOJI_ICONS.section,
    children: [],
  },
  {
    label: "Gifts",
    path: "/dashboard/admin/gifts",
    icon: EMOJI_ICONS.cardGift,
    children: [],
  },
  {
    label: "Coupons",
    path: "/dashboard/admin/coupons",
    icon: EMOJI_ICONS.localActivity,
    children: [],
  },
  {
    label: "Vouchers",
    path: "/dashboard/admin/vouchers",
    icon: EMOJI_ICONS.category,
    children: [],
  },
  {
    label: "Consultations",
    path: "/dashboard/admin/consultations",
    icon: EMOJI_ICONS.helpCenter,
    children: [],
  },
  {
    label: "Campaigns",
    path: "/dashboard/admin/campaigns",
    icon: EMOJI_ICONS.campaign,
    children: [],
  },
  {
    label: "Testimonials",
    path: "/dashboard/admin/testimonials",
    icon: EMOJI_ICONS.contactPage,
    children: [],
  },
  {
    label: "Notifications",
    path: "/dashboard/admin/notifications",
    icon: EMOJI_ICONS.notifications,
    children: [],
  },
  {
    label: "Mails",
    path: "/dashboard/admin/mails",
    icon: EMOJI_ICONS.mail,
    children: [],
  },
  {
    label: "Support",
    path: "/dashboard/admin/support",
    icon: EMOJI_ICONS.supportAgent,
    children: [],
  },
  {
    label: "Ebooks",
    path: "/dashboard/admin/ebooks",
    icon: EMOJI_ICONS.layers,
    children: [],
  },
  {
    label: "Subscription",
    path: "/dashboard/admin/subscriptions",
    icon: EMOJI_ICONS.subscriptions,
    children: [],
  },
  {
    label: "Currencies",
    path: "/dashboard/admin/currencies",
    icon: EMOJI_ICONS.currency,
    children: [],
  },
  {
    label: "Settings",
    path: "/dashboard/admin/settings",
    icon: EMOJI_ICONS.settings,
    children: [],
  },
];
