import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Dialog,
  DialogContent,
  Chip,
  Divider,
} from "@mui/material";
import { History, Delete, Download, Close, Send } from "@mui/icons-material";
import { EMOJI_ICONS } from "../../../../Config/emojiIcons";

const TextToAudioInput = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSpeech, setSelectedSpeech] = useState(null);

  /* mock speeches */
  const speeches = [
    {
      id: 1,
      title: "Motivational Speech",
      excerpt:
        "Success is not defined by how many times you win, but by how many times you rise...",
      content:
        "Success is not defined by how many times you win, but by how many times you rise after falling. Every challenge is a lesson...",
      timestamp: "5 mins ago",
    },
    {
      id: 2,
      title: "Wedding Speech",
      excerpt:
        "Today we celebrate love, partnership, and a lifetime of shared dreams...",
      content:
        "Today we celebrate love, partnership, and a lifetime of shared dreams. Marriage is not just about finding the right person...",
      timestamp: "12 mins ago",
    },
  ];

  const history = speeches.slice(0, 5);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Box sx={{ height: "100%" }}>
 

      <Grid container sx={{ height: "calc(100% - 96px)" }}>
        <Grid
          item
          size={{ xs: 12, md: 3 }}
          sx={{
            bgcolor: "#F9FAFB",
            p: 1,
            mt: 3,
            boxShadow: 5,
            borderRadius: 1,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <History fontSize="small" />
            <Typography fontWeight={600}>Recent Speeches</Typography>
          </Stack>

          <Stack spacing={1}>
            {history.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  "&:hover": { bgcolor: "grey.50" },
                }}
                onClick={() => setSelectedSpeech(item)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.timestamp}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Content Column */}
        <Grid item size={{ xs: 12, md: 9 }} sx={{ p: 3, overflowY: "auto" }}>
          {/* Prompt Input */}
          <Card variant="outlined" sx={{ borderRadius: 1, mb: 4 }}>
            <CardContent>
              <Typography fontWeight={600} mb={1}>
                Describe the speech you want
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="E.g. A motivational speech for young entrepreneurs..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              <Stack direction="row" justifyContent="flex-end" mt={2}>
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
                  sx={{ textTransform: "none", px: 4 }}
                >
                  {isGenerating ? "Generating..." : "Generate Speech"}
                </Button>
              </Stack>
            </CardContent>
          </Card>

          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              p: 2,
              mt: 3,
            }}
          >
            <Typography fontWeight={700} mb={2}>
              Generated Speeches
            </Typography>

            <Grid container spacing={3}>
              {speeches.map((speech) => (
                <Grid item xs={12} md={6} key={speech.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      "&:hover": { boxShadow: 3 },
                    }}
                    onClick={() => setSelectedSpeech(speech)}
                  >
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography fontWeight={600}>{speech.title}</Typography>
                        <Chip size="small" label="AI" />
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {speech.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={Boolean(selectedSpeech)}
        onClose={() => setSelectedSpeech(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography fontWeight={700}>{selectedSpeech?.title}</Typography>
            <IconButton onClick={() => setSelectedSpeech(null)}>
              <Close />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {selectedSpeech?.content}
          </Typography>

          <Stack direction="row" spacing={2} mt={3}>
            <Button startIcon={<Download />} variant="contained">
              Download
            </Button>
            <Button startIcon={<Delete />} color="error" variant="outlined">
              Delete
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TextToAudioInput;
