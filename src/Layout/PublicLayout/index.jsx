import { useLocation } from 'react-router-dom'
import {Header, Footer} from '../../Component'

function PublicLayout({ children }) {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/register"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);
  return (
    <>
     {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}

export default PublicLayout
