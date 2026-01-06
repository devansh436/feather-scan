import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="container-fluid nature-gradient text-white page-transition" 
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* Animated background elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        fontSize: "80px",
        opacity: 0.1,
        animation: "pulse 3s ease-in-out infinite"
      }}>🌿</div>
      <div style={{
        position: "absolute",
        top: "60%",
        right: "10%",
        fontSize: "100px",
        opacity: 0.1,
        animation: "pulse 4s ease-in-out infinite 1s"
      }}>🦋</div>
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "15%",
        fontSize: "70px",
        opacity: 0.1,
        animation: "pulse 3.5s ease-in-out infinite 0.5s"
      }}>🌺</div>


      <div 
        className={`d-flex flex-column justify-content-center align-items-center ${isVisible ? 'fade-in' : ''}`}
        style={{ marginTop: "120px", padding: "20px" }}
      >
        <div className="text-center mb-5">
          <h1 
            className="display-2 fw-bold mb-4" 
            style={{ 
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              letterSpacing: "2px"
            }}
          >
            🌿 Nature Scan 🦜
          </h1>
          <p 
            className="lead text-light fs-4 mb-4" 
            style={{ 
              maxWidth: "700px", 
              lineHeight: "1.8",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
            }}
          >
            Discover the wonders of nature! Upload an image and let AI identify birds, plants, and animals instantly.
          </p>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap mt-5">
            <Link 
              to="/upload" 
              className="btn btn-light btn-lg px-5 py-3 shadow-lg"
              style={{
                background: "white",
                color: "var(--nature-green)",
                fontWeight: "600",
                borderRadius: "50px",
                fontSize: "1.2rem"
              }}
            >
              🚀 Get Started
            </Link>
            <Link 
              to="/about" 
              className="btn btn-outline-light btn-lg px-5 py-3 shadow-lg"
              style={{
                borderWidth: "2px",
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "600"
              }}
            >
              📖 Learn More
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="row mt-5 g-4 w-100" style={{ maxWidth: "1000px" }}>
          <div className="col-md-4">
            <div 
              className="card h-100 text-center p-4 border-0 slide-in-left"
              style={{ 
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                animationDelay: "0.2s"
              }}
            >
              <div style={{ fontSize: "4rem" }}>🦅</div>
              <h4 className="text-success fw-bold mt-3">Birds</h4>
              <p className="text-muted">Identify bird species with incredible accuracy</p>
            </div>
          </div>
          <div className="col-md-4">
            <div 
              className="card h-100 text-center p-4 border-0 fade-in"
              style={{ 
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                animationDelay: "0.4s"
              }}
            >
              <div style={{ fontSize: "4rem" }}>🌸</div>
              <h4 className="text-success fw-bold mt-3">Plants</h4>
              <p className="text-muted">Discover plant species and their properties</p>
            </div>
          </div>
          <div className="col-md-4">
            <div 
              className="card h-100 text-center p-4 border-0 slide-in-right"
              style={{ 
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "20px",
                animationDelay: "0.6s"
              }}
            >
              <div style={{ fontSize: "4rem" }}>🦁</div>
              <h4 className="text-success fw-bold mt-3">Animals</h4>
              <p className="text-muted">Recognize wildlife from around the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
