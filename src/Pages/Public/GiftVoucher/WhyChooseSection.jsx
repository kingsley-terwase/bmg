import React from 'react';
import { Container, Grid, Typography, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CheckmarkCircleFilled } from '@fluentui/react-icons';

const features = [
    'Valid for all BMG services and tools',
    'Never expires - use whenever ready',
    'Instant delivery via email',
    'Fully transferable to anyone',
    'Custom amounts available',
    'Multiple design themes',
];

const WhyChooseSection = () => {
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}>
                Why Choose BMG Gift Vouchers?
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary', mb: 6 }}>
                The perfect way to empower entrepreneurs and support their business dreams
            </Typography>

            <Grid container spacing={2}>
                {features.map((feature, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <Card sx={{
                            height: '100%',
                            p: 5,
                            textAlign: 'center',
                            border: '2px solid',
                            borderColor: 'divider',
                            boxShadow: 'none'
                        }}>
                            <CheckmarkCircleFilled style={{ color: theme.palette.primary.main, fontSize: '2.5rem' }} />
                            <Typography variant="body1" sx={{ mt: 2, fontWeight: 500 }}>
                                {feature}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default WhyChooseSection;