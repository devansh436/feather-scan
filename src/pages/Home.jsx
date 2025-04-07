import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="container-fluid bg-success text-white" style={{ height:"94vh" }}>
      <Navbar />

      <div className="d-flex flex-column justify-content-center align-items-center" style={{marginTop: "180px"}}>
        <h1 className="display-3 fw-bold">🦜 Feather Scan</h1>
        <p className="lead text-light text-center">
          Upload an image and let AI identify the bird species instantly!
        </p>
        <Link to="/upload" className="btn btn-light text-success fw-bold mt-3">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
