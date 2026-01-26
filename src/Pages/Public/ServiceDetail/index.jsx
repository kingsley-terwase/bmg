import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

import {
    BreadcrumbBar,
    LogoTypeSelector,
    ConsultantForm,
    ServicesGrid,
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
    Video24Regular, // Added this import
} from '@fluentui/react-icons';

import { ServicesData } from '../Services/data';
import { decodeServiceId } from '../../../utils/functions';
import { useGetService } from '../../../Hooks/services';

const ServiceDetailPage = () => {
    const { id: hashedId, serviceName } = useParams();
    const serviceId = decodeServiceId(hashedId);
    const { service, loading, error } = useGetService(serviceId);
    const serviceTypes = service?.service_types || [];

    const [selectedServiceType, setSelectedServiceType] = useState('');

    const serviceTypeOptions = serviceTypes.map(serviceType => ({
        value: serviceType.id.toString(),
        label: serviceType.service_type_name,
        icon: <Cube24Regular />
    }));

    return (
        <Box sx={{ pt: 8 }}>
            <CategoryTabs />
            <BreadcrumbBar
                breadcrumbs={[
                    { label: "Home", href: "/", icon: <Home24Regular /> },
                    { label: "Category", href: "#" },
                    { label: serviceName, href: "#" },
                ]}
                suggestions={[
                    "AI Logo Maker",
                    "Video Editing",
                    "Website Development",
                    "Branding",
                ]}
                onSearch={(value) => console.log("Search Input:", value)}
            />

            {serviceTypes.length > 0 && (
                <LogoTypeSelector
                    label="Service Types"
                    options={serviceTypeOptions}
                    value={selectedServiceType}
                    onChange={setSelectedServiceType}
                />
            )}
            {console.log("service:", service)}
            <ServiceDetailSlider service={service} loading={loading} error={error} hashedId={hashedId} />
            <ServiceOutline service={service} />
            <Gallery />
            <TestimonialsSection />
            <ServicesGrid data={ServicesData} />

            <ConsultantForm />
            <FAQSection />

        </Box>
    );
};

export default ServiceDetailPage;