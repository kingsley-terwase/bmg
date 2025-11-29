import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Router from './Routes';
import { ThemeProvider } from "./Context";

function App() {
  return (
    <ThemeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App