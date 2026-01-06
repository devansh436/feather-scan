import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UploadPage from "./pages/UploadPage.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
