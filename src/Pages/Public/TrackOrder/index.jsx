import React from 'react'
import { Box } from '@mui/material'
import { BreadcrumbBar, OrderTracker, } from '../../../Component'
import { Home24Regular } from '@fluentui/react-icons'
import { useParams } from 'react-router-dom'
import { decodeServiceId } from '../../../utils/functions'
import { useGetService } from '../../../Hooks/services'
import ScrollToTop from '../../../Component/ScrollToTop'
import BrandLoader from '../../../Component/BrandLoader'

const ProcessOrderPage = () => {
    const { id: hashedId, serviceName, serviceTypeId } = useParams();
    const serviceId = decodeServiceId(hashedId);
    const service_type_id = decodeServiceId(serviceTypeId);

    // Use the existing hook with decoded ID
    const { service, loading } = useGetService(serviceId);

    return (
        <>
            <ScrollToTop />
            <Box sx={{ pt: 8 }}>
                <BreadcrumbBar
                    breadcrumbs={[
                        { label: "Home", href: "/", icon: <Home24Regular /> },
                        { label: serviceName, href: "#" },
                        { label: "Process Order", href: "#" },
                    ]}
                    suggestions={[
                        "AI Logo Maker",
                        "Video Editing",
                        "Website Development",
                        "Branding",
                    ]}
                    onSearch={(value) => console.log("Search Input:", value)}
                />
                {loading ? <BrandLoader /> : <OrderTracker service={service} service_type_id={service_type_id} />}
            </Box>
        </>
    )
}

export default ProcessOrderPage
