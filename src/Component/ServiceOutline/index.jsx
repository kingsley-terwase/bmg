import { Box, Grid, Typography } from "@mui/material";
import { CheckmarkCircle24Regular } from "@fluentui/react-icons";

/* const checkItem = (text) => (
    <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
        <CheckmarkCircle24Regular
            style={{ color: "#fff", marginRight: 8, marginTop: 2 }}
        />
        <Typography sx={{ color: "#fff", fontSize: 14 }}>{text}</Typography>
    </Box>
); */

export default function ServiceOutline({ service }) {
    return (
        <Box sx={{ p: 6, maxWidth: "1200px", mx: "auto" }}>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }} >
                    <Typography
                        dangerouslySetInnerHTML={{
                            __html: service?.service_details_1
                        }}
                    />
                    {/* <Typography fontSize={22} fontWeight={700} mb={2}>
                        Service Details
                    </Typography>

                    <Typography fontWeight={700} mb={1}>
                        What You Will Get
                    </Typography>

                    <Typography fontSize={14} mb={2} lineHeight={1.7}>
                        Custom & Engaging Website UI/UX tailored to your brand
                        <br />
                        High-Converting Landing Page Designs
                        <br />
                        Fully Responsive Designs (Desktop & Mobile)
                        <br />
                        Compatible with WordPress, Webflow, Shopify & Custom Development
                        <br />
                        Developer-Ready Figma Source Files
                        <br />
                        Free Consultation to Perfect Your Design
                        <br />
                        24/7 Support & Communication
                    </Typography>

                    <Typography fontWeight={700} mb={1}>
                        What’s Not Included:
                    </Typography>

                    <Typography fontSize={14} lineHeight={1.7}>
                        Content Creation (Text, Animations)
                    </Typography> */}
                </Grid>

                <Grid size={{ xs: 12, md: 6, }}>
                    <Box
                        sx={{
                            background: "#233c98",
                            p: 3,
                            borderRadius: "16px",
                            color: "#fff",
                        }}
                    >
                        <Typography
                            dangerouslySetInnerHTML={{
                                __html: service?.service_details_2
                            }}
                        />
                        {/* <Typography fontSize={20} fontWeight={700} mb={1}>
                            Why you need a logo
                        </Typography>

                        <Typography fontSize={15} mb={2}>
                            Here’s why a luxury minimalist logo is the perfect
                            <br />
                            choice for your brand:
                        </Typography>

                        {checkItem(
                            "Timeless Appeal: Minimalist designs are classic and never go out of style."
                        )}
                        {checkItem(
                            "Versatility: A simple yet elegant logo can be used across all branding materials seamlessly."
                        )}
                        {checkItem(
                            "Sophistication: Minimalist logos convey a sense of luxury and exclusivity."
                        )}
                        {checkItem(
                            "Brand Recognition: Clean and simple designs are easily recognizable and memorable."
                        )}
                        {checkItem(
                            "Professionalism: A well-designed minimalist logo reflects a high level of professionalism."
                        )} */}
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, }}>
                    <Box
                        sx={{
                            background: "#f5a534",
                            p: 3,
                            borderRadius: "16px",
                            color: "#fff",
                        }}
                    >
                        <Typography
                            dangerouslySetInnerHTML={{
                                __html: service?.service_details_3
                            }}
                        />
                        {/* <Typography fontSize={18} fontWeight={700} mb={2}>
                            Here’s why a luxury minimalist logo is the perfect choice for your brand:
                        </Typography>

                        {[
                            "Timeless Appeal: Minimalist designs are classic and never go out of style.",
                            "Versatility: A simple yet elegant logo can be used across all branding materials seamlessly.",
                            "Sophistication: Minimalist logos convey a sense of luxury and exclusivity.",
                            "Brand Recognition: Clean and simple designs are easily recognizable and memorable.",
                            "Professionalism: A well-designed minimalist logo reflects a high level of professionalism."
                        ].map((text, i) => (
                            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                                <CheckmarkCircle24Regular
                                    style={{ color: "#fff", marginRight: 8, marginTop: 2 }}
                                />
                                <Typography sx={{ color: "#fff", fontSize: 14 }}>{text}</Typography>
                            </Box>
                        ))} */}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
