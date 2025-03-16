import "bootstrap/dist/css/bootstrap.min.css";
import BirdInfo from  "../components/BirdInfo";
import UploadBox from "../components/UploadBox";
import Result from "../components/Result";
import { useState } from "react";

function UploadPage() {
  const [result, setResult] = useState(null);

  return (
    <div data-bs-theme="light" className="container-fluid px-4 bg-light">
      <div className="row">
        <div className="col"><UploadBox /></div>
        <div className="col"><Result result={result} /></div>
      </div>
      <div className="row">
        <BirdInfo />
      </div>
    </div>
  );
}

export default UploadPage;
