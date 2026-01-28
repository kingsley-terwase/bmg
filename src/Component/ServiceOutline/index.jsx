import { Box, Grid, Typography } from "@mui/material";

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
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
