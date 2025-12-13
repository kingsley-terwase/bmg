import React from "react";
import { Chat, Email, Phone, WhatsApp } from "@mui/icons-material";

export const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to Settings > Security > Change Password. You'll receive an email with instructions to reset your password.",
    category: "Account"
  },
  {
    question: "How do I upgrade my subscription?",
    answer:
      "Navigate to Subscriptions page and click on 'Upgrade Plan'. Choose your desired plan and complete the payment process.",
    category: "Billing"
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and cryptocurrency payments including Bitcoin and Ethereum.",
    category: "Billing"
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Go to Subscriptions > Manage Plan > Cancel Subscription. Your access will continue until the end of your billing period.",
    category: "Billing"
  },
  {
    question: "How long does it take to get a response?",
    answer:
      "We typically respond within 24 hours during business days. Premium users get priority support with responses within 4 hours.",
    category: "Support"
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes, we offer a 30-day money-back guarantee. Contact support with your order details to process your refund.",
    category: "Billing"
  }
];

export const supportTickets = [
  {
    id: 1,
    subject: "Payment Issue",
    status: "Open",
    date: "2 hours ago",
    messages: 3,
    priority: "High"
  },
  {
    id: 2,
    subject: "Feature Request",
    status: "In Progress",
    date: "1 day ago",
    messages: 5,
    priority: "Medium"
  },
  {
    id: 3,
    subject: "Account Settings",
    status: "Resolved",
    date: "3 days ago",
    messages: 8,
    priority: "Low"
  }
];

export const contactMethods = [
  {
    icon: <Email />,
    label: "Email",
    value: "support@example.com",
    color: "#4285F4"
  },
  {
    icon: <Phone />,
    label: "Phone",
    value: "+1 (555) 123-4567",
    color: "#34A853"
  },
  {
    icon: <WhatsApp />,
    label: "WhatsApp",
    value: "+1 (555) 987-6543",
    color: "#25D366"
  },
  {
    icon: <Chat />,
    label: "Live Chat",
    value: "Start Chat",
    color: "#8B5CF6"
  }
];
