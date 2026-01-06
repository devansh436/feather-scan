import "bootstrap/dist/css/bootstrap.min.css";
import SpeciesInfo from "../components/SpeciesInfo";
import UploadBox from "../components/UploadBox";
import Result from "../components/Result";
import Navbar from "../components/Navbar";
import { useState } from "react";

function UploadPage() {
  const [geminiResult, setGeminiResult] = useState("");

  return (
    <div 
      className="page-transition"
      style={{ 
        background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
        minHeight: "100vh",
        overflowX: "hidden"
      }}
    >

      <div className="container mt-5 mb-5">
        <div className="row g-4 align-items-start">
          <div className="col-lg-6 d-flex justify-content-center">
            <UploadBox setGeminiResult={setGeminiResult} />
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "600px" }}>
              <Result geminiResult={geminiResult} />
            </div>
          </div>
        </div>
      </div>

      {/* Species cards */}
      <div className="mt-5">
        <SpeciesInfo />
      </div>
    </div>
  );
}

export default UploadPage;
