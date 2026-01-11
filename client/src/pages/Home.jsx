import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { BiLeaf, BiRocket, BiBook } from "react-icons/bi";
import { GiBirdHouse, GiFlowerPot, GiLion } from "react-icons/gi";

function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className="container-fluid page-transition" 
      style={{ 
        minHeight: "100vh", 
        position: "relative", 
        overflow: "hidden",
        background: "linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-surface) 50%, var(--dark-card) 100%)"
      }}
    >
      <div 
        className={`d-flex flex-column justify-content-center align-items-center ${isVisible ? 'fade-in' : ''}`}
        style={{ marginTop: "80px", padding: "20px" }}
      >
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <BiLeaf size={40} color="var(--accent-green)" />
            <h1 
              className="display-4 fw-bold mb-0" 
              style={{ 
                background: "linear-gradient(135deg, var(--accent-green), var(--accent-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "1px"
              }}
            >
              Nature Scan
            </h1>
          </div>
          <p 
            className="lead mb-3" 
            style={{ 
              maxWidth: "600px", 
              lineHeight: "1.6",
              fontSize: "1.1rem",
              color: "var(--text-secondary)"
            }}
          >
            Discover the wonders of nature! Upload an image and let AI identify birds, plants, and animals instantly.
          </p>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
            <Link 
              to="/upload" 
              className="btn px-4 py-2 shadow"
              style={{
                background: "linear-gradient(135deg, var(--accent-green-dim), var(--accent-blue-dim))",
                color: "white",
                fontWeight: "600",
                borderRadius: "25px",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "none"
              }}
            >
              <BiRocket size={20} />
              Get Started
            </Link>
            <Link 
              to="/about" 
              className="btn px-4 py-2 shadow"
              style={{
                background: "transparent",
                border: "2px solid var(--dark-border)",
                borderRadius: "25px",
                fontSize: "1rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-primary)"
              }}
            >
              <BiBook size={20} />
              Learn More
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="row mt-4 g-3 w-100" style={{ maxWidth: "900px" }}>
          <div className="col-md-4">
            <div 
              className="card h-100 text-center p-3 border-0 slide-in-left no-hover"
              style={{ 
                background: "var(--dark-card)",
                borderRadius: "15px",
                border: "1px solid var(--dark-border) !important",
                animationDelay: "0.2s"
              }}
            >
              <div className="d-flex justify-content-center">
                <GiBirdHouse size={50} color="var(--accent-blue)" />
              </div>
              <h5 className="fw-bold mt-2 mb-1" style={{ color: "var(--accent-green)" }}>Birds</h5>
              <p className="mb-0" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Identify bird species with incredible accuracy</p>
            </div>
          </div>
          <div className="col-md-4">
            <div 
              className="card h-100 text-center p-3 border-0 fade-in no-hover"
              style={{ 
                background: "var(--dark-card)",
                borderRadius: "15px",
                border: "1px solid var(--dark-border) !important",
                animationDelay: "0.4s"
              }}
            >
              <div className="d-flex justify-content-center">
                <GiFlowerPot size={50} color="var(--accent-green)" />
              </div>
              <h5 className="fw-bold mt-2 mb-1" style={{ color: "var(--accent-green)" }}>Plants</h5>
              <p className="mb-0" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Discover plant species and their properties</p>
            </div>
          </div>
          <div className="col-md-4">
            <div 
              className="card h-100 text-center p-3 border-0 slide-in-right no-hover"
              style={{ 
                background: "var(--dark-card)",
                borderRadius: "15px",
                border: "1px solid var(--dark-border) !important",
                animationDelay: "0.6s"
              }}
            >
              <div className="d-flex justify-content-center">
                <GiLion size={50} color="var(--accent-cyan)" />
              </div>
              <h5 className="fw-bold mt-2 mb-1" style={{ color: "var(--accent-green)" }}>Animals</h5>
              <p className="mb-0" style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>Recognize wildlife from around the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
