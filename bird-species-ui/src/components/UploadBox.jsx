import { useState } from "react";
import { Link } from "react-router-dom";

// Component for file upload by user
function UploadBox() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Changes chosen file
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage(""); // Clear message when selecting a new file
  };

  // File submit event
  const handleFileSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select an image to upload!");
      return;
    }
    setMessage("Image uploaded successfully!");
  };

  return (
    <div className="d-flex flex-column align-items-center p-5 w-100">
      <div
        className="shadow-lg rounded p-4 bg-white"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1 className="text-center text-white bg-success py-3 rounded">Upload Image</h1>

        <form onSubmit={handleFileSubmit} className="mt-4">
          <label className="form-label fw-bold text">Choose an image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control shadow-sm "
            accept="image/*"
          />
          <button
            type="submit"
            className="btn btn-outline-primary w-100 mt-3 shadow-sm"
          >
            Upload
          </button>
        </form>

        {message && (
          <div
            className={`alert ${
              file ? "alert-success" : "alert-danger"
            } mt-4 text-center`}
          >
            {message}
          </div>
        )}

        <Link to="/" className="btn btn-outline-secondary w-100 mt-2">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default UploadBox;