import React from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    useTheme,
} from "@mui/material";
import { ArrowRight24Regular } from "@fluentui/react-icons";
import { FONT_FAMILY } from "../../Config/font";

export default function LetsWorkTogether() {
    const theme = useTheme();

    const handleGetInTouch = () => {
        // Add your navigation logic here
        console.log("Navigate to contact page");
    };

    return (
        <Box
            sx={{
                minHeight:{ xs: "none", md:"100vh"},
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme.palette.background.default,
                position: "relative",
                overflow: "hidden",
                pb: { xs: 6, md: 0 },
            }}
        >
            <Container maxWidth="xl">
                <Box
                    data-aos='fade-up'
                    sx={{
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    {/* Main Heading */}
                    <Typography
                        sx={{
                            fontSize: { xs: "3rem", sm: "5rem", md: "7rem", lg: "11rem" },
                            fontWeight: 900,
                            lineHeight: 1,
                            fontFamily: FONT_FAMILY.unique,
                            color: theme.palette.text.heading,
                            textTransform: "uppercase",
                            letterSpacing: "-0.02em",
                            mb: { xs: 3, md: 0 },
                            position: "relative",
                            display: "inline-block",
                            width: "100%",
                        }}
                    >
                        LET'S WORK
                        <br />
                        <Box
                            component="span"
                            sx={{
                                position: "relative",
                                display: "inline-block",
                                fontFamily: FONT_FAMILY.unique,
                            }}
                        >
                            TOGE
                            {/* Green Circle Button */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 10,
                                    mt: { xs: -2, md: -3 },
                                    ml: { xs: 2, md: 4 },
                                }}
                            >
                                <Button
                                    onClick={handleGetInTouch}
                                    sx={{
                                        width: { xs: "100px", sm: "120px", md: "150px", lg: "180px" },
                                        height: { xs: "100px", sm: "120px", md: "150px", lg: "180px" },
                                        borderRadius: "50%",
                                        background: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem", lg: "1.1rem" },
                                        fontWeight: 500,
                                        fontFamily: FONT_FAMILY.unique,
                                        textTransform: "none",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 0.5,
                                        boxShadow: `0 12px 40px ${theme.palette.primary.main}88`,
                                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            background: theme.palette.primary.dark,
                                            transform: "scale(1.1) rotate(5deg)",
                                            boxShadow: `0 16px 50px ${theme.palette.primary.main}aa`,
                                        },
                                        "&:active": {
                                            transform: "scale(1.05) rotate(3deg)",
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            gap: 0.5,
                                        }}
                                    >
                                        <span>Get In Touch</span>
                                        <ArrowRight24Regular
                                            style={{
                                                transform: "rotate(-45deg)",
                                            }}
                                        />
                                    </Box>
                                </Button>
                            </Box>
                            THER
                        </Box>
                    </Typography>
                </Box>
            </Container>

            {/* Decorative Background Elements */}
            <Box
                sx={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    width: { xs: "150px", md: "250px" },
                    height: { xs: "150px", md: "250px" },
                    borderRadius: "50%",
                    background: `${theme.palette.success.main}15`,
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "20%",
                    right: "10%",
                    width: { xs: "200px", md: "300px" },
                    height: { xs: "200px", md: "300px" },
                    borderRadius: "50%",
                    background: `${theme.palette.primary.main}15`,
                    filter: "blur(80px)",
                    pointerEvents: "none",
                }}
            />
        </Box>
    );
}