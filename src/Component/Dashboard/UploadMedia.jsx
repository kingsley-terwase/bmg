import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Stack,
  Input,
  Button
} from "@mui/material";
import {
  CloudUploadOutlined,
  CloseOutlined,
  InsertDriveFileOutlined
} from "@mui/icons-material";

const UploadMedia = ({
  maxFiles = 5,
  maxSize = 10, // in MB
  acceptedFormats = ["jpg", "png", "jpeg", "svg", "zip"],
  onFilesChange,
  title = "Media Upload",
  description = "Add your documents here, and you can upload up to 5 files max"
}) => {
  const [files, setFiles] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    return `${(bytes / 1024).toFixed(0)}kb`;
  };

  const isValidFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    return acceptedFormats.includes(extension);
  };

  const isValidFileSize = (size) => {
    return size <= maxSize * 1024 * 1024;
  };

  const handleFiles = (newFiles) => {
    const validFiles = Array.from(newFiles).filter((file) => {
      if (!isValidFileType(file.name)) {
        alert(`File type not supported: ${file.name}`);
        return false;
      }
      if (!isValidFileSize(file.size)) {
        alert(`File too large: ${file.name}. Max size is ${maxSize}MB`);
        return false;
      }
      return true;
    });

    if (files.length + validFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleUrlUpload = () => {
    if (urlInput.trim()) {
      // Create a mock file object for URL
      const urlFile = {
        name: urlInput.split("/").pop() || "url-file",
        size: 0,
        type: "url",
        url: urlInput
      };
      
      const updatedFiles = [...files, urlFile];
      setFiles(updatedFiles);
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
      setUrlInput("");
    }
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 3,
        bgcolor: "white"
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {description}
          </Typography>
        </Box>
        <IconButton size="small">
          <CloseOutlined />
        </IconButton>
      </Stack>

      {/* Drag and Drop Area */}
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed #d0d0d0",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          bgcolor: dragActive ? "#f5f5f5" : "transparent",
          cursor: "pointer",
          transition: "all 0.3s"
        }}
        onClick={onButtonClick}
      >
        <CloudUploadOutlined sx={{ fontSize: 48, color: "#2196f3", mb: 2 }} />
        <Typography variant="body1" mb={1}>
          Drag your file(s) or{" "}
          <Typography
            component="span"
            sx={{ color: "#2196f3", cursor: "pointer", textDecoration: "underline" }}
          >
            browse
          </Typography>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Max {maxSize}MB files are allowed
        </Typography>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleChange}
          style={{ display: "none" }}
          accept={acceptedFormats.map((f) => `.${f}`).join(",")}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" textAlign="center" my={2}>
        Only support .{acceptedFormats.join(", .")} and .zip files
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Typography variant="body2" sx={{ minWidth: "fit-content" }}>
          OR
        </Typography>
        <Box sx={{ flex: 1, height: "1px", bgcolor: "#e0e0e0" }} />
      </Box>

      {/* Upload from URL */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} mb={1}>
          Upload from URL
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Input
            disableUnderline
            fullWidth
            placeholder="Add file URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              px: 2,
              py: 1,
              fontSize: "14px"
            }}
          />
          <Button
            variant="contained"
            onClick={handleUrlUpload}
            sx={{ textTransform: "none", px: 3 }}
          >
            Upload
          </Button>
        </Box>
      </Box>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <Box mt={3}>
          {files.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                mb: 1
              }}
            >
              <InsertDriveFileOutlined sx={{ color: "#ff9800" }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight={500}>
                  {file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {file.type === "url" ? "URL" : formatFileSize(file.size)}
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => removeFile(index)}>
                <CloseOutlined fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UploadMedia;