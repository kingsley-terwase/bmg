import React, { useState } from "react";
import {
    ChevronDown24Regular,
    Question24Regular,
} from "@fluentui/react-icons";

import {
    Box,
    Typography,
    Button,
    Paper,
    Collapse,
    Stack,
    Container,
    useTheme,
} from "@mui/material";


const iconSizes = {
    xl: 24,
    "2xl": 30,
    "4xl": 40,
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState("General");

    const theme = useTheme();

    const faqs = {
        General: [
            {
                question: "What is BMG AI Service and how does it work?",
                answer:
                    "BMG AI Service is a comprehensive suite of AI-powered tools designed to streamline your digital marketing and content creation...",
            },
            {
                question: "How quickly can I get started with BMG AI?",
                answer:
                    "Getting started is incredibly fast! After signing up, you can begin using our services immediately...",
            },
            {
                question: "What makes BMG different from other AI platforms?",
                answer:
                    "BMG stands out with its all-in-one approach, combining multiple AI services under one roof...",
            },
            {
                question: "Can I use BMG AI for commercial projects?",
                answer:
                    "Yes! All content generated through BMG AI comes with full commercial usage rights...",
            },
        ],

        Features: [
            {
                question: "What AI tools are included in the platform?",
                answer:
                    "Our platform includes AI Video Generator, AI Image Generator, AI Business Strategy Analyzer...",
            },
            {
                question: "Can I customize the AI-generated content?",
                answer:
                    "Absolutely! All generated content can be fully customized to match your brand...",
            },
            {
                question: "Do you offer API access for developers?",
                answer:
                    "Yes, we provide comprehensive API access for enterprise clients...",
            },
        ],

        Security: [
            {
                question: "How secure is my data on BMG AI?",
                answer:
                    "Security is our top priority. We use AES-256 encryption and TLS 1.3...",
            },
            {
                question: "Do you store my generated content?",
                answer:
                    "Your generated content is stored securely for 30 days and auto-deleted afterward...",
            },
            {
                question: "Is my payment information safe?",
                answer:
                    "We do not store payment information; Stripe/PayPal handle all transactions...",
            },
        ],

        Pricing: [
            {
                question: "What pricing plans do you offer?",
                answer:
                    "We offer Starter, Professional, and Enterprise plans...",
            },
            {
                question: "Can I cancel my subscription anytime?",
                answer:
                    "Yes! There are no cancellation fees...",
            },
            {
                question: "Do you offer refunds?",
                answer:
                    "We offer a 30-day money-back guarantee...",
            },
        ],

        Support: [
            {
                question: "How can I get help if I have issues?",
                answer:
                    "Our support team is available 24/7 via chat, email, and phone...",
            },
            {
                question: "Do you provide training or onboarding?",
                answer:
                    "Yes! We have onboarding, tutorials, and enterprise training...",
            },
            {
                question: "What's your average response time?",
                answer:
                    "Under 2 hours for all support inquiries...",
            },
        ],
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: theme.palette.background.default,
                py: 10,
                px: 3,
            }}
        >
            <Container data-aos='fade-up' maxWidth="lg">
                <Box maxWidth="1200px" mx="auto">
                    <Box textAlign="center" mb={8}>
                        <Box
                            display="inline-flex"
                            alignItems="center"
                            gap={1}
                            px={3}
                            py={1}
                            borderRadius="50px"
                            bgcolor={theme.palette.mode === 'dark' 
                                ? theme.palette.primary.main + '20' 
                                : '#E0E7FF'
                            }
                            color={theme.palette.mode === 'dark'
                                ? theme.palette.primary.main
                                : '#4338CA'
                            }
                            fontWeight="bold"
                            mb={2}
                        >
                            <Question24Regular fontSize={iconSizes.xl} />
                            FAQ
                        </Box>

                        <Typography 
                            variant="h2" 
                            fontWeight="900" 
                            mb={2}
                            color={theme.palette.text.heading}
                        >
                            Frequently Asked Questions
                        </Typography>

                        <Typography 
                            variant="h6" 
                            color={theme.palette.text.secondary} 
                            maxWidth="700px" 
                            mx="auto"
                        >
                            Everything you need to know about BMG AI Service. Can't find the answer?
                            <span 
                                style={{ 
                                    color: theme.palette.primary.main, 
                                    fontWeight: 600, 
                                    cursor: "pointer" 
                                }}
                            >
                                {" "}
                                Contact our support team.
                            </span>
                        </Typography>
                    </Box>

                    <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={4}>
                        <Box flex={1}>
                            <Stack spacing={2}>
                                {faqs[activeCategory].map((faq, index) => (
                                    <Paper
                                        key={index}
                                        elevation={theme.palette.mode === 'dark' ? 2 : 3}
                                        sx={{ 
                                            borderRadius: 3, 
                                            overflow: "hidden",
                                            border: `1px solid ${theme.palette.divider}`,
                                            backgroundColor: theme.palette.background.paper,
                                        }}
                                    >
                                        <Button
                                            onClick={() => toggleFAQ(index)}
                                            fullWidth
                                            sx={{
                                                textAlign: "left",
                                                justifyContent: "space-between",
                                                px: 3,
                                                py: 3,
                                                textTransform: "none",
                                                color: theme.palette.text.primary,
                                                fontWeight: "bold",
                                                backgroundColor: theme.palette.mode === 'dark'
                                                    ? 'rgba(144, 202, 249, 0.08)'
                                                    : 'rgba(8, 12, 150, 0.04)',
                                                '&:hover': {
                                                    backgroundColor: theme.palette.mode === 'dark'
                                                        ? 'rgba(144, 202, 249, 0.12)'
                                                        : 'rgba(8, 12, 150, 0.08)',
                                                }
                                            }}
                                            endIcon={
                                                <ChevronDown24Regular
                                                    fontSize={iconSizes["2xl"]}
                                                    style={{
                                                        transition: "0.3s",
                                                        transform: openIndex === index ? "rotate(180deg)" : "rotate(0)",
                                                        color: theme.palette.primary.main,
                                                    }}
                                                />
                                            }
                                        >
                                            {faq.question}
                                        </Button>

                                        <Collapse in={openIndex === index} timeout={300}>
                                            <Box
                                                px={3}
                                                pb={3}
                                                pt={2}
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderTop: `1px solid ${theme.palette.divider}`,
                                                    lineHeight: 1.8,
                                                    fontSize: '0.95rem'
                                                }}
                                            >
                                                {faq.answer}
                                            </Box>
                                        </Collapse>
                                    </Paper>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default FAQSection;