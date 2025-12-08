import { Chip } from "@mui/material";

const StatusChip = ({ label, status }) => {
  const colors = {
    pending: { bg: "#FFC107", color: "#000" },
    completed: { bg: "#4CAF50", color: "#fff" },
    cancelled: { bg: "#F44336", color: "#fff" },
        inactive: { bg: "#FFC107", color: "#000" },
    active: { bg: "#4CAF50", color: "#fff" },

  };

  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: colors[status].bg,
        color: colors[status].color,
        borderRadius: 1.5,
        fontSize: "0.75rem",
        fontWeight: 600,
        px: 1
      }}
    />
  );
};

export default StatusChip;
