import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';


const StatsSection = () => {
    const theme = useTheme();

    return (<Box
        sx={{
            bgcolor: theme.palette.background.paper,
            py: 8,
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }}
    >
        <Container maxWidth="lg">
            <Grid container spacing={4} sx={{ textAlign: 'center' }}>
                {[
                    { number: '500+', label: 'Projects Completed' },
                    { number: '50K+', label: 'Happy Clients' },
                    { number: '98%', label: 'Satisfaction Rate' },
                    { number: '24/7', label: 'Support Available' },
                ].map((stat, index) => (
                    <Grid size={{ xs: 6, md: 3 }} key={index}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                color: theme.palette.primary.main,
                                mb: 1,
                            }}
                        >
                            {stat.number}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                            }}
                        >
                            {stat.label}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>)
}

export default StatsSection;