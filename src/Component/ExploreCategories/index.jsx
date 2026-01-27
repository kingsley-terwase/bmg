import React from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Pagination,
    useTheme,
    useMediaQuery
} from '@mui/material';

import {
    ChevronRight20Regular,
    Briefcase20Filled,
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { encodeServiceId, resolveAwsImage } from '../../utils/functions';


export default function ServiceCategoryExplorer({ categories, page, setPage, totalPages }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: 6,
                background: theme.palette.background.default
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, textAlign: "center" }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Explore Category
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500
                        }}
                    >
                        Popular services people are buying right now!
                    </Typography>
                </Box>

                {/* GRID */}
                <Grid container spacing={3}>
                    {categories.map((category) => {
                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={category.id}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        borderRadius: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: theme.palette.background.paper,
                                        transition: "all 0.3s ease",
                                        boxShadow: theme.shadows[3],
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: theme.shadows[10]
                                        }
                                    }}
                                >
                                    {/* IMAGE HEADER */}
                                    <Box
                                        sx={{
                                            position: "relative",
                                            height: 180,
                                            backgroundImage: `url(${resolveAwsImage(category?.image)})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            borderTopLeftRadius: 12,
                                            borderTopRightRadius: 12
                                        }}
                                    >
                                        {/* ICON */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 16,
                                                right: 16,
                                                width: 48,
                                                height: 48,
                                                borderRadius: "50%",
                                                backgroundColor: theme.palette.background.paper,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                boxShadow: theme.shadows[4]
                                            }}
                                        >
                                            <Briefcase20Filled style={{ fontSize: 24, color: theme.palette.primary.main }} />
                                        </Box>
                                    </Box>

                                    {/* CONTENT */}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1,
                                                color: theme.palette.text.primary
                                            }}
                                        >
                                            {category.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                mb: 2,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: category?.description
                                            }}
                                        />

                                        <Button
                                            variant="contained"
                                            fullWidth
                                            onClick={() => navigate(`/category/${encodeServiceId(category.id)}/${category?.name}`)}
                                            endIcon={<ChevronRight20Regular />}
                                            sx={{
                                                py: 1.4,
                                                fontWeight: 600,
                                                textTransform: "none",
                                                borderRadius: 2,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                                "&:hover": {
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.bg}, ${theme.palette.primary.main})`
                                                }
                                            }}
                                        >
                                            Explore Services
                                        </Button>
                                    </CardContent>

                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(e, val) => setPage(val)}
                            size={isMobile ? "medium" : "large"}
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    fontWeight: 600,
                                    "&.Mui-selected": {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                        color: theme.palette.primary.contrastText
                                    }
                                }
                            }}
                        />
                    </Box>
                )}

            </Container>
        </Box>
    );
}