import React from "react";
import {
  Search24Regular,
  Mail24Regular,
  Globe24Regular,
  ChevronRight20Regular
} from "@fluentui/react-icons";

import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputBase
} from "@mui/material";

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: "About Us", href: "#" },
      { name: "Media", href: "#" },
      { name: "Press Releases", href: "#" },
      { name: "Testimonials", href: "#" },
      { name: "Careers", href: "#" }
    ],
    "Popular Services": [
      { name: "Logo Design", href: "#" },
      { name: "Website Development", href: "#" },
      { name: "AI Generator", href: "#" },
      { name: "Animation", href: "#" },
      { name: "Digital Marketing", href: "#" }
    ],
    "Get Started": [
      { name: "Account Login", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "All Services", href: "#" },
      { name: "Free Consultation", href: "#" },
      { name: "Packages", href: "#" }
    ],
    Resources: [
      { name: "Blog", href: "#" },
      { name: "Help Centre", href: "#" },
      { name: "Partners", href: "#" },
      { name: "Gift Voucher", href: "#" },
      { name: "FAQs", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: "📺", name: "YouTube" },
    { icon: "👍", name: "Facebook" },
    { icon: "🐦", name: "Twitter" },
    { icon: "📷", name: "Instagram" },
    { icon: "💼", name: "LinkedIn" }
  ];

  return (
    <Box
      component="footer"
      sx={{
        color: "white",
        position: "relative",
        background: "linear-gradient(135deg, #111827, #1e293b, #111827)"
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, py: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #fb923c, #ea580c)",
                  boxShadow: 3
                }}
              >
                <Typography sx={{ fontSize: 28 }}>👤</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold">
                BMG
              </Typography>
            </Box>

            <Typography sx={{ color: "gray", mb: 3 }}>
              Empowering businesses with cutting-edge AI solutions and digital
              marketing services. Transform your vision into reality with BMG.
            </Typography>

            {/* SEARCH BAR */}
            <Box sx={{ position: "relative", mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Search services..."
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    bgcolor: "rgba(31,41,55,0.6)",
                    borderRadius: 2,
                    color: "white"
                  },
                  "& input": { color: "white" }
                }}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "#f97316",
                  "&:hover": { bgcolor: "#ea580c" },
                  color: "white"
                }}
              >
                <Search24Regular />
              </IconButton>
            </Box>

            {/* SOCIAL ICONS */}
            <Box display="flex" gap={2}>
              {socialLinks.map((s, i) => (
                <Box
                  key={i}
                  component="a"
                  href="#"
                  title={s.name}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: "#1f2937",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      boxShadow: 3,
                      bgcolor: "#ea580c"
                    },
                    textDecoration: "none"
                  }}
                >
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                </Box>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid size={{ xs:6, md:3, lg:2 }} key={category}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {category}
              </Typography>

              {links.map((link, idx) => (
                <Box
                  key={idx}
                  component="a"
                  href={link.href}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                    color: "gray",
                    textDecoration: "none",
                    "&:hover": { color: "#fb923c" }
                  }}
                >
                  <ChevronRight20Regular />
                  {link.name}
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          borderTop: "1px solid #1f2937",
          py: 3,
          px: 3
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2
          }}
        >
          {/* COPYRIGHT */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                background: "linear-gradient(135deg, #fb923c, #ea580c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span>👤</span>
            </Box>

            <Typography sx={{ color: "gray" }}>
              <strong style={{ color: "white" }}>ADVANTEK</strong> © 2025. All
              rights reserved.
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={3}
            sx={{ color: "gray" }}
          >
            <a href="#" style={{ color: "gray" }}>Terms</a>
            •
            <a href="#" style={{ color: "gray" }}>Privacy</a>
            •
            <a href="#" style={{ color: "gray" }}>Contact</a>
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Globe24Regular style={{ color: "gray" }} />
            <Select
              defaultValue="EN"
              sx={{
                bgcolor: "#1f2937",
                color: "white",
                borderRadius: 2,
                px: 2
              }}
            >
              <MenuItem value="EN">EN - English</MenuItem>
              <MenuItem value="ES">ES - Español</MenuItem>
              <MenuItem value="FR">FR - Français</MenuItem>
              <MenuItem value="DE">DE - Deutsch</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
