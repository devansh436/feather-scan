import React  from "react";
import UploadPage from "./pages/uploadPage.jsx"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/upload" element={<UploadPage />}></Route>
      </Routes>
    </Router>
  )
}

function Home() {
  return (
    <div className="container-fluid bg-success text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-3 fw-bold">🦜 Feather Scan</h1>
      <p className="lead text-light text-center">
        Upload an image and let AI identify the bird species instantly!
      </p>
      <Link to="/upload" className="btn btn-light text-success fw-bold mt-3">
        Get Started
      </Link>
    </div>
  );
}

export default App;
