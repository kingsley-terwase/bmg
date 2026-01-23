import { useLocation } from 'react-router-dom'
import { Header, Footer } from '../../Component'
import ScrollToTop from '../../Component/ScrollToTop';

function PublicLayout({ children }) {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/reset-success", "/verify-email", "/otp-verify"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);
  return (
    <>
      <ScrollToTop />
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}

export default PublicLayout
