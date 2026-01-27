import { Routes, Route } from "react-router-dom";
import {
  CategoriesPage,
  AboutUsPage,
  HomePage,
  ServicesPage,
  AISuitesPage,
  ServiceDetailPage,
  ProcessOrderPage,
  LoginPage,
  RegisterPage,
  VerifyEmailPage,
  OtpVerificationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  PasswordResetSuccessPage,
  CheckoutPage,
  BlogPage,
  BlogDetailPage,
  AIWebGeneratorPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
  ContactUsPage,
  GiftVoucherPage,
  ResourcesPage,
  PricingPage,
  HowItWorksPage,
  PortfolioPage,
} from "../Pages/Public";
import PublicLayout from "../Layout/PublicLayout";
import AIVideoGeneratorPage from "../Pages/Public/AIVideoGenerator";
import AIVideoEditor from "../Pages/Public/AIVideoEditor";
import AIBizStrategy from "../Pages/Public/AIBizStrategy";
import { CategoryServices } from "../Component";

const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route
            path="/category/:categoryId/:catName"
            element={<CategoryServices />}
          />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/service/:id/:serviceName"
            element={<ServiceDetailPage />}
          />
          <Route
            path="/process-order/:id/:serviceName"
            element={<ProcessOrderPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/reset-success" element={<PasswordResetSuccessPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/web-generator" element={<AIWebGeneratorPage />} />
          <Route path="/ai-suites" element={<AISuitesPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/gift-voucher" element={<GiftVoucherPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/video-generator" element={<AIVideoGeneratorPage />} />
          <Route path="/video-editor" element={<AIVideoEditor />} />
          <Route path="/biz-strategy" element={<AIBizStrategy />} />
          {/* <Route path="/sample" element={<Sample />} /> */}
        </Route>
      </Routes>
    </PublicLayout>
  );
};

export default PublicRoutes;
