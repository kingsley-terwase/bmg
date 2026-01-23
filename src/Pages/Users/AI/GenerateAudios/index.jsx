/* eslint-disable react-hooks/set-state-in-effect */
// UserGenerateAudio.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Card,
  Dialog,
  DialogContent,
  Stack,
  Chip,
  Skeleton,
  keyframes,
  LinearProgress,
} from "@mui/material";
import {
  MusicNote,
  Delete,
  Download,
  Close,
  PlayArrow,
  Pause,
  GraphicEq,
  VolumeUp,
  Headphones,
} from "@mui/icons-material";
import { DashboardTab, CustomTab } from "../../../../Component";
import AudioToTextInput from "./audio-to-text";
import TextToAudioInput from "./text-to-audio";
import { audioTabs } from "../data";

// Animation keyframes
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

const wave = keyframes`
  0% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.5);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const GeneratingAnimation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 450,
        p: 4,
      }}
    >
      {/* Sound Wave Animation */}
      <Stack direction="row" spacing={1} alignItems="flex-end" mb={4}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 60,
              bgcolor: "primary.main",
              borderRadius: 1,
              animation: `${wave} 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </Stack>

      {/* Headphones Icon with Pulse */}
      <Box
        sx={{
          p: 3,
          bgcolor: "primary.light",
          borderRadius: "50%",
          mb: 3,
          animation: `${pulse} 2s ease-in-out infinite`,
        }}
      >
        <Headphones sx={{ fontSize: 64, color: "primary.main" }} />
      </Box>

      {/* Shimmer Box */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          height: 120,
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
          border: "3px solid",
          borderColor: "primary.main",
          boxShadow: "0 8px 32px rgba(25, 118, 210, 0.2)",
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
                rgba(25, 118, 210, 0.3) 50%,
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
        <Typography variant="h5" fontWeight={700} color="primary">
          Processing Audio...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI is working its magic. Please wait.
        </Typography>
      </Stack>

      {/* Progress Dots */}
      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: `${pulse} 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

const SkeletonAudioCard = () => (
  <Card
    elevation={0}
    sx={{
      borderRadius: 2,
      border: "1px solid #e0e0e0",
      overflow: "hidden",
    }}
  >
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Skeleton variant="circular" width={56} height={56} animation="wave" />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="70%" height={24} animation="wave" />
          <Skeleton
            variant="text"
            width="40%"
            height={20}
            animation="wave"
            sx={{ mt: 1 }}
          />
        </Box>
      </Stack>
      <Skeleton
        variant="rectangular"
        height={4}
        sx={{ mt: 2, borderRadius: 1 }}
        animation="wave"
      />
    </Box>
  </Card>
);

const AudioPlayerCard = ({ audio, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement] = useState(new Audio(audio.url));

  useEffect(() => {
    audioElement.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      audioElement.pause();
      audioElement.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [audioElement]);

  const togglePlay = () => {
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audio.url;
    link.download = `audio-${audio.id}.mp3`;
    link.click();
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Play Button */}
          <IconButton
            onClick={togglePlay}
            sx={{
              width: 56,
              height: 56,
              bgcolor: "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>

          {/* Audio Info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body1"
              fontWeight={600}
              noWrap
              sx={{ mb: 0.5 }}
            >
              {audio.text || audio.title || "Generated Audio"}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {audio.duration && (
                <Chip
                  label={audio.duration}
                  size="small"
                  icon={<MusicNote />}
                  variant="outlined"
                />
              )}
              {audio.voice && (
                <Chip
                  label={audio.voice}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              )}
            </Stack>
          </Box>

          {/* Action Buttons */}
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              onClick={handleDownload}
              sx={{
                bgcolor: "success.light",
                color: "success.dark",
                "&:hover": {
                  bgcolor: "success.main",
                  color: "white",
                },
              }}
            >
              <Download fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(audio.id)}
              sx={{
                bgcolor: "error.light",
                color: "error.dark",
                "&:hover": {
                  bgcolor: "error.main",
                  color: "white",
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        {/* Progress Bar */}
        {isPlaying && (
          <LinearProgress
            sx={{
              mt: 2,
              height: 4,
              borderRadius: 2,
              bgcolor: "primary.light",
            }}
          />
        )}
      </Box>
    </Card>
  );
};

const UserGenerateAudio = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [generatedAudios, setGeneratedAudios] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  // Simulate loading generated audios
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setGeneratedAudios([
        {
          id: 1,
          text: "Welcome to our AI audio generator platform",
          voice: "Nova",
          duration: "0:05",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
        {
          id: 2,
          text: "This is a sample of generated audio content",
          voice: "Alloy",
          duration: "0:04",
          url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleAudioGenerated = (newAudio) => {
    setGeneratedAudios((prev) => [newAudio, ...prev]);
  };

  const handleDeleteAudio = (audioId) => {
    if (window.confirm("Are you sure you want to delete this audio?")) {
      setGeneratedAudios((prev) =>
        prev.filter((audio) => audio.id !== audioId)
      );
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
        {/* Header */}
        <Box
          sx={{
            borderBottom: "1px solid #e0e0e0",
            px: 4,
            py: 3,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Box sx={{ fontSize: 32 }}>🎵</Box>
            <Typography variant="h4" fontWeight={700}>
              Audio Generator
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            Generate speech from text or transcribe audio to text with AI
          </Typography>
        </Box>

        <Grid container spacing={3} mt={5} sx={{ px: 3 }}>
          <Grid item size={{ xs: 12, md: 6, lg: 5 }}>
            <CustomTab
              tabs={audioTabs}
              activeTab={activeTab}
              updateActiveTab={updateActiveTab}
            />

            <DashboardTab tabKey={0} activeTab={activeTab}>
              <TextToAudioInput
                onGeneratingChange={setIsGenerating}
                onAudioGenerated={handleAudioGenerated}
              />
            </DashboardTab>

            <DashboardTab tabKey={1} activeTab={activeTab}>
              <AudioToTextInput
                onGeneratingChange={setIsGenerating}
                onTextGenerated={handleAudioGenerated}
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
                bgcolor: "background.paper",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                mb={3}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <MusicNote color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    {isGenerating ? "Processing..." : "Audio Library"}
                  </Typography>
                </Stack>
                {!isGenerating && generatedAudios.length > 0 && (
                  <Chip
                    label={`${generatedAudios.length} audio${
                      generatedAudios.length !== 1 ? "s" : ""
                    }`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Stack>

              {/* Generating Animation */}
              {isGenerating ? (
                <GeneratingAnimation />
              ) : isLoading ? (
                // Skeleton Loading
                <Stack spacing={2}>
                  {[1, 2, 3, 4].map((item) => (
                    <SkeletonAudioCard key={item} />
                  ))}
                </Stack>
              ) : (
                // Audio List
                <Stack spacing={2}>
                  {generatedAudios.length > 0 ? (
                    generatedAudios.map((audio) => (
                      <AudioPlayerCard
                        key={audio.id}
                        audio={audio}
                        onDelete={handleDeleteAudio}
                      />
                    ))
                  ) : (
                    // Empty State
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 10,
                      }}
                    >
                      <Box sx={{ fontSize: 80, mb: 3 }}>🎧</Box>
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        color="text.secondary"
                        gutterBottom
                      >
                        No Audio Yet
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={3}>
                        Start generating audio or transcribing files
                      </Typography>
                      <Chip
                        label="Create your first audio"
                        color="primary"
                        sx={{ px: 2, py: 1, fontSize: "0.9rem" }}
                      />
                    </Box>
                  )}
                </Stack>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserGenerateAudio;
