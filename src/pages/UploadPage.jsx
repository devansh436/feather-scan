import "bootstrap/dist/css/bootstrap.min.css";
import BirdInfo from  "../components/BirdInfo";
import UploadBox from "../components/UploadBox";
import Result from "../components/Result";
import Navbar from "../components/Navbar";
import { useState } from "react";

function UploadPage() {
  const [geminiResult, setGeminiResult] = useState("");
  
  return (
    <div style={{ backgroundColor: "#e8f5e9",  overflowX: "hidden"}}>
      <Navbar />
      <div className="container-fluid"> 
        <div className="row"><UploadBox setGeminiResult={setGeminiResult}/></div>
        <div className="row"><Result geminiResult={geminiResult} /></div>
      </div>
      <div className="row">
        <BirdInfo/>
      </div>
    </div>
  );
}

export default UploadPage;
