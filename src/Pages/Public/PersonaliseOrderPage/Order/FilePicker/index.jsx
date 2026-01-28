import { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  AudioFile as AudioIcon,
  VideoFile as VideoIcon,
} from "@mui/icons-material";

const getFileIcon = (fileType) => {
  if (fileType.startsWith("image/")) return <ImageIcon />;
  if (fileType === "application/pdf") return <PdfIcon />;
  if (fileType.startsWith("audio/")) return <AudioIcon />;
  if (fileType.startsWith("video/")) return <VideoIcon />;
  return <FileIcon />;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

export default function FilePicker({
  error,
  onChange,
  onBlur,
  tag,
  caption,
  label,
  maxSize = 5 * 1024 * 1024,
  acceptedFormats = ".jpg,.jpeg,.png,.pdf,.mp3,.mp4",
}) {
  const theme = useTheme();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > maxSize) {
      const errorMsg = `File size must be less than ${formatFileSize(maxSize)}`;
      setLocalError(errorMsg);
      onChange(null);
      return;
    }

    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    const acceptedArray = acceptedFormats.split(",");

    if (!acceptedArray.includes(fileExtension)) {
      const errorMsg = `Invalid file type. Accepted formats: ${acceptedFormats}`;
      setLocalError(errorMsg);
      onChange(null);
      return;
    }

    setLocalError("");
    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setLocalError("");
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const displayError = error || localError;

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
        >
          {label}
        </Typography>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        onBlur={onBlur}
        accept={acceptedFormats}
        style={{ display: "none" }}
      />

      {!selectedFile ? (
        <Paper
          onClick={handleBoxClick}
          sx={{
            p: 4,
            border: `2px dashed ${displayError ? theme.palette.error.main : theme.palette.divider}`,
            borderRadius: 2,
            bgcolor: displayError ? "error.lighter" : "background.paper",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: displayError ? theme.palette.error.dark : theme.palette.primary.main,
              bgcolor: displayError ? "error.lighter" : "action.hover",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                bgcolor: displayError ? "error.light" : "primary.light",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloudUploadIcon
                sx={{
                  fontSize: 32,
                  color: displayError ? "error.main" : "primary.main",
                }}
              />
            </Box>

            <Box textAlign="center">
              <Typography variant="body1" fontWeight={600} gutterBottom>
                {tag || "Click to upload file"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {caption || "Select a file from your computer"}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Browse Files
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper
          sx={{
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {preview ? (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
            ) : (
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  bgcolor: "action.hover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {getFileIcon(selectedFile.type)}
              </Box>
            )}

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                noWrap
                sx={{ mb: 0.5 }}
              >
                {selectedFile.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(selectedFile.size)}
              </Typography>
            </Box>

            <IconButton
              onClick={handleRemoveFile}
              size="small"
              sx={{
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.lighter",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      )}

      {displayError && (
        <Typography
          variant="caption"
          color="error"
          sx={{ mt: 1, display: "block" }}
        >
          {displayError}
        </Typography>
      )}
    </Box>
  );
}