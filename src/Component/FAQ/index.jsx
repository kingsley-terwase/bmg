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
import BrandLoader from "../BrandLoader";

const iconSizes = {
    xl: 24,
    "2xl": 30,
    "4xl": 40,
};

const FAQSection = ({ data, loading, label = "" }) => {
    const [openIndex, setOpenIndex] = useState(0);
    const theme = useTheme();

    // Filter only active FAQs (status === 1) and sort by creation date (newest first)
    const activeFaqs = data || [];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        loading ? <BrandLoader /> :
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
                                Everything you need to know about {label ? label : "BMG AI Service"}. Can't find the answer?
                                <a href="/contact-us" target="_blank">
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
                                </a>
                            </Typography>
                        </Box>

                        <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} gap={4}>
                            <Box flex={1}>
                                {activeFaqs.length === 0 ? (
                                    <Box textAlign="center" py={8}>
                                        <Typography
                                            variant="h6"
                                            color={theme.palette.text.secondary}
                                        >
                                            No FAQs available at the moment.
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Stack spacing={2}>
                                        {activeFaqs.map((faq, index) => (
                                            <Paper
                                                key={faq.id}
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
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
    );
};

export default FAQSection;