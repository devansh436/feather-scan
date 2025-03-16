import "bootstrap/dist/css/bootstrap.min.css";
import BirdInfo from  "../components/BirdInfo";
import UploadBox from "../components/UploadBox";

function UploadPage() {
  return (
    <div data-bs-theme="light" className="container-fluid px-4 bg-light">
      <div className="row">
        <UploadBox />
      </div>
      <div className="row">
        <BirdInfo />
      </div>
    </div>
  );
}

export default UploadPage;
