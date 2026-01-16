import { EMOJI_ICONS } from "../../../Config/emojiIcons";

export const USER_NAV = [
  {
    label: "Dashboard",
    path: "/dashboard/user/overview",
    icon: EMOJI_ICONS.gridView,
    children: [],
  },
  {
    label: "Orders",
    path: "/dashboard/user/orders",
    icon: EMOJI_ICONS.shoppingCart,
    children: [],
  },
  {
    label: "Payments",
    path: "/dashboard/user/payments",
    icon: EMOJI_ICONS.creditCard,
    children: [],
  },
  {
    label: "AI",
    icon: EMOJI_ICONS.tips,
    children: [
      {
        label: "Overview",
        path: "/dashboard/user/artificial-intelligence",
        icon: EMOJI_ICONS.overview,
      },
      {
        label: "Generate Images",
        path: "/dashboard/user/generate-images",
        icon: EMOJI_ICONS.generatedImages,
      },
      {
        label: "Generate Videos",
        path: "/dashboard/user/generate-videos",
        icon: EMOJI_ICONS.generateVideo,
      },
      {
        label: "Build Website",
        path: "/dashboard/user/generate-website",
        icon: EMOJI_ICONS.generatedWebsites,
      },
      {
        label: "Generate Audio",
        path: "/dashboard/user/generate-audio",
        icon: EMOJI_ICONS.generatedSpeeches,
      },
      {
        label: "Generate Strategy",
        path: "/dashboard/user/generate-strategy",
        icon: EMOJI_ICONS.generateBusinessStrategy,
      },
    ],
  },
  {
    label: "Consultations",
    path: "/dashboard/user/consultations",
    icon: EMOJI_ICONS.helpCenter,
    children: [],
  },
  {
    label: "Notifications",
    path: "/dashboard/user/notifications",
    icon: EMOJI_ICONS.notifications,
    children: [],
  },
  {
    label: "Support",
    path: "/dashboard/user/support",
    icon: EMOJI_ICONS.supportAgent,
    children: [],
  },
  {
    label: "Subscriptions",
    path: "/dashboard/user/subscriptions",
    icon: EMOJI_ICONS.subscriptions,
    children: [],
  },
  {
    label: "Settings",
    path: "/dashboard/user/settings",
    icon: EMOJI_ICONS.settings,
    children: [],
  },
];
