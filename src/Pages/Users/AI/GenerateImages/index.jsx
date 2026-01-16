// UserGenerateImages.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  IconButton,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  Stack,
  Chip,
  keyframes,
} from "@mui/material";
import {
  Image as ImageIcon,
  Delete,
  Download,
  Close,
  ArrowForward,
} from "@mui/icons-material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";
import { DashboardTab, CustomTab } from "../../../../Component";
import { imageTabs } from "../data";
import ImageToImageInput from "./image-to-image";
import TextToImageInput from "./text-to-image";
import { useFetchGeneratedImages } from "../../../../Hooks/Users/generate_images";
import { BASE_IMAGE_URL } from "../../../../Config/paths";

// Shimmer animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const slideRight = keyframes`
  0% {
    transform: translateX(-20px);
    opacity: 0.5;
  }
  50% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(20px);
    opacity: 0.5;
  }
`;

// Loading Component
const GeneratingAnimation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
        p: 4,
      }}
    >
      {/* Animated Icons */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Box
          sx={{
            animation: `${pulse} 1.5s ease-in-out infinite`,
            fontSize: 48,
          }}
        >
          🎨
        </Box>
        <ArrowForward
          sx={{
            fontSize: 40,
            color: "primary.main",
            animation: `${slideRight} 2s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            animation: `${pulse} 1.5s ease-in-out infinite 0.3s`,
            fontSize: 48,
          }}
        >
          🖼️
        </Box>
      </Stack>

      {/* Shimmer Box */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          height: 200,
          borderRadius: 3,
          background: `
            linear-gradient(
              90deg,
              #f0f0f0 0%,
              #e0e0e0 20%,
              #f0f0f0 40%,
              #e0e0e0 60%,
              #f0f0f0 80%,
              #e0e0e0 100%
            )
          `,
          backgroundSize: "1000px 100%",
          animation: `${shimmer} 2s linear infinite`,
          position: "relative",
          overflow: "hidden",
          border: "2px solid",
          borderColor: "primary.light",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                rgba(25, 118, 210, 0.2) 50%,
                transparent 100%
              )
            `,
            backgroundSize: "1000px 100%",
            animation: `${shimmer} 2s linear infinite`,
          },
        }}
      />

      {/* Loading Text */}
      <Stack spacing={1} alignItems="center" sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight={600} color="primary">
          Generating Your Image...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This may take a few moments. Please wait.
        </Typography>
      </Stack>

      {/* Progress Dots */}
      <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: `${pulse} 1s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

const UserGenerateImages = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);

  // Fetch generated images from API
  const { images, loading: imagesLoading, refetch } = useFetchGeneratedImages();

  // Update local state when images are fetched
  useEffect(() => {
    if (images && images.length > 0) {
      setGeneratedImages(images);
    }
  }, [images]);

  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  console.log(" Images from API hook:", images);
  console.log("generated Images rse:", generatedImages);

  // Handle new image generation - Add to the front of the array
  const handleImageGenerated = async (newImage) => {
    // Refetch all images to get the latest
    await refetch();

    // Or if the API returns the generated image, add it to the front
    if (newImage) {
      setGeneratedImages((prevImages) => [newImage, ...prevImages]);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        // Call your delete API here
        // await deleteGeneratedImage(imageId);

        // Remove from local state
        setGeneratedImages((prevImages) =>
          prevImages.filter((img) => img.id !== imageId)
        );

        console.log("Delete image:", imageId);
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            borderBottom: "1px solid #e0e0e0",
            px: 4,
            py: 3,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            {EMOJI_ICONS.generatedImages}

            <Typography variant="h4" fontWeight={700}>
              Image Generator
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Imagine and let BMG AI bring it to life
          </Typography>
        </Box>

        <Grid container spacing={3} mt={5}>
          <Grid item size={{ xs: 12, md: 6, lg: 5 }}>
            <CustomTab
              tabs={imageTabs}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <TextToImageInput
                onGeneratingChange={setIsGenerating}
                onImageGenerated={handleImageGenerated}
              />
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <ImageToImageInput
                onGeneratingChange={setIsGenerating}
                onImageGenerated={handleImageGenerated}
              />
            </DashboardTab>
          </Grid>

          <Grid item size={{ xs: 12, md: 6, lg: 7 }}>
            <Box
              sx={{
                maxWidth: 1400,
                mx: "auto",
                p: 3,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                minHeight: 500,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                <ImageIcon color="action" />
                <Typography variant="h6" fontWeight={600}>
                  {isGenerating ? "Generating..." : "Library"}
                </Typography>
                {!isGenerating && generatedImages.length > 0 && (
                  <Chip
                    label={`${generatedImages.length} images`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>

              {/* Show loading animation when generating */}
              {isGenerating ? (
                <GeneratingAnimation />
              ) : imagesLoading ? (
                <Box sx={{ textAlign: "center", py: 8 }}>
                  <Typography variant="body1" color="text.secondary">
                    Loading your images...
                  </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {generatedImages.length > 0 ? (
                    generatedImages.map((image) => (
                      <Grid item size={{ xs: 12, md: 4 }} key={image.id}>
                        <Card
                          elevation={0}
                          onClick={() => handleImageClick(image)}
                          sx={{
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: 1,
                            border: "1px solid #e0e0e0",
                            transition: "all 0.3s",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: 6,
                              "& .image-overlay": {
                                opacity: 1,
                              },
                              "& .card-image": {
                                transform: "scale(1.1)",
                              },
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={`${BASE_IMAGE_URL}/${image.image}`}
                            alt={image.prompt}
                            className="card-image"
                            sx={{
                              aspectRatio: "1/1",
                              objectFit: "cover",
                              transition: "transform 0.3s",
                            }}
                          />

                          <Box
                            className="image-overlay"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)",
                              p: 2,
                              opacity: 0,
                              transition: "opacity 0.3s",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="white"
                              fontWeight={500}
                              sx={{
                                mb: 1,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {image.prompt}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <IconButton
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255,255,255,0.2)",
                                  color: "white",
                                  backdropFilter: "blur(10px)",
                                  "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.3)",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Implement download functionality
                                  const link = document.createElement("a");
                                  link.href = image.url || image.image_url;
                                  link.download = `generated-${image.id}.png`;
                                  link.click();
                                }}
                              >
                                <Download fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{
                                  bgcolor: "rgba(255,255,255,0.2)",
                                  color: "white",
                                  backdropFilter: "blur(10px)",
                                  "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.3)",
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteImage(image.id);
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Box>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          textAlign: "center",
                          py: 8,
                        }}
                      >
                        <Box sx={{ fontSize: 64, mb: 2 }}>🖼️</Box>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          gutterBottom
                        >
                          No images yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Start generating amazing images with AI
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Image Preview Modal */}
      <Dialog
        open={Boolean(selectedImage)}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
        sx={{
          "& .MuiBackdrop-root": {
            bgcolor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: "relative" }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: -50,
              right: 0,
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <Close />
          </IconButton>

          {selectedImage && (
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={`${BASE_IMAGE_URL}/${selectedImage.image}`}
                alt={selectedImage.prompt}
                sx={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  p: 3,
                  borderRadius: "0 0 8px 8px",
                }}
              >
                <Typography
                  variant="body1"
                  color="white"
                  fontWeight={500}
                  mb={2}
                >
                  {selectedImage.prompt}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = selectedImage.url || selectedImage.image_url;
                      link.download = `generated-${selectedImage.id}.png`;
                      link.click();
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Delete />}
                    color="error"
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      handleDeleteImage(selectedImage.id);
                      handleCloseModal();
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserGenerateImages;
