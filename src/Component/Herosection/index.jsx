import React, { useState, useEffect } from "react";
import {
    Button,
    Container,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Avatar,
    IconButton,
    Fade
} from "@mui/material";
import { Close, ArrowForward } from "@mui/icons-material";
import { Search20Filled } from "@fluentui/react-icons";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
    const navigate = useNavigate();

    const handleExplore = () => {
        navigate("/login");
    };

    const theme = useTheme();
    const [searchValue, setSearchValue] = useState("");
    const [slide, setSlide] = useState(0);

    const services = ["Web Design", "Logo Design", "Video Editing", "Marketing"];

    const sliderContent = [
        { title1: "Perfect Service", title2: "for your Business." },
        { title1: "Grow Your Brand", title2: "with Confidence." },
        { title1: "Smart Solutions", title2: "Modern Teams." }
    ];

    useEffect(() => {
        const interval = setInterval(
            () => setSlide((prev) => (prev + 1) % sliderContent.length),
            8000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: theme.palette.mode === 'dark'
                        ? 'rgba(0, 0, 0, 0.8)'
                        : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(2px)',
                    zIndex: 0
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    minHeight: { md: "600px" },
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <Box sx={{ flex: { md: "0 0 55%" }, width: "100%" }}>
                    <Container
                        maxWidth="lg"
                        sx={{
                            pl: { xs: 2, md: 4, lg: 16 },
                            pr: { xs: 2, md: 6, lg: 10 }
                        }}
                    >
                        <Box sx={{ maxWidth: { md: "550px", lg: "600px" } }}>

                            <Fade in key={slide} timeout={700}>
                                <Box sx={{ mt: 12, mb: 3 }}>
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontSize: { xs: "2.5rem", md: "3rem", lg: "4rem" },
                                            fontWeight: 900,
                                            color: theme.palette.primary.dark,
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {sliderContent[slide].title1} <br />
                                        {sliderContent[slide].title2}
                                    </Typography>
                                </Box>
                            </Fade>

                            <Box sx={{ display: "flex", gap: 1, mb: 4 }}>
                                {sliderContent.map((_, index) => (
                                    <IconButton
                                        key={index}
                                        onClick={() => setSlide(index)}
                                        sx={{ p: 0.5 }}
                                    >
                                        <CircleIcon
                                            sx={{
                                                fontSize: 14,
                                                color:
                                                    index === slide
                                                        ? theme.palette.warning.dark
                                                        : theme.palette.warning.light,
                                                transition: "0.3s"
                                            }}
                                        />
                                    </IconButton>
                                ))}
                            </Box>

                            <Button
                                onClick={handleExplore}
                                variant="outlined"
                                endIcon={<ArrowForward />}
                                sx={{
                                    borderColor: theme.palette.warning.light,
                                    color: theme.palette.warning.light,
                                    fontSize: "1rem",
                                    px: 3,
                                    py: 1.5,
                                    borderRadius: 2,
                                    mb: 4,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    "&:hover": {
                                        borderColor: theme.palette.warning.main,
                                        backgroundColor: theme.palette.warning.light + "33"
                                    }
                                }}
                            >
                                Explore BMG
                            </Button>

                            {/* REVIEW CARD */}
                            <Box
                                sx={{
                                    p: 3,
                                    backgroundColor: theme.palette.background.paper,
                                    borderRadius: 3,
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                                    mb: 4
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontStyle: "italic",
                                        color: theme.palette.text.secondary,
                                        mb: 2,
                                        fontSize: "0.95rem",
                                        lineHeight: 1.6
                                    }}
                                >
                                    "Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus viverra orci dui
                                    consequat turpis scelerisque faucibus."
                                </Typography>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar
                                        src="/Images/Img_5.jpg"
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            bgcolor: theme.palette.primary.main
                                        }}
                                    />
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: theme.palette.text.primary
                                            }}
                                        >
                                            Rwanda Melflor
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontSize: "0.85rem",
                                                color: theme.palette.text.secondary
                                            }}
                                        >
                                            zerowaste.com
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* SEARCH BOX */}
                            <TextField
                                fullWidth
                                placeholder="Search for services"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search20Filled
                                                style={{
                                                    marginLeft: 18,
                                                    color: theme.palette.text.secondary
                                                }}
                                            />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: theme.palette.warning.light,
                                                    color: theme.palette.text.light,
                                                    px: 4,
                                                    py: 1.3,
                                                    borderRadius: 1,
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                    "&:hover": {
                                                        backgroundColor: theme.palette.warning.dark
                                                    }
                                                }}
                                            >
                                                Search
                                            </Button>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        p: 0,
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                                        "& fieldset": { border: "none" }
                                    }
                                }}
                            />

                            {/* TAGS */}
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                                {services.map((service) => (
                                    <Chip
                                        key={service}
                                        label={service}
                                        onDelete={() => { }}
                                        deleteIcon={<Close sx={{ fontSize: "1rem" }} />}
                                        sx={{
                                            backgroundColor: theme.palette.background.paper,
                                            border: `1px solid ${theme.palette.divider}`,
                                            fontWeight: 500,
                                            "&:hover": {
                                                backgroundColor: theme.palette.background.default
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* RATINGS */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    flexWrap: "wrap"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.text.primary,
                                        fontSize: "0.9rem"
                                    }}
                                >
                                    Rated 5/5 based on Customer Reviews
                                </Typography>

                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: "0.85rem"
                                    }}
                                >
                                    Trusted by 25,000+ Brands
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* RIGHT IMAGE */}
                <Box
                    sx={{
                        flex: { md: "0 0 60%" },
                        width: "100%",
                        position: "relative",
                        display: { xs: "none", md: "block" }
                    }}
                >
                    <Container maxWidth="xl">
                        <img
                            src="/Images/Img_1.jpg"
                            alt="Business Services"
                            style={{
                                width: "100%",
                                height: "750px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                objectPosition: "center"
                            }}
                        />
                    </Container>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: -30,
                            width: { md: "60%", lg: "55%" },
                            height: { md: "35%", lg: "40%" },
                            zIndex: 2
                        }}
                    >
                        <Box
                            component="img"
                            src="/Illus/shape.png"
                            alt="Decorative Shape"
                            sx={{ width: "100%", height: "100%" }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};