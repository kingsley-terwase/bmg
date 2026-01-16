/* ----- USER ROUTES ----- */

import { Routes, Route } from "react-router-dom";
import {
  UserOverview,
  UserOrders,
  UserSingleOrder,
  UserPaymentsPage,
  UserSinglePayment,
  UserAIPage,
  UserConsultationsPage,
  UserNotificationsPage,
  UserSettingsPage,
  UserSubscriptionsPage,
  UserSupportPage,
  UserGenerateImages,
  UserGenerateVideos,
  UserGenerateWebsites,
  UserGenerateAudio,
  UserGenerateStrategy,
} from "../Pages/Users";

const UsersRoutes = () => {
  return (
    <Routes>
      <Route path="user/overview" element={<UserOverview />} />
      <Route path="user/orders" element={<UserOrders />} />
      <Route path="user/orders/single" element={<UserSingleOrder />} />
      <Route path="user/payments" element={<UserPaymentsPage />} />
      <Route path="user/payments/single" element={<UserSinglePayment />} />
      <Route path="user/artificial-intelligence" element={<UserAIPage />} />
      <Route path="user/consultations" element={<UserConsultationsPage />} />
      <Route path="user/notifications" element={<UserNotificationsPage />} />
      <Route path="user/settings" element={<UserSettingsPage />} />
      <Route path="user/subscriptions" element={<UserSubscriptionsPage />} />
      <Route path="user/support" element={<UserSupportPage />} />

      <Route path="user/generate-images" element={<UserGenerateImages />} />
      <Route path="user/generate-videos" element={<UserGenerateVideos />} />
      <Route path="user/generate-website" element={<UserGenerateWebsites />} />
      <Route path="user/generate-audio" element={<UserGenerateAudio />} />
      <Route path="user/generate-strategy" element={<UserGenerateStrategy />} />
    </Routes>
  );
};

export default UsersRoutes;
