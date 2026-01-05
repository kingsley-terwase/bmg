import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./Routes";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./Contexts/UserContext";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { initializeGoogleAuth } from "./utils/googleAuth";
import { LoaderProvider } from "./Contexts/LoaderContext";
import { GlobalLoader } from "./Component";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out-cubic"
    });
  }, []);

  useEffect(() => {
    initializeGoogleAuth()
      .then(() => console.log("Google Auth initialized"))
      .catch((err) => console.error("Google Auth failed:", err));
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <UserContextProvider>
          <LoaderProvider>
            <CssBaseline />
            <GlobalLoader />
            <ToastContainer />
            <Router />
          </LoaderProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
