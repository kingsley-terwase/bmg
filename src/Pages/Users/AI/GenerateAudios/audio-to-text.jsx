import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  alpha,
} from "@mui/material";
import {
  Send,
  GraphicEq,
  VolumeUp,
  Speed,
  Person,
  AutoAwesome,
} from "@mui/icons-material";
import { CustomButton } from "../../../../Component";
import { showToast } from "../../../../utils/toast";
import { useGenerateAudioToText } from "../../../../Hooks/Users/generate_audio";

const AudioToTextInput = ({ onGeneratingChange, onTextGenerated }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isGenerating, setIsGenerating] = useState(false);

  const transcribeAudio = useGenerateAudioToText();

  const LANGUAGES = [
    { id: "en", name: "English" },
    { id: "es", name: "Spanish" },
    { id: "fr", name: "French" },
    { id: "de", name: "German" },
    { id: "it", name: "Italian" },
    { id: "pt", name: "Portuguese" },
    { id: "zh", name: "Chinese" },
    { id: "ja", name: "Japanese" },
  ];

  useEffect(() => {
    onGeneratingChange?.(isGenerating);
  }, [isGenerating, onGeneratingChange]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        showToast.error("Please upload a valid audio file");
        return;
      }

      if (file.size > 25 * 1024 * 1024) {
        showToast.error("Audio file should be less than 25MB");
        return;
      }

      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioPreview(url);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 = reader.result.split(",")[1]; // strip data:audio/*
        resolve(base64);
      };

      reader.onerror = reject;
    });
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
    if (audioPreview) {
      URL.revokeObjectURL(audioPreview);
      setAudioPreview(null);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!audioFile) {
      showToast.error("Please upload an audio file");
      return;
    }

    setIsGenerating(true);

    try {
      const base64Audio = await fileToBase64(audioFile);

      const payload = {
        input: base64Audio,
        language,
        model: "gpt-4o-mini-transcribe",
        response_format: "json",
        temperature: 0,
        stream: false,
        timestamp_granularities: ["segment"],
      };

      console.log("Audio-to-Text Payload:", payload);

      const response = await transcribeAudio(payload);

      if (response) {
        onTextGenerated?.(response);
        handleRemoveAudio();
        showToast.success("Audio transcribed successfully!");
      }
    } catch (error) {
      console.error(error);
      showToast.error(error?.message || "Failed to transcribe audio");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Box maxWidth={800} mx="auto" mb={4}>
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Header with gradient */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            p: 3,
            color: "white",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Box
              sx={{
                p: 1.5,
                bgcolor: "rgba(255,255,255,0.2)",
                borderRadius: 2,
                backdropFilter: "blur(10px)",
              }}
            >
              <VolumeUp sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Audio to Text Converter
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Transcribe your audio files into text
              </Typography>
            </Box>
          </Stack>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {/* Audio Upload */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Upload Audio File 🎵
            </Typography>

            {!audioPreview ? (
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: "error.light",
                  borderRadius: 2,
                  p: 5,
                  textAlign: "center",
                  bgcolor: alpha("#f5576c", 0.03),
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    borderColor: "error.main",
                    bgcolor: alpha("#f5576c", 0.08),
                  },
                }}
                onClick={() => document.getElementById("audio-upload").click()}
              >
                <GraphicEq
                  sx={{
                    fontSize: 56,
                    color: "error.main",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Drop audio file here or click to browse
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Supports MP3, WAV, M4A, FLAC (Max 25MB)
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  mt={2}
                >
                  <Chip
                    label="High Quality"
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                  <Chip
                    label="Fast Processing"
                    size="small"
                    color="error"
                    variant="outlined"
                  />
                </Stack>
                <input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 3,
                  bgcolor: alpha("#f5576c", 0.03),
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "error.light",
                      borderRadius: 2,
                    }}
                  >
                    <GraphicEq sx={{ fontSize: 32, color: "error.main" }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {audioFile?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(audioFile?.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </Box>
                  <CustomButton
                    title="Remove"
                    color="error"
                    variant="outlined"
                    onClick={handleRemoveAudio}
                    size="small"
                  />
                </Stack>

                {/* Audio Player */}
                <Box
                  component="audio"
                  controls
                  src={audioPreview}
                  sx={{
                    width: "100%",
                    height: 40,
                    borderRadius: 1,
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Language Selection */}
          <Box
            sx={{
              p: 3,
              bgcolor: alpha("#f5576c", 0.05),
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Transcription Settings 🌍
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Audio Language</InputLabel>
              <Select
                value={language}
                label="Audio Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                {LANGUAGES.map((lang) => (
                  <MenuItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Generate Button */}
          <CustomButton
            fullWidth
            title={isGenerating ? "Transcribing Audio..." : "Transcribe Audio"}
            color="accent"
            variant="filled"
            onClick={handleGenerate}
            disabled={!audioFile || isGenerating}
            endIcon={
              isGenerating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Send />
              )
            }
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #e082ea 0%, #e4465b 100%)",
              },
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default AudioToTextInput;
