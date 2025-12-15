import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Grid,
  Chip,
  Stack,
  InputAdornment
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MailIcon from "@mui/icons-material/Mail";
import SubjectIcon from "@mui/icons-material/Subject";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import {
  RecipientsTable,
  UserSearch,
  SideBar,
  CustomButton,
  PagesHeader
} from "../../../Component";
import {
  AddOutlined,
  MailOutlined,
  VisibilityOutlined,
  PeopleOutlined
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Main Compose Component
const ComposeMailPage = () => {
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const allUsers = [
    { email: "user1@example.com" },
    { email: "user2@example.com" },
    { email: "user3@example.com" },
    { email: "admin@example.com" },
    { email: "john.doe@company.com" }
  ];

  const handleAddRecipient = () => {
    if (selectedUser && !selectedRecipients.includes(selectedUser)) {
      setSelectedRecipients([...selectedRecipients, selectedUser]);
      setSelectedUser("");
    }
  };

  const handleSendToAll = () => {
    const allEmails = allUsers.map((user) => user.email);
    setSelectedRecipients(allEmails);
  };

  const handleRemoveRecipient = (email) => {
    setSelectedRecipients(selectedRecipients.filter((e) => e !== email));
  };

  const handleAddFromSearch = (email) => {
    if (!selectedRecipients.includes(email)) {
      setSelectedRecipients([...selectedRecipients, email]);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 32 * 1024 * 1024) {
      setAttachment(file);
    } else {
      setErrors([...errors, "File size must be less than 32MB"]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];
    if (selectedRecipients.length === 0)
      newErrors.push("Please select at least one recipient");
    if (!subject.trim()) newErrors.push("Subject is required");
    if (!content.trim()) newErrors.push("Message content is required");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Sending email:", {
      selectedRecipients,
      subject,
      content,
      attachment
    });
    setErrors([]);
    // Reset after successful submission
    alert("Email sent successfully!");
  };

  const handleDiscard = () => {
    setSelectedRecipients([]);
    setSelectedUser("");
    setSubject("");
    setContent("");
    setAttachment(null);
    setErrors([]);
  };

  return (
    <div>
      <PagesHeader
        label="Compose Mails"
        desc="Manage mails, compose mails, view mails, bulk send mails mark as read."
        enableSearch
        placeholder={"Search orders..."}
        searchValue={search}
        onSearchChange={setSearch}
        actions={[
          {
            label: "View Notifications",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/notifications")
          },
          {
            label: "View Orders",
            icon: <VisibilityOutlined />,
            onClick: () => navigate("/dashboard/admin/orders")
          },
          {
            label: "Add Service",
            icon: <AddOutlined />,
            onClick: () => navigate("/dashboard/admin/add/services")
          }
        ]}
      />
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xl">
          {/* Error Messages */}
          {errors.length > 0 && (
            <Stack spacing={1} sx={{ mb: 3 }}>
              {errors.map((error, index) => (
                <Alert
                  key={index}
                  severity="error"
                  onClose={() =>
                    setErrors(errors.filter((_, i) => i !== index))
                  }
                >
                  {error}
                </Alert>
              ))}
            </Stack>
          )}

          <Grid container spacing={3}>
            {/* SideBar */}
            <Grid size={{ xs: 12, md: 3 }}>
              <CustomButton
                title={"Inbox"}
                fullWidth
                variant="filled"
                color="primary"
                startIcon={<MailOutlined />}
                style={{ marginBottom: "10px" }}
              />
              <SideBar mailCount={12} />
            </Grid>

            {/* Main Content */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Card>
                <Box
                  sx={{
                    p: 2,
                    color: "#000000",
                    m: 2
                  }}
                >
                  <Typography variant="h3" fontWeight={600}>
                    Compose New Message
                  </Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Box component="div" onSubmit={handleSubmit}>
                    {/* Search Users */}
                    <UserSearch onAddUser={handleAddFromSearch} />

                    {/* Select Recipients */}
                    <Box sx={{ mb: 3 }}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="select-recipients-label">
                          Select Recipients
                        </InputLabel>
                        <Select
                          labelId="select-recipients-label"
                          value={selectedUser}
                          onChange={(e) => setSelectedUser(e.target.value)}
                          label="Select Recipients"
                          startAdornment={
                            <InputAdornment position="start">
                              <PeopleOutlined />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="" disabled>
                            Select Recipients
                          </MenuItem>
                          {allUsers.map((user, index) => (
                            <MenuItem key={index} value={user.email}>
                              {user.email}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={handleAddRecipient}
                        >
                          Add
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<PeopleOutlined />}
                          onClick={handleSendToAll}
                        >
                          Send to All Users
                        </Button>
                      </Stack>
                    </Box>

                    {/* Selected Recipients */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 2, fontWeight: 500 }}
                      >
                        <MailIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Selected Recipients:
                      </Typography>
                      <RecipientsTable
                        recipients={selectedRecipients}
                        onRemove={handleRemoveRecipient}
                      />
                    </Box>

                    {/* Subject */}
                    <TextField
                      fullWidth
                      label="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SubjectIcon />
                          </InputAdornment>
                        )
                      }}
                    />

                    {/* Content */}
                    <TextField
                      fullWidth
                      label="Compose"
                      multiline
                      rows={12}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      sx={{ mb: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1 }}
                          >
                            <EditIcon />
                          </InputAdornment>
                        )
                      }}
                    />

                    {/* Attachment */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        <AttachFileIcon
                          sx={{ mr: 1, verticalAlign: "middle" }}
                        />
                        Attachment
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AttachFileIcon />}
                      >
                        Choose File
                        <input type="file" hidden onChange={handleFileChange} />
                      </Button>
                      {attachment && (
                        <Chip
                          label={attachment.name}
                          onDelete={() => setAttachment(null)}
                          sx={{ ml: 2 }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{ mt: 1, color: "text.secondary" }}
                      >
                        Max. 32MB
                      </Typography>
                    </Box>

                    {/* Actions */}
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}
                    >
                      <Button
                        variant="contained"
                        color="inherit"
                        startIcon={<CloseIcon />}
                        onClick={handleDiscard}
                        sx={{
                          bgcolor: "grey.800",
                          "&:hover": { bgcolor: "grey.900" }
                        }}
                      >
                        Discard
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                        onClick={handleSubmit}
                      >
                        Send
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default ComposeMailPage;
