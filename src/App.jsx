import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Router from './Routes';
import { ThemeProvider } from "./Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
        <BrowserRouter>
        <ToastContainer />
          <Router />
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App