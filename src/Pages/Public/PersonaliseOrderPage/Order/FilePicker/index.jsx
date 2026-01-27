import { CloudArrowUpFilled } from "@fluentui/react-icons";
import { FormHelperText, Stack, Typography, useTheme } from "@mui/material";
import { useRef } from "react";

export default function FilePicker({
  error,
  onChange,
  onBlur = () => null,
  tag = "Choose document to upload",
  caption = "Please click to select a file",
}) {
  const theme = useTheme();
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleBlur = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onBlur(file);
    }
  };

  return (
    <Stack gap="10px">
      <Stack
        component="label"
        alignItems="center"
        justifyContent="center"
        border={error ? "1px dashed red" : `1px solid ${theme.palette.divider}`}
        bgcolor={error ? "#ff000048" : "#ffffff"}
        py="32px"
        overflow="hidden"
        gap="6px"
        sx={{ cursor: "pointer" }}
        borderRadius="16px"
      >
        <CloudArrowUpFilled
          fontSize={42}
          color={error ? "red" : theme.palette.primary.main}
        />
        <Stack alignItems="center" gap="4px">
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ userSelect: "none" }}
          >
            {tag}
          </Typography>
          <Typography
            variant="body2"
            color="rgb(125, 150, 150)"
            sx={{ userSelect: "none" }}
          >
            {caption}
          </Typography>

          {error && (
            <Typography variant="body2" color="red" sx={{ userSelect: "none" }}>
              {error}
            </Typography>
          )}
        </Stack>
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Stack>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Stack>
  );
}
