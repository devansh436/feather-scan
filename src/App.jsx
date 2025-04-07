import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UploadPage from "./pages/UploadPage.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <div style={{width: "100%"}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/upload" element={<UploadPage />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
