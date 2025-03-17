import "bootstrap/dist/css/bootstrap.min.css";
import BirdInfo from  "../components/BirdInfo";
import UploadBox from "../components/UploadBox";
import Result from "../components/Result";
import { useState } from "react";

function UploadPage() {
  const [geminiResult, setGeminiResult] = useState("");
  
  return (
    <div data-bs-theme="light" className="container-fluid px-4 bg-light">
      <div className="container"> 
        <div className="row"><UploadBox setGeminiResult={setGeminiResult}/></div>
        <div className="row"><Result geminiResult={geminiResult} /></div>
        </div>
      <div className="row">
        <BirdInfo />
      </div>
    </div>
  );
}

export default UploadPage;
