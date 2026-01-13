import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import {
    BreadcrumbBar,
    LogoTypeSelector,
    AIServicesShowcase,
    ConsultantForm,
    ServicesGrid,
    BlogSection,
    HeroMarketingSection,
    FAQSection,
    CategoryTabs,
    Gallery,
    ServiceOutline,
    TestimonialsSection,
    ServiceDetailSlider,
} from '../../../Component';

import {
    Cube24Regular,
    Home24Regular,
    ShapeSubtract24Regular,
    TextCaseTitle24Regular,
    TextItalic24Regular,    
} from '@fluentui/react-icons';

import { ServicesData } from '../Services/data';

const ServiceDetailPage = () => {
    const { title } = useParams();
    const decodedTitle = decodeURIComponent(title);
    const [selectedType, setSelectedType] = useState("modern");

    return (
        <Box sx={{ pt: 8 }}>

            <CategoryTabs />

            <BreadcrumbBar
                breadcrumbs={[
                    { label: "Home", href: "/", icon: <Home24Regular /> },
                    { label: "Category", href: "#" },
                    { label: decodedTitle, href: "#" },
                ]}
                suggestions={[
                    "AI Logo Maker",
                    "Video Editing",
                    "Website Development",
                    "Branding",
                ]}
                onSearch={(value) => console.log("Search Input:", value)}
            />

            <LogoTypeSelector
                label="Logo Type"
                options={[
                    { value: "modern", label: "Modern", icon: <ShapeSubtract24Regular /> },
                    { value: "3d", label: "3D", icon: <Cube24Regular /> },
                    { value: "script", label: "Script", icon: <TextItalic24Regular /> },
                    { value: "basic", label: "Basic", icon: <TextCaseTitle24Regular /> },
                ]}
                value={selectedType}
                onChange={setSelectedType}
            />

            <HeroMarketingSection />
            <ServiceDetailSlider />
            <Gallery />
            <ServiceOutline />
            <TestimonialsSection />
            <ServicesGrid data={ServicesData} />

            <ConsultantForm />
            <FAQSection />

        </Box>
    );
};

export default ServiceDetailPage;
