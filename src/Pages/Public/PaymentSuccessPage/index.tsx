// PaymentSuccessPage.jsx
import { Box, Button, Stack, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./style";
import Header from "./Header";
import Details from "./Details";

export default function PaymentSuccessPage() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Get transaction data from navigation state
  const { transaction, paystackData } = location.state || {};

  // If no data, redirect back
  if (!transaction || !paystackData) {
    navigate("/");
    return null;
  }

  const handleDownloadReceipt = () => {
    // Implement receipt download logic
    console.log("Downloading receipt for transaction:", transaction.id);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Box sx={styles.wrap}>
      <Stack gap="8px" alignItems="center">
        <Box component="img" src="/Logo/Logo.png" height="36px" />
      </Stack>
      <Box
        sx={[
          styles.card,
          {
            border: `1px solid ${theme.palette.divider}`,
          },
        ]}
      >
        <Header />
        <Details paystackData={paystackData} />
        <Stack gap="8px">
          <Button
            variant="contained"
            onClick={handleDownloadReceipt}
            sx={[
              styles.button,
              {
                backgroundColor: "#000000",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#202020",
                },
              },
            ]}
          >
            Download Receipt
          </Button>
          <Button
            variant="contained"
            onClick={handleGoBack}
            sx={[
              styles.button,
              {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.07)",
                color: "#606060",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                },
              },
            ]}
          >
            Go Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
