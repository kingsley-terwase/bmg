export const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9",
    period: "/month",
    description: "Perfect for individuals getting started",
    features: [
      "5 Projects",
      "10GB Storage",
      "Basic Support",
      "1 Team Member",
      "Basic Analytics"
    ],
    color: "#3B82F6",
    popular: false
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Best for growing teams and businesses",
    features: [
      "Unlimited Projects",
      "100GB Storage",
      "Priority Support",
      "10 Team Members",
      "Advanced Analytics",
      "Custom Branding",
      "API Access"
    ],
    color: "#8B5CF6",
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited Everything",
      "1TB Storage",
      "24/7 Premium Support",
      "Unlimited Team Members",
      "Advanced Security",
      "Custom Integration",
      "Dedicated Manager",
      "SLA Guarantee"
    ],
    color: "#10B981",
    popular: false
  }
];

export const billingHistory = [
  {
    date: "Nov 1, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "#INV-001"
  },
  {
    date: "Oct 1, 2024",
    amount: "$29.00",
    status: "Paid",
    invoice: "#INV-002"
  },
  { date: "Sep 1, 2024", amount: "$29.00", status: "Paid", invoice: "#INV-003" }
];

export const usageStats = [
  { label: "Projects", used: 7, total: 10, percentage: 70 },
  { label: "Storage", used: 65, total: 100, percentage: 65, unit: "GB" },
  { label: "Team Members", used: 6, total: 10, percentage: 60 }
];
