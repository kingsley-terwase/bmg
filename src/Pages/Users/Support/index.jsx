import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Avatar,
  Stack,
  InputAdornment
} from "@mui/material";
import {
  ExpandMore,
  Search,
  Send,
  AttachFile,
  HelpOutline,
  ContactSupport,
  VisibilityOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { faqs, contactMethods, supportTickets } from "./data";
import { PagesHeader } from "../../../Component";

const UserSupportPage = () => {
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const navigate = useNavigate();

  return (
    <Box>
      <PagesHeader
        label="Support Center"
        desc="Get help with your account, billing, and technical issues."
        enableSearch
        actions={[
          {
            label: "My Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/orders")
          },
          {
            label: "View Notifications",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/notifications")
          },

          {
            label: "View Consultations",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/user/consultations")
          }
        ]}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Grid container spacing={2}>
            {contactMethods.map((method, index) => (
              <Grid key={index} size={{ xs: 12, md: 3, sm: 6 }}>
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar
                        sx={{ bgcolor: method.color, width: 48, height: 48 }}
                      >
                        {method.icon}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontSize={12}
                        >
                          {method.label}
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          fontSize={14}
                        >
                          {method.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <ContactSupport color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Create New Ticket
                </Typography>
              </Stack>
              <TextField
                fullWidth
                label="Subject"
                placeholder="Describe your issue briefly"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                placeholder="Provide detailed information about your issue"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<AttachFile />}
                  sx={{ textTransform: "none" }}
                >
                  Attach File
                </Button>
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  sx={{ textTransform: "none" }}
                >
                  Submit Ticket
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                My Support Tickets
              </Typography>
              <Stack spacing={2}>
                {supportTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    variant="outlined"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { borderColor: "primary.main" }
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography variant="body1" fontWeight={600}>
                          {ticket.subject}
                        </Typography>
                        <Chip
                          label={ticket.status}
                          size="small"
                          color={
                            ticket.status === "Open"
                              ? "error"
                              : ticket.status === "In Progress"
                              ? "warning"
                              : "success"
                          }
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="caption" color="text.secondary">
                          {ticket.date} • {ticket.messages} messages
                        </Typography>
                        <Chip
                          label={ticket.priority}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={3}>
                <HelpOutline color="primary" />
                <Typography variant="h6" fontWeight={600}>
                  Frequently Asked Questions
                </Typography>
              </Stack>

              <TextField
                fullWidth
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 3 }}
              />

              {filteredFaqs.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      width="100%"
                    >
                      <Typography fontWeight={600} flex={1}>
                        {faq.question}
                      </Typography>
                      <Chip label={faq.category} size="small" />
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="text.secondary">{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserSupportPage;
