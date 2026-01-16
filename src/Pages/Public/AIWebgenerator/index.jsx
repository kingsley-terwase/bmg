import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Chip,
  Avatar,
  LinearProgress,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Tabs,
  Tab,
  Fade,
  Collapse,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Sparkle24Regular,
  Code24Regular,
  Eye24Regular,
  ArrowRight24Regular,
  ArrowLeft24Regular,
  Copy24Regular,
  Play24Regular,
  CheckmarkCircle24Filled,
  Wand24Regular,
  Globe24Regular,
  Clock24Regular,
  PaintBrush24Regular,
  LightbulbFilament24Regular,
  Rocket24Regular,
} from "@fluentui/react-icons";
import { Download } from "@mui/icons-material";
import Marquee from "react-fast-marquee";
import { FONT_FAMILY } from "../../../Config/font";
import {
  ConsultantForm,
  FAQSection,
  FeatureSection,
  PricingSection,
} from "../../../Component";

const AIWebGeneratorPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [selectedColors, setSelectedColors] = useState("blue");
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const steps = [
    "Describe Your Vision",
    "Choose Style & Colors",
    "AI Generation",
    "Preview & Export",
  ];

  const styles = [
    {
      id: "modern",
      name: "Modern",
      icon: "🎨",
      description: "Clean, minimalist design with bold typography",
    },
    {
      id: "corporate",
      name: "Corporate",
      icon: "💼",
      description: "Professional and trustworthy appearance",
    },
    {
      id: "creative",
      name: "Creative",
      icon: "✨",
      description: "Vibrant and artistic with unique layouts",
    },
    {
      id: "elegant",
      name: "Elegant",
      icon: "👔",
      description: "Sophisticated and luxurious feel",
    },
  ];

  const colorSchemes = [
    {
      id: "blue",
      name: "Ocean Blue",
      primary: "#2563eb",
      secondary: "#0ea5e9",
      preview: ["#2563eb", "#0ea5e9", "#0284c7"],
    },
    {
      id: "purple",
      name: "Royal Purple",
      primary: "#7c3aed",
      secondary: "#a855f7",
      preview: ["#7c3aed", "#a855f7", "#c026d3"],
    },
    {
      id: "green",
      name: "Nature Green",
      primary: "#059669",
      secondary: "#10b981",
      preview: ["#059669", "#10b981", "#14b8a6"],
    },
    {
      id: "orange",
      name: "Sunset Orange",
      primary: "#ea580c",
      secondary: "#f59e0b",
      preview: ["#ea580c", "#f59e0b", "#f97316"],
    },
  ];

  const features = [
    {
      icon: <Sparkle24Regular />,
      title: "AI-Powered Design",
      description: "Let AI create stunning layouts based on your vision",
    },
    {
      icon: <Rocket24Regular />,
      title: "Instant Generation",
      description: "Get your website in seconds, not hours",
    },
    {
      icon: <PaintBrush24Regular />,
      title: "Customizable Styles",
      description: "Choose from multiple design styles and color schemes",
    },
    {
      icon: <Code24Regular />,
      title: "Clean Code",
      description: "Production-ready, semantic HTML & CSS",
    },
  ];

  const examples = [
    {
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      title: "SaaS Landing Page",
      category: "Business",
      time: "2 min",
    },
    {
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      title: "Portfolio Website",
      category: "Creative",
      time: "3 min",
    },
    {
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
      title: "E-commerce Store",
      category: "Retail",
      time: "4 min",
    },
    {
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      title: "Portfolio Website",
      category: "Creative",
      time: "3 min",
    },
  ];

  const handleNext = () => {
    if (activeStep === 2) {
      setGenerating(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setGenerationProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setShowPreview(true);
          setActiveStep(activeStep + 1);
        }
      }, 300);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        mt: 8,
        pb: 8,
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${theme.palette.primary.lightBg} 0%, ${theme.palette.background.paper} 100%)`,
          py: { xs: 10, md: 1 },
          borderBottom: `1px solid ${theme.palette.divider}`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-40%",
            left: "-10%",
            width: "700px",
            height: "700px",
            background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
            borderRadius: "50%",
            animation: "float 25s ease-in-out infinite",
          },
          "@keyframes float": {
            "0%,100%": { transform: "translate(0,0) scale(1)" },
            "50%": { transform: "translate(25px, 25px) scale(1.1)" },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ maxWidth: "480px" }}>
                {/* Badge */}
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1,
                    mb: 3,
                    borderRadius: "50px",
                    background: `${theme.palette.primary.main}15`,
                    border: `1px solid ${theme.palette.primary.main}30`,
                  }}
                >
                  <Wand24Regular
                    style={{ color: theme.palette.primary.main }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    AI Web Creation
                  </Typography>
                </Box>

                {/* Title */}
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2.6rem", md: "3rem" },
                    lineHeight: 1.1,
                    mb: 3,
                    color: theme.palette.text.heading,
                  }}
                >
                  Stunning Websites <br></br>
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontFamily: FONT_FAMILY.tertiary,
                    }}
                  >
                    Built by AI
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.7,
                    mb: 4,
                  }}
                >
                  Describe your idea—and watch AI instantly turn it into a
                  professional site. No code. No hassle. Just pure creativity.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<Sparkle24Regular />}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.main,
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: theme.palette.primary.dark,
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Start Creating
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  height: "auto",
                  width: "100%",
                  overflow: "hidden",
                  // borderRadius: 4,
                  // boxShadow: `0 20px 40px ${theme.palette.primary.main}25`,
                }}
              >
                <Marquee
                  direction="up"
                  speed={130}
                  gradient={false}
                  pauseOnHover
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    // paddingRight: "20px",
                  }}
                >
                  {[
                    "/Images/cat_1.png",
                    "/Images/cat_5.png",
                    "/Images/cat_6.png",
                    "/Images/cat_8.png",
                    "/Images/cat_7.png",
                  ].map((src, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: "100%",
                        // borderRadius: 4,
                        overflow: "hidden",
                        // boxShadow: `0 10px 25px rgba(0,0,0,0.1)`,
                        transform: "scale(1)",
                        transition: "0.4s",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: `0 18px 35px rgba(0,0,0,0.18)`,
                        },
                      }}
                    >
                      <img
                        src={src}
                        alt="website-preview"
                        style={{
                          width: "400px",
                          height: "auto",
                          overflow: "hidden",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </Marquee>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  textAlign: "center",
                  bgcolor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    bgcolor: `${theme.palette.primary.main}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                    color: theme.palette.primary.main,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.heading,
                    mb: 1,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Card
          sx={{
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            overflow: "hidden",
          }}
        >
          {/* Stepper */}
          <Box
            sx={{ p: 4, borderBottom: `1px solid ${theme.palette.divider}` }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      "& .MuiStepLabel-label": {
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                      },
                      "& .MuiStepLabel-label.Mui-active": {
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                      },
                      "& .MuiStepIcon-root": {
                        color: theme.palette.divider,
                      },
                      "& .MuiStepIcon-root.Mui-active": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiStepIcon-root.Mui-completed": {
                        color: theme.palette.success.main,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          {/* Step Content */}
          <Box sx={{ p: { xs: 3, md: 6 }, minHeight: 400 }}>
            {/* Step 0: Describe Your Vision */}
            {activeStep === 0 && (
              <Fade in timeout={500}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.heading,
                      mb: 2,
                    }}
                  >
                    What kind of website do you want to create?
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.secondary, mb: 4 }}
                  >
                    Describe your project in detail. The more information you
                    provide, the better the AI can understand your vision.
                  </Typography>

                  <TextField
                    fullWidth
                    label="Project Name"
                    placeholder="My Awesome Website"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    sx={{ mb: 3 }}
                  />

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color:
                          theme.palette.text.heading ??
                          theme.palette.text.primary,
                      }}
                    >
                      Project Description
                    </Typography>

                    <TextField
                      fullWidth
                      multiline
                      minRows={6}
                      placeholder="Describe your project..."
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      sx={{
                        mb: 1,

                        // force textarea to start at the top
                        "& .MuiInputBase-root": {
                          alignItems: "flex-start !important",
                          paddingTop: "12px",
                        },

                        // force actual <textarea> to top-align and have spacing
                        "& textarea": {
                          padding: "0 !important",
                          marginTop: "0 !important",
                          lineHeight: "1.6 !important",
                          fontSize: "15px",
                          color: "text.primary",
                        },
                      }}
                    />

                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1,
                        color: theme.palette.text.secondary,
                        display: "block",
                      }}
                    >
                      Provide a concise but detailed description. Include goals,
                      pages, and any integrations.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 3,
                      bgcolor: `${theme.palette.info.main}10`,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.info.main}30`,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                      <LightbulbFilament24Regular
                        style={{ color: theme.palette.info.main }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.heading,
                        }}
                      >
                        Pro Tips:
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, mb: 1 }}
                    >
                      • Mention the type of business or purpose
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary, mb: 1 }}
                    >
                      • Describe the mood or feeling you want (professional,
                      playful, elegant)
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      • List specific sections or features you need
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            )}

            {/* Step 1: Choose Style & Colors */}
            {activeStep === 1 && (
              <Fade in timeout={500}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.heading,
                      mb: 2,
                    }}
                  >
                    Choose your style
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.secondary, mb: 4 }}
                  >
                    Select a design style that matches your brand personality
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 5 }}>
                    {styles.map((style) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={style.id}>
                        <Card
                          onClick={() => setSelectedStyle(style.id)}
                          sx={{
                            p: 3,
                            cursor: "pointer",
                            border: `2px solid ${
                              selectedStyle === style.id
                                ? theme.palette.primary.main
                                : theme.palette.divider
                            }`,
                            bgcolor:
                              selectedStyle === style.id
                                ? `${theme.palette.primary.main}08`
                                : theme.palette.background.paper,
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              borderColor: theme.palette.primary.main,
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          <Typography variant="h3" sx={{ mb: 1 }}>
                            {style.icon}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.heading,
                              mb: 1,
                            }}
                          >
                            {style.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            {style.description}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.heading,
                      mb: 2,
                      mt: 4,
                    }}
                  >
                    Select color scheme
                  </Typography>

                  <Grid container spacing={2}>
                    {colorSchemes.map((scheme) => (
                      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={scheme.id}>
                        <Card
                          onClick={() => setSelectedColors(scheme.id)}
                          sx={{
                            p: 3,
                            cursor: "pointer",
                            border: `2px solid ${
                              selectedColors === scheme.id
                                ? theme.palette.primary.main
                                : theme.palette.divider
                            }`,
                            bgcolor:
                              selectedColors === scheme.id
                                ? `${theme.palette.primary.main}08`
                                : theme.palette.background.paper,
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              borderColor: theme.palette.primary.main,
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            {scheme.preview.map((color, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  bgcolor: color,
                                  border: `2px solid ${theme.palette.background.paper}`,
                                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                }}
                              />
                            ))}
                          </Box>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.heading,
                            }}
                          >
                            {scheme.name}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            )}

            {/* Step 2: AI Generation */}
            {activeStep === 2 && (
              <Fade in timeout={500}>
                <Box sx={{ textAlign: "center", py: 6 }}>
                  {!generating ? (
                    <>
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          bgcolor: `${theme.palette.primary.main}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                        }}
                      >
                        <Sparkle24Regular
                          style={{
                            fontSize: 48,
                            color: theme.palette.primary.main,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.heading,
                          mb: 2,
                        }}
                      >
                        Ready to Generate
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          mb: 4,
                          maxWidth: 500,
                          mx: "auto",
                        }}
                      >
                        Your website will be generated based on:
                      </Typography>
                      <Box
                        sx={{
                          textAlign: "left",
                          maxWidth: 500,
                          mx: "auto",
                          mb: 4,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                            p: 2,
                            bgcolor: theme.palette.background.default,
                            borderRadius: 2,
                          }}
                        >
                          <CheckmarkCircle24Filled
                            style={{ color: theme.palette.success.main }}
                          />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.text.secondary }}
                            >
                              Project Name
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.text.heading,
                              }}
                            >
                              {projectName || "Untitled Project"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 2,
                            p: 2,
                            bgcolor: theme.palette.background.default,
                            borderRadius: 2,
                          }}
                        >
                          <CheckmarkCircle24Filled
                            style={{ color: theme.palette.success.main }}
                          />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.text.secondary }}
                            >
                              Style
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.text.heading,
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedStyle}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            bgcolor: theme.palette.background.default,
                            borderRadius: 2,
                          }}
                        >
                          <CheckmarkCircle24Filled
                            style={{ color: theme.palette.success.main }}
                          />
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ color: theme.palette.text.secondary }}
                            >
                              Color Scheme
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.text.heading,
                              }}
                            >
                              {
                                colorSchemes.find(
                                  (c) => c.id === selectedColors
                                )?.name
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: "50%",
                          bgcolor: `${theme.palette.primary.main}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                          animation: "pulse 2s ease-in-out infinite",
                          "@keyframes pulse": {
                            "0%, 100%": { transform: "scale(1)" },
                            "50%": { transform: "scale(1.05)" },
                          },
                        }}
                      >
                        <Wand24Regular
                          style={{
                            fontSize: 48,
                            color: theme.palette.primary.main,
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.heading,
                          mb: 2,
                        }}
                      >
                        AI is Creating Your Website...
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary, mb: 4 }}
                      >
                        This usually takes 10-30 seconds
                      </Typography>
                      <Box sx={{ maxWidth: 500, mx: "auto", mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={generationProgress}
                          sx={{
                            height: 12,
                            borderRadius: 2,
                            bgcolor: theme.palette.divider,
                            "& .MuiLinearProgress-bar": {
                              bgcolor: theme.palette.primary.main,
                              borderRadius: 2,
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary, mt: 1 }}
                        >
                          {generationProgress}% Complete
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>
              </Fade>
            )}

            {/* Step 3: Preview & Export */}
            {activeStep === 3 && (
              <Fade in timeout={500}>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.heading,
                      }}
                    >
                      Your Website is Ready!
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Copy24Regular />}
                        sx={{
                          borderColor: theme.palette.divider,
                          color: theme.palette.text.primary,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            bgcolor: `${theme.palette.primary.main}08`,
                          },
                        }}
                      >
                        Copy Code
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<Download />}
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          color: theme.palette.primary.contrastText,
                          "&:hover": {
                            bgcolor: theme.palette.primary.dark,
                          },
                        }}
                      >
                        Download
                      </Button>
                    </Box>
                  </Box>

                  <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{
                      mb: 3,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "1rem",
                      },
                    }}
                  >
                    <Tab
                      icon={<Eye24Regular />}
                      iconPosition="start"
                      label="Preview"
                    />
                    <Tab
                      icon={<Code24Regular />}
                      iconPosition="start"
                      label="HTML"
                    />
                    <Tab
                      icon={<PaintBrush24Regular />}
                      iconPosition="start"
                      label="CSS"
                    />
                  </Tabs>

                  {tabValue === 0 && (
                    <Box
                      sx={{
                        height: 500,
                        bgcolor: theme.palette.background.default,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box sx={{ textAlign: "center", p: 4 }}>
                        <Globe24Regular
                          style={{
                            fontSize: 64,
                            color: theme.palette.text.secondary,
                            marginBottom: 16,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          Website Preview
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary, mt: 1 }}
                        >
                          Your generated website would appear here
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {tabValue === 1 && (
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: theme.palette.background.default,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        maxHeight: 500,
                        overflow: "auto",
                        fontFamily: "monospace",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {`<!DOCTYPE html>
                                                <html lang="en">
                                                <head>
                                                    <meta charset="UTF-8">
                                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                    <title>${
                                                      projectName ||
                                                      "My Website"
                                                    }</title>
                                                    <link rel="stylesheet" href="styles.css">
                                                </head>
                                                <body>
                                                    <!-- Your AI-generated HTML code here -->
                                                </body>
                                                </html>`}
                      </Typography>
                    </Paper>
                  )}

                  {tabValue === 2 && (
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: theme.palette.background.default,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        maxHeight: 500,
                        overflow: "auto",
                        fontFamily: "monospace",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {`/* AI Generated Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
}

/* Your AI-generated CSS code here */`}
                      </Typography>
                    </Paper>
                  )}
                </Box>
              </Fade>
            )}
          </Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              p: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<ArrowLeft24Regular />}
              sx={{
                color: theme.palette.text.primary,
                "&:disabled": {
                  color: theme.palette.text.disabled,
                },
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={
                activeStep === 3 || (activeStep === 0 && !projectDescription)
              }
              endIcon={
                activeStep === 2 ? (
                  <Sparkle24Regular />
                ) : (
                  <ArrowRight24Regular />
                )
              }
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                px: 4,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
                "&:disabled": {
                  bgcolor: theme.palette.divider,
                },
              }}
            >
              {activeStep === 2
                ? "Generate with AI"
                : activeStep === 3
                ? "Finish"
                : "Next"}
            </Button>
          </Box>
        </Card>
      </Container>

      {/* Examples Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: theme.palette.text.heading, mb: 2 }}
          >
            See What Others Have Created
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Get inspired by these AI-generated websites created by our community
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {examples.map((example, index) => (
            <Grid size={{ xs: 12, md: 4, lg: 3, xl: 3 }} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={example.image}
                    alt={example.title}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: theme.palette.background.paper,
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Play24Regular
                      style={{ color: theme.palette.primary.main }}
                    />
                  </Box>
                </Box>
                <CardContent>
                  <Chip
                    label={example.category}
                    size="small"
                    sx={{
                      mb: 1,
                      bgcolor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.text.heading,
                      mb: 1,
                    }}
                  >
                    {example.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Clock24Regular
                      style={{
                        fontSize: 16,
                        color: theme.palette.text.secondary,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      Generated in {example.time}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* <Container maxWidth="md" sx={{ py: 8 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        p: { xs: 4, md: 6 },
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        color: '#fff',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -100,
                            right: -100,
                            width: 300,
                            height: 300,
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%',
                        },
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, position: 'relative', zIndex: 1 }}>
                        Ready to Build Your Dream Website?
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, position: 'relative', zIndex: 1 }}>
                        Join thousands of creators who have already brought their ideas to life with AI
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<Rocket24Regular />}
                        sx={{
                            bgcolor: '#fff',
                            color: theme.palette.primary.main,
                            px: 5,
                            py: 2,
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            borderRadius: 3,
                            textTransform: 'none',
                            position: 'relative',
                            zIndex: 1,
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Get Started Free
                    </Button>
                </Box>
            </Container> */}
      <FeatureSection />
      <PricingSection />
      <ConsultantForm />
      <FAQSection />
    </Box>
  );
};

export default AIWebGeneratorPage;
