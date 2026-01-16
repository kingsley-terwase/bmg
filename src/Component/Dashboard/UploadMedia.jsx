/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Stack,
  Input,
  Button,
} from "@mui/material";
import {
  CloudUploadOutlined,
  CloseOutlined,
  InsertDriveFileOutlined,
} from "@mui/icons-material";

const UploadMedia = ({
  mode = "single",
  maxFiles = 5,
  maxSize = 10, // in MB
  acceptedFormats = ["jpg", "png", "jpeg", "svg", "zip"],
  onFilesChange,
  title = "Media Upload",
  description = "Add your documents here, and you can upload up to 5 files max",
  initialImage = null, // New prop for existing image
}) => {
  const [files, setFiles] = useState([]);
  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Set initial image if provided
  useEffect(() => {
    if (initialImage && files.length === 0) {
      const isUrl =
        typeof initialImage === "string" && initialImage.startsWith("http");
      const isBase64 =
        typeof initialImage === "string" && initialImage.startsWith("data:");

      if (isUrl || isBase64) {
        setFiles([
          {
            name: "Existing Image",
            size: 0,
            type: isUrl ? "url" : "base64",
            url: initialImage,
            preview: initialImage,
          },
        ]);
      }
    }
  }, [initialImage]);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const emitChange = async (updatedFiles) => {
    if (!onFilesChange) return;

    if (mode === "single") {
      // For single mode, return just the base64 string or URL string
      if (updatedFiles.length > 0) {
        const file = updatedFiles[0];
        if (file.type === "url" || file.type === "base64") {
          onFilesChange(file.url || file.preview);
        } else {
          const base64String = await convertFileToBase64(file);
          onFilesChange(base64String);
        }
      } else {
        onFilesChange("");
      }
    } else {
      // For multiple mode, return array of base64 strings
      const fileStrings = await Promise.all(
        updatedFiles.map(async (file) => {
          if (file.type === "url" || file.type === "base64") {
            return file.url || file.preview;
          } else {
            return await convertFileToBase64(file);
          }
        })
      );
      onFilesChange(fileStrings);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "N/A";
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

    if (mode === "single" && validFiles.length > 1) {
      alert("Only one file is allowed");
      return;
    }

    const updatedFiles =
      mode === "single" ? validFiles.slice(0, 1) : [...files, ...validFiles];

    if (updatedFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }

    setFiles(updatedFiles);
    emitChange(updatedFiles);
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
    if (!urlInput.trim()) return;

    const urlFile = {
      name: urlInput.split("/").pop() || "url-file",
      size: 0,
      type: "url",
      url: urlInput,
      preview: urlInput,
    };

    const updatedFiles = mode === "single" ? [urlFile] : [...files, urlFile];

    setFiles(updatedFiles);
    emitChange(updatedFiles);
    setUrlInput("");
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    emitChange(updatedFiles);
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const isImageFile = (file) => {
    const imageFormats = ["jpg", "jpeg", "png", "svg", "gif", "webp"];
    if (file.type === "url" || file.type === "base64") {
      return true;
    }
    const extension = file.name.split(".").pop().toLowerCase();
    return imageFormats.includes(extension);
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 3,
        bgcolor: "white",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {description}
          </Typography>
        </Box>
      </Stack>

      {/* Image Preview Section - Show if file exists and is an image */}
      {files.length > 0 && files.some(isImageFile) && (
        <Box mb={3}>
          {files.filter(isImageFile).map((file, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                border: "2px solid #e0e0e0",
                borderRadius: 2,
                overflow: "hidden",
                mb: 2,
              }}
            >
              <img
                src={file.preview || file.url || URL.createObjectURL(file)}
                alt={file.name}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "300px",
                  objectFit: "contain",
                  backgroundColor: "#f5f5f5",
                }}
              />
              <IconButton
                size="small"
                onClick={() => removeFile(index)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseOutlined fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

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
          transition: "all 0.3s",
        }}
        onClick={onButtonClick}
      >
        <CloudUploadOutlined sx={{ fontSize: 48, color: "#2196f3", mb: 2 }} />
        <Typography variant="body1" mb={1}>
          Drag your file(s) or{" "}
          <Typography
            component="span"
            sx={{
              color: "#2196f3",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            browse
          </Typography>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Maximum file size allowed {maxSize}MB
        </Typography>
        <input
          ref={fileInputRef}
          type="file"
          multiple={mode === "multiple"}
          onChange={handleChange}
          style={{ display: "none" }}
          accept={acceptedFormats.map((f) => `.${f}`).join(",")}
        />
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        my={2}
      >
        Only support .{acceptedFormats.join(", .")} files
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
              fontSize: "14px",
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

      {/* Uploaded Files List - Non-image files */}
      {files.length > 0 && files.some((f) => !isImageFile(f)) && (
        <Box mt={3}>
          {files
            .filter((f) => !isImageFile(f))
            .map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  mb: 1,
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
