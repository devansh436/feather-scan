import "bootstrap/dist/css/bootstrap.min.css";
import BirdInfo from "../components/BirdInfo";
import UploadBox from "../components/UploadBox";
import Result from "../components/Result";
import NoResult from "../components/NoResult";
import Navbar from "../components/Navbar";
import { useState } from "react";

function UploadPage() {
  const [geminiResult, setGeminiResult] = useState("");

  return (
    <div style={{ backgroundColor: "#e8f5e9", overflowX: "hidden" }}>
      {/* nav */}
      <Navbar />

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6">
            <UploadBox setGeminiResult={setGeminiResult} />
          </div>
          <div className="col-md-6">
            {geminiResult === "" ? (
              <NoResult />
            ) : (
              <Result geminiResult={geminiResult} />
            )}
          </div>
        </div>
      </div>

      {/* bird cards */}
      <div className="row">
        <BirdInfo />
      </div>
    </div>
  );
}

export default UploadPage;
