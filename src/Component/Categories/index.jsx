import React, { useState } from "react";
import { Stack, Box, Typography, Button, Paper, IconButton, Container } from "@mui/material";
import { ChevronLeft24Regular, ChevronRight24Regular, ArrowRight24Regular } from "@fluentui/react-icons";

export default function CategoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { title: "GRAPHIC DESIGN", subtitle: "Logo Design", image: "/Images/Img_4.jpg" },
    { title: "VIDEO EDITING", subtitle: "Video Content Production", image: "/Images/Img_5.jpg" },
    { title: "MARKETING", subtitle: "Digital Marketing", image: "/images/marketing.jpg" },
    { title: "ANIMATION", subtitle: "3D Design", image: "/images/animation.jpg" },
    { title: "WEB DEVELOPMENT", subtitle: "Full Stack Development", image: "/images/web-development.jpg" },
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % categories.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        sx={{
          width: "100%",
          py: 12,
          px: 3,
          borderRadius: 5,
          background: "linear-gradient(135deg, #312e81, #4338ca, #312e81)",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={5}>
            <Box>
              <Typography variant="h3" color="common.white" fontWeight="bold" mb={1}>
                Categories
              </Typography>
              <Typography variant="body1" color="grey.300" maxWidth="500px">
                Pretium lectus ultrices sit tempor, sit ullamcorper volutpat et et. Auctor turpis semper id sit
              </Typography>
            </Box>
            <Button
              variant="outlined"
              sx={{
                color: "common.white",
                borderColor: "common.white",
                "&:hover": { backgroundColor: "common.white", color: "primary.dark" },
              }}
              endIcon={<ArrowRight24Regular />}
            >
              View All Categories
            </Button>
          </Stack>

          {/* Slider */}
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                transform: `translateX(-${currentIndex * 25}%)`,
                transition: "transform 0.5s ease-in-out",
                width: `${categories.length * 25}%`,
              }}
            >
              {categories.map((category, index) => (
                <Box key={index} sx={{ minWidth: "25%" }}>
                  <Paper
                    sx={{
                      position: "relative",
                      height: 256,
                      borderRadius: 3,
                      overflow: "hidden",
                      border: "4px solid #6366f1",
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    elevation={3}
                  >
                    {/* Dark overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    />
                    {/* Content */}
                    <Box sx={{ position: "relative", zIndex: 10, p: 2 }}>
                      <Typography variant="caption" fontWeight="bold" color="common.white" mb={0.5} letterSpacing={1}>
                        {category.title}
                      </Typography>
                      <Typography variant="body2" color="common.white">
                        {category.subtitle}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </Stack>

            {/* Navigation Buttons */}
            <IconButton
              onClick={prevSlide}
              sx={{
                position: "absolute",
                left: -16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "common.white",
                "&:hover": { bgcolor: "grey.100" },
              }}
              aria-label="Previous"
            >
              <ChevronLeft24Regular style={{ color: "#312e81" }} />
            </IconButton>

            <IconButton
              onClick={nextSlide}
              sx={{
                position: "absolute",
                right: -16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "common.white",
                "&:hover": { bgcolor: "grey.100" },
              }}
              aria-label="Next"
            >
              <ChevronRight24Regular style={{ color: "#312e81" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
