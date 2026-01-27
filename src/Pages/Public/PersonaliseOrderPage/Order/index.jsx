import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import styles, { buttonStyles } from "./style";
import FilePicker from "./FilePicker";

export default function Order() {
  const theme = useTheme();

  return (
    <Container>
      <Box sx={styles}>
        <Box className="header">
          <Typography className="title">Prescribe Below</Typography>
          <Typography className="description">
            What kind of website do you want to create? Describe your project in
            detail. The more information you provide, the better the AI can
            understand your vision.
          </Typography>
        </Box>
        <Box className="content">
          <FilePicker
            error={null}
            // onChange={handleResourceChange}
            // onBlur={handleResourceBlur}
            tag="Upload your order file here"
            caption="JPG, PNG, PDF, MP3 and MP4 formats, at most 5MB"
            label="File"
          />
          <TextField
            variant="filled"
            fullWidth
            multiline
            minRows={8}
            placeholder="Describe your order..."
            value=""
            onChange={(e) => console.log(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "white !important",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "12px",
                padding: "16px !important",
              },
              "& .MuiFilledInput-underline::before": {
                display: "none !important",
              },
              "& .Mui-focused.MuiFilledInput-underline::after": {
                display: "none !important",
              },
              "& textarea": {
                fontSize: "14px",
                color: "text.primary",
              },
            }}
          />
        </Box>
        <Stack alignItems="center">
          <Button
            variant="contained"
            sx={[
              buttonStyles,
              {
                bgcolor: theme.palette.primary.main,
                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.light,
                  boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                },
              },
            ]}
          >
            Order Now
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
