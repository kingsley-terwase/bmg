import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  AIServicesShowcase,
  FAQSection,
  BlogSection,
  BreadcrumbBar,
  CategoryBanner,
  CategoryTabs,
  ConsultantForm,
  ServiceCategoryExplorer
} from '../../../Component';
import { Home24Regular } from '@fluentui/react-icons';
import { useGetAllFAQ, useGetCategories } from '../../../Hooks/general';
import BrandLoader from '../../../Component/BrandLoader';
import ScrollToTop from '../../../Component/ScrollToTop';

const CategoriesPage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const { loading, data: categories, total } = useGetCategories(page, itemsPerPage);
  const totalPages = Math.ceil(total / itemsPerPage);

  const { data: faqs, loading: faqLoading } = useGetAllFAQ()

  return (
    loading ? <BrandLoader /> :
      <Box sx={{ pt: 8 }}>
        <ScrollToTop />
        <CategoryTabs />
        <BreadcrumbBar
          breadcrumbs={[
            { label: "Home", href: "/", icon: <Home24Regular /> },
            { label: "Categories", href: "#" },
          ]}
          suggestions={[
            "AI Logo Maker",
            "Video Editing",
            "Website Development",
            "Branding",
          ]}
          onSearch={(value) => console.log("Search Input:", value)}
        />
        <CategoryBanner
          title='Explore Our Categories'
          subtitle='Popular picks, proven results'
        />
        <ServiceCategoryExplorer
          categories={categories}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
        <ConsultantForm />
        <AIServicesShowcase />
        <BlogSection />
        <FAQSection data={faqs} loading={faqLoading} />
      </Box>
  );
};

export default CategoriesPage;