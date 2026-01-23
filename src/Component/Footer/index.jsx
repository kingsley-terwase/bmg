import React from "react";
import {
  Search24Regular,
  ChevronRight20Regular,
  Globe24Regular
} from "@fluentui/react-icons";

import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
  Select,
  MenuItem,
  useTheme
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Social Media
  const socialLinks = [
    { icon: <YouTubeIcon />, name: "YouTube", href: "#" },
    { icon: <FacebookIcon />, name: "Facebook", href: "#" },
    { icon: <TwitterIcon />, name: "Twitter", href: "#" },
    { icon: <InstagramIcon />, name: "Instagram", href: "#" },
    { icon: <LinkedInIcon />, name: "LinkedIn", href: "#" }
  ];

  // Footer Links with correct routes
  const footerLinks = {
    Company: [
      { name: "About Us", path: "/about-us" },
      { name: "Contact Us", path: "/contact-us" },
      { name: "Pricing", path: "/pricing" },
      { name: "How It Works", path: "/how-it-works" },
      { name: "Portfolio", path: "/portfolio" }
    ],
    "Popular Services": [
      { name: "All Services", path: "/services" },
      { name: "AI Suites", path: "/ai-suites" },
      { name: "AI Web Generator", path: "/ai-web" },
      { name: "Gigs", path: "/categories" },
      { name: "Gift Voucher", path: "/gift-voucher" }
    ],
    "Get Started": [
      { name: "Account Login", path: "/login" },
      { name: "Register", path: "/register" },
      // { name: "Track Order", path: "/process-order" },
      // { name: "Checkout", path: "/checkout" },
      { name: "Resources", path: "/resources" }
    ],
    Resources: [
      { name: "Blog", path: "/blogs" },
      { name: "Resources", path: "/resources" },
      { name: "Portfolio", path: "/portfolio" },
      { name: "Gift Voucher", path: "/gift-voucher" },
      { name: "Privacy Policy", path: "/privacy-policy" }
    ]
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (path) {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSocialClick = (e, href) => {
    e.preventDefault();
    // You can add actual social media links here
    console.log(`Navigate to ${href}`);
  };

  return (
    <Box
      component="footer"
      sx={{
        color: theme.palette.primary.contrastText,
        background: 'linear-gradient(135deg, #111827, #1e293b, #111827)',
        position: "relative"
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, py: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 4, lg: 4 }}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={3}
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                component="img"
                src={theme.palette.mode === 'dark' ? '/Logo/LogoLight.png' : '/Logo/LogoLight.png'}
                sx={{ width: 90, height: "auto" }}
              />
            </Box>

            <Typography sx={{ color: theme.palette.primary.contrastText, mb: 3 }}>
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
                  "& input": { color: theme.palette.text.primary },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.divider
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.palette.primary.main
                  }
                }}
              />

              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: theme.palette.primary.main,
                  "&:hover": { bgcolor: theme.palette.primary.dark },
                  color: theme.palette.primary.contrastText
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
                  href={s.href}
                  title={s.name}
                  onClick={(e) => handleSocialClick(e, s.href)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.contrastText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText
                    },
                    textDecoration: "none",
                    color: theme.palette.text.unique,
                    cursor: "pointer"
                  }}
                >
                  {s.icon}
                </Box>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid size={{ xs: 6, md: 2, lg: 2 }} key={category}>
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={3}
                sx={{ color: theme.palette.primary.contrastText }}
              >
                {category}
              </Typography>

              {links.map((link, idx) => (
                <Box
                  key={idx}
                  component="a"
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                    color: theme.palette.primary.contrastText,
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "0.2s",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateX(4px)"
                    }
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
          borderTop: `1px solid ${theme.palette.divider}`,
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
            <Typography sx={{ color: theme.palette.primary.contrastText }}>
              <strong style={{ color: theme.palette.primary.contrastText }}>
                BestMarketingGiggs
              </strong>{" "}
              © 2025. All rights reserved.
            </Typography>
          </Box>

          {/* LINKS */}
          <Box
            display="flex"
            alignItems="center"
            gap={3}
            sx={{ color: theme.palette.primary.contrastText }}
          >
            <Box
              component="a"
              href="/terms-conditions"
              onClick={(e) => handleLinkClick(e, '/terms-conditions')}
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": { color: theme.palette.primary.main }
              }}
            >
              Terms
            </Box>
            •
            <Box
              component="a"
              href="/privacy-policy"
              onClick={(e) => handleLinkClick(e, '/privacy-policy')}
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": { color: theme.palette.primary.main }
              }}
            >
              Privacy
            </Box>
            •
            <Box
              component="a"
              href="/contact-us"
              onClick={(e) => handleLinkClick(e, '/contact-us')}
              sx={{
                color: theme.palette.primary.contrastText,
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": { color: theme.palette.primary.main }
              }}
            >
              Contact
            </Box>
          </Box>

          {/* LANGUAGE SELECT */}
          <Box display="flex" alignItems="center" gap={2}>
            <Globe24Regular style={{ color: theme.palette.primary.contrastText }} />

            <Select
              defaultValue="EN"
              sx={{
                bgcolor: theme.palette.primary.light,
                color: theme.palette.primary.contrastText,
                borderRadius: 2,
                "& .MuiSvgIcon-root": {
                  color: theme.palette.primary.contrastText
                }
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