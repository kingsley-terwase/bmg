import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Fade,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Search20Filled } from "@fluentui/react-icons";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@mui/material/styles";

export const HeroSection = () => {

  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [slide, setSlide] = useState(0);

  const services = ["Web Design", "Logo Design", "Video Editing", "Marketing"];

  const sliderContent = [
    {
      title1: "Perfect Service",
      title2: "for your Business.",
      image: "/hero/img_1.png",
    },
    {
      title1: "Grow Your Brand",
      title2: "with Confidence.",
      image: "/hero/img_2.png",
    },
    {
      title1: "Smart Solutions",
      title2: "Modern Teams.",
      image: "/hero/img_3.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setSlide((prev) => (prev + 1) % sliderContent.length),
      8000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.8)"
              : "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(2px)",
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          minHeight: { md: "600px" },
          position: "relative",
          mx: "auto",
          width: "90%",
          maxWidth: "1200px",
          zIndex: 1,
          gap: "2rem",
        }}
      >
        <Box>
          <Fade in key={slide} timeout={700}>
            <Box sx={{ mt: 12, mb: 3 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3rem", lg: "4rem" },
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.2,
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
                    transition: "0.3s",
                  }}
                />
              </IconButton>
            ))}
          </Box>

          {/* REVIEW CARD */}
          <Box
            sx={{
              p: 3,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              mb: 4,
            }}
          >
            <Typography
              sx={{
                fontStyle: "italic",
                color: theme.palette.text.secondary,
                mb: 2,
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              "Viverra viverra nibh enim et aliquam, enim. Tempor, sit mus
              viverra orci dui consequat turpis scelerisque faucibus."
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src="/Images/Img_5.jpg"
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: theme.palette.primary.main,
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Rwanda Melflor
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: theme.palette.text.secondary,
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
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[600]
                          : theme.palette.text.secondary,
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
                        backgroundColor: theme.palette.warning.dark,
                      },
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 2,

              "& .MuiOutlinedInput-root": {
                p: 0,
                backgroundColor: theme.palette.common.white,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                "& fieldset": {
                  border: "none",
                },
              },

              /* ✅ INPUT TEXT */
              "& .MuiInputBase-input": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[900]
                    : theme.palette.text.primary,
                padding: "14px 12px",
              },

              /* ✅ PLACEHOLDER — THIS IS THE MAIN FIX */
              "& .MuiInputBase-input::placeholder": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[600]
                    : theme.palette.text.secondary,
                opacity: 1, // REQUIRED
              },
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
                    backgroundColor: theme.palette.background.default,
                  },
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
              flexWrap: "wrap",
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                color: theme.palette.text.small,
                fontSize: "0.9rem",
              }}
            >
              Rated 5/5 based on Customer Reviews
            </Typography>

            <Typography
              sx={{
                color: theme.palette.text.small,
                fontSize: "0.85rem",
              }}
            >
              Trusted by 25,000+ Brands
            </Typography>
          </Box>
        </Box>

        <Fade in key={slide} timeout={700}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                transform: "translateY(40px)",
                // backgroundImage: `url(${sliderContent[slide].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                clipPath:
                  "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
                // filter: "blur(20px)",
                // opacity: 0.35,
                zIndex: 0,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(5px)",
              }}
            />

            <Box
              component="img"
              src={sliderContent[slide].image}
              alt="Business Services"
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                clipPath:
                  "polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%)",
                zIndex: 1,
              }}
            />
          </Box>
        </Fade>
      </Box>
    </Box>
  );
};
