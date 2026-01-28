// Details.jsx - Update to accept and display the transaction data
import { Box, Stack, Typography, Divider } from "@mui/material";

export default function Details({ paystackData }) {
  // Format amount from kobo to Naira
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount / 100);
  };

  // Format date without external package
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    return date.toLocaleString('en-US', options);
  };

  return (
    <Stack gap="16px">
      {/* Amount */}
      <Box>
        <Typography variant="h4" fontWeight="600" textAlign="center">
          {formatAmount(paystackData.amount)}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Payment Successful
        </Typography>
      </Box>

      <Divider />

      {/* Transaction Details */}
      <Stack gap="12px">
        <DetailRow
          label="Order Number"
          value={paystackData.metadata.order_number}
        />
        <DetailRow
          label="Transaction Reference"
          value={paystackData.reference}
        />
        <DetailRow
          label="Payment Method"
          value={`${paystackData.authorization.card_type.toUpperCase()} •••• ${paystackData.authorization.last4}`}
        />
        <DetailRow
          label="Transaction Fee"
          value={formatAmount(paystackData.fees)}
        />
        <DetailRow
          label="Date & Time"
          value={formatDate(paystackData.paid_at)}
        />
        <DetailRow
          label="Status"
          value={paystackData.status}
          valueColor="success.main"
        />
      </Stack>
    </Stack>
  );
}

function DetailRow({ label, value, valueColor = "text.primary" }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight="500"
        color={valueColor}
        sx={{ textTransform: valueColor === "success.main" ? "capitalize" : "none" }}
      >
        {value}
      </Typography>
    </Stack>
  );
}