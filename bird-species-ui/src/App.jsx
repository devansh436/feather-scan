import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container-fluid bg-success text-white min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="display-3 fw-bold">🦜 Feather Scan</h1>
      <p className="lead text-light text-center">
        Upload an image and let AI identify the bird species instantly!
      </p>
      <button className="btn btn-light text-success fw-bold mt-3">Get Started</button>
    </div>
  );
}

export default App;
