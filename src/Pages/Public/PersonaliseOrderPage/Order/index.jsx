import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useState } from "react";
import styles, { buttonStyles } from "./style";
import FilePicker from "./FilePicker";
import { useNavigate, useParams } from "react-router-dom";
import { convertFileToBase64, decodeServiceId, deslugify, resolveAwsImage } from "../../../../utils/functions";
import { useGetService, calculateServicePrice } from "../../../../Hooks/services";
import { useUserContext } from "../../../../Contexts";
import useCheckout from "../../../../Hooks/cart";
import { toast } from "react-toastify";

export default function Order() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id: hashedId, serviceTypeId: sTypeID, serviceName } = useParams();
  const serviceId = decodeServiceId(hashedId);
  const serviceTypeId = decodeServiceId(sTypeID);
  const { service, loading: serviceLoading } = useGetService(serviceId);
  const { initiateCheckout, loading: checkoutLoading } = useCheckout();
  const { user } = useUserContext();

  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!description.trim()) {
      newErrors.description = "Please describe your order";
    } else if (description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (file) => {
    setAttachment(file);
    if (errors.attachment) {
      setErrors({ ...errors, attachment: "" });
    }
  };

  const handleDescriptionBlur = () => {
    if (description.trim() && description.trim().length < 20) {
      setErrors({ ...errors, description: "Description must be at least 20 characters" });
    }
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!user?.user) {
      navigate("/login", {
        state: {
          from: location.pathname,
          returnTo: `/order/personalise/${hashedId}/${serviceName}`,
        },
      });
      return;
    }

    if (!service) {
      toast.error("Service information not available");
      return;
    }

    // Convert file to base64 if attachment exists
    let attachmentData = null;
    if (attachment) {
      try {
        attachmentData = await convertFileToBase64(attachment);
      } catch (error) {
        toast.error("Failed to process attachment");
        console.error("File conversion error:", error);
        return;
      }
    }

    const serviceType = service.service_types?.find(st => st.id === Number(serviceTypeId)) || {
      id: service.id,
      service_type_name: "Custom Order",
      description: "",
      service_type_image: null,
    };

    const priceData = calculateServicePrice(service, 0);

    const cartItem = {
      id: `${service.id}-${serviceType.id}-${Date.now()}`,
      service_id: service.id,
      service_type_id: serviceType.id,
      name: service.service_name,
      service_type_name: serviceType.service_type_name,
      description: serviceType.description || "Custom Order",
      image: resolveAwsImage(serviceType.service_type_image),
      originalPrice: priceData.originalPrice,
      finalPrice: priceData.finalPrice,
      discountAmount: priceData.discountAmount,
      hasDiscount: priceData.hasDiscount,
      quantity: 1,
      requirements: {
        description: description.trim(),
        attachment: attachmentData, // Now includes base64, fileName, fileType, fileSize
      },
      service_data: service,
    };

    const cartItems = [cartItem];
    const couponCode = null;
    const giftCardCode = null;

    const result = await initiateCheckout(cartItems, couponCode, giftCardCode);

    if (!result.success) {
      toast.error(result.error || "Checkout failed");
      if (result.validationErrors) {
        console.error("Validation errors:", result.validationErrors);
      }
    }
  };

  if (serviceLoading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!service) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">
            Service not found. Please try again or contact support.
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={styles}>
        <Box className="header">
          <Typography className="title">{deslugify(serviceName)}</Typography>
          <Typography className="description">
            What kind of {deslugify(serviceName).toLowerCase()} do you want? Describe your project in
            detail. The more information you provide, the better we can understand your vision.
          </Typography>
        </Box>

        <Box className="content">
          <FilePicker
            error={errors.attachment}
            onChange={handleFileChange}
            onBlur={() => { }}
            tag="Upload your order file here (optional)"
            caption="JPG, PNG, PDF, MP3 and MP4 formats, at most 5MB"
            label="Attachment"
          />

          <TextField
            variant="filled"
            fullWidth
            multiline
            minRows={8}
            placeholder="Describe your order in detail... (minimum 20 characters)"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors({ ...errors, description: "" });
              }
            }}
            onBlur={handleDescriptionBlur}
            error={!!errors.description}
            helperText={errors.description}
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "white !important",
                border: `1px solid ${errors.description ? theme.palette.error.main : theme.palette.divider}`,
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
            onClick={handleCheckout}
            disabled={checkoutLoading}
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
            {checkoutLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Order Now"
            )}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}