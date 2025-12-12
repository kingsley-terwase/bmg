import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "./Contexts/UserContext";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "./Contexts/ThemeContext";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <UserContextProvider>
            <CssBaseline />

            <ToastContainer />
            <Router />
          </UserContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
