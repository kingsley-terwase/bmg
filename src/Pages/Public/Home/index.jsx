import React from 'react'
import { AIServicesSection, AIServicesShowcase, BlogSection, CategoriesSection, ConsultantForm, FAQSection, HeroMarketingSection, HowBMGWorks, PortfolioMarquee, ServiceSlider, TestimonialsSection, TrendingService } from '../../../Component'

const HomePage = () => {
  return (
    <>
      <HowBMGWorks />
      <CategoriesSection />
      <ServiceSlider />
      <AIServicesSection />
      <HeroMarketingSection />
      <TrendingService />
      <ConsultantForm />
      <PortfolioMarquee />
      <BlogSection />
      <AIServicesShowcase />
      <TestimonialsSection />
      <FAQSection />
    </>
  )
}

export default HomePage
