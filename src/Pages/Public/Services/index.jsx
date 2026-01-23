import React from 'react'
import { Box } from '@mui/material'
import { BreadcrumbBar, AIServicesShowcase, ConsultantForm, CategoryBanner, ServicesGrid, BlogSection, HeroMarketingSection, FAQSection, CategoryTabs, CategoryServices, } from '../../../Component'
import { Home24Regular } from '@fluentui/react-icons'

const ServicesPage = () => {
    return (
        <>
            <Box sx={{ pt: 8 }}>
                <CategoryTabs />
                <BreadcrumbBar
                    breadcrumbs={[
                        { label: "Home", href: "/", icon: <Home24Regular /> },
                        { label: "Services", href: "#" },
                    ]}
                    suggestions={[
                        "AI Logo Maker",
                        "Video Editing",
                        "Website Development",
                        "Branding",
                    ]}
                    onSearch={(value) => console.log("Search Input:", value)}
                />
                <CategoryBanner title='All Services' subtitle='Popular picks, proven results' />
                <ServicesGrid />
                <ConsultantForm />
                <AIServicesShowcase />
                <BlogSection />
                <HeroMarketingSection />
                <FAQSection />
            </Box>
        </>
    )
}

export default ServicesPage
