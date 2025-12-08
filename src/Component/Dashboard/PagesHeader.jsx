import { Box, Typography, TextField, Stack } from "@mui/material";
import { lightModeColors } from "../../Config/color";
import CustomButton from "./CustomButton";

const PagesHeader = ({
  label = "Overview",
  desc = "",
  color = lightModeColors.warning.dark,
  enableSearch = false,
  searchValue = "",
  onSearchChange = () => {},
  actions = [],
  placeholder = "Search..."
}) => {
  return (
    <Box sx={{ mt: 2, mb: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 2
        }}
      >
        {/* Left side - Title and description */}
        <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 33 }}>
            {label}
          </Typography>

          <Box
            sx={{
              mb: 1.5,
              width: 50,
              borderRadius: 6,
              borderBottom: "4px solid",
              borderColor: color
            }}
          />

          {desc && (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 14,
                fontFamily: "Comfortaa",
                my: 2
              }}
            >
              {desc}
            </Typography>
          )}
        </Box>

        {/* Right side - Action buttons and search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
            flexShrink: 0
          }}
        >
          <Stack direction={"row"} gap={2}>
            {actions.slice(0, 3).map((btn, i) => (
              <CustomButton
                title={btn.label}
                key={i}
                variant="filled"
                color="primary"
                startIcon={btn.icon}
                onClick={btn.onClick}
                href={btn.href}
                sx={{
                  textTransform: "none",
                  px: 2
                }}
              />
            ))}
          </Stack>

          {enableSearch && (
            <TextField
              size="small"
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{ width: 300 }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PagesHeader;
