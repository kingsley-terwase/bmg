// TextToImageInput.jsx
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
  Chip,
} from "@mui/material";
import { Send, AutoAwesome } from "@mui/icons-material";
import { useGenerateImage } from "../../../../Hooks/Users/generate_images";
import { showToast } from "../../../../utils/toast";

const PROMPT_SUGGESTIONS = [
  "A serene mountain landscape at sunset",
  "Futuristic city with flying cars",
  "Portrait of a cyberpunk warrior",
  "Underwater coral reef ecosystem",
  "Abstract digital art with neon colors",
  "Vintage car in autumn forest",
  "Magical fantasy castle in clouds",
];

const TextToImageInput = ({ onGeneratingChange, onImageGenerated }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const generateImage = useGenerateImage();

  /* notify parent whenever generating changes */
  useEffect(() => {
    onGeneratingChange?.(isGenerating);
  }, [isGenerating, onGeneratingChange]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      const payload = {
        prompt,
      };
      console.log("PayLoad:", payload);

      const response = await generateImage(payload);
      if (response) {
        // Notify parent component about the new image
        onImageGenerated?.(response);
        setPrompt("");
        showToast.success("Image generated successfully!");
      }
    } catch (error) {
      showToast.error(error || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  return (
    <Box sx={{ mx: "auto", mb: 6 }}>
      <Card elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ position: "relative" }}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your ideas and images for reference"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  pr: 2,
                  pb: 7,
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
                disabled={!prompt.trim() || isGenerating}
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

      {/* Prompt Suggestions - Outside the main card */}
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          <AutoAwesome sx={{ fontSize: 18, color: "primary.main" }} />
          <Typography variant="caption" fontWeight={600} color="text.secondary">
            Suggested Prompts
          </Typography>
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={1}>
          {PROMPT_SUGGESTIONS.map((suggestion, index) => (
            <Chip
              key={index}
              label={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              size="small"
              sx={{
                cursor: "pointer",
                border: "1px solid",
                borderColor: "primary.light",
                bgcolor: "background.paper",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                  borderColor: "primary.main",
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                },
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default TextToImageInput;
