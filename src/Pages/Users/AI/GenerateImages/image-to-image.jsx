// ImageToImageInput.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Send,
  CloudUpload,
  Close,
  Image as ImageIcon,
} from "@mui/icons-material";
import { useGenerateImageToImage } from "../../../../Hooks/Users/generate_images";
import { showToast } from "../../../../utils/toast";

const ImageToImageInput = ({ onGeneratingChange }) => {
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const generateImage = useGenerateImageToImage();

  /* notify parent whenever generating changes */
  useEffect(() => {
    onGeneratingChange?.(isGenerating);
  }, [isGenerating, onGeneratingChange]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        showToast.error("Please upload a valid image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        showToast.error("Image size should be less than 10MB");
        return;
      }

      setUploadedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!uploadedImage) {
      showToast.error("Please upload an image first");
      return;
    }

    if (!prompt.trim()) {
      showToast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append("image", uploadedImage);
      formData.append("prompt", prompt);

      console.log("PayLoad:", { image: uploadedImage.name, prompt });

      const response = await generateImage(formData);
      if (response) {
        setPrompt("");
        setUploadedImage(null);
        setImagePreview(null);
        showToast.success("Image generated successfully!");
      }
    } catch (error) {
      showToast.error(error || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box sx={{ mx: "auto" }}>
      <Grid container spacing={3}>
        <Grid item size={{ xs: 12, md: 12 }}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 2, height: "100%" }}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.secondary"
                mb={2}
              >
                Upload Reference Image
              </Typography>

              {!imagePreview ? (
                <Box
                  sx={{
                    border: "2px dashed #e0e0e0",
                    borderRadius: 2,
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.50",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    p: 2,
                    "&:hover": {
                      borderColor: "primary.main",
                      bgcolor: "primary.50",
                    },
                  }}
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "primary.50",
                      borderRadius: "50%",
                      mb: 2,
                    }}
                  >
                    <CloudUpload sx={{ fontSize: 48, color: "primary.main" }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    Upload Image
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mb={2}
                  >
                    Click to browse or drag and drop your image here
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supports: JPG, PNG, WEBP (Max 10MB)
                  </Typography>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Uploaded preview"
                    sx={{
                      width: "100%",
                      minHeight: 200,
                      maxHeight: 200,
                      objectFit: "contain",
                      borderRadius: 2,
                      bgcolor: "grey.100",
                    }}
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      "&:hover": {
                        bgcolor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                  >
                    <Close />
                  </IconButton>

                  {/* Image Info */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(10px)",
                      p: 2,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <ImageIcon sx={{ color: "white", fontSize: 20 }} />
                      <Typography
                        variant="body2"
                        color="white"
                        fontWeight={500}
                      >
                        {uploadedImage?.name}
                      </Typography>
                      <Typography variant="caption" color="grey.300">
                        ({(uploadedImage?.size / 1024 / 1024).toFixed(2)} MB)
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={{ xs: 12, md: 12 }}>
          <Card
            elevation={0}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 2, height: "100%" }}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="text.secondary"
                mb={2}
              >
                Transformation Prompt
              </Typography>

              <Box sx={{ position: "relative", height: "calc(100% - 40px)" }}>
                <TextField
                  fullWidth
                  multiline
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe how you want to transform the image... e.g., 'Make it look like a watercolor painting' or 'Convert to anime style'"
                  sx={{
                    height: "100%",
                    "& .MuiOutlinedInput-root": {
                      height: "100%",
                      borderRadius: 2,
                      alignItems: "flex-start",
                      pb: 8,
                    },
                    "& textarea": {
                      height: "100% !important",
                      overflow: "auto !important",
                    },
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={
                      isGenerating ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <Send />
                      )
                    }
                    onClick={handleGenerate}
                    disabled={!uploadedImage || !prompt.trim() || isGenerating}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      borderRadius: 1,
                      fontWeight: 600,
                    }}
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageToImageInput;
