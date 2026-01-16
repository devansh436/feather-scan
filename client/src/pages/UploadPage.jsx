import "bootstrap/dist/css/bootstrap.min.css";
import SpeciesInfo from "../components/SpeciesInfo";
import UploadBox from "../components/UploadBox";
import Result from "../components/Result";
import Navbar from "../components/Navbar";
import { useState } from "react";

function UploadPage() {
  const [predictionData, setPredictionData] = useState("");

  return (
    <div 
      className="page-transition"
      style={{ 
        minHeight: "100vh",
        overflowX: "hidden"
      }}
    >

      <div className="container mt-4 mb-4">
        <div className="row g-3 align-items-start">
          <div className="col-lg-6 d-flex justify-content-center">
            <UploadBox setPredictionData={setPredictionData} />
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "600px" }}>
              <Result predictionData={predictionData} />
            </div>
          </div>
        </div>
      </div>

      {/* Species cards */}
      <div className="mt-4">
        <SpeciesInfo />
      </div>
    </div>
  );
}

export default UploadPage;
