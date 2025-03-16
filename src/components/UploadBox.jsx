import { useState } from "react";
import { Link } from "react-router";

function UploadBox({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select an image to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");

      }

      const data = await response.json();
      setResult(data); // Send result to Result.jsx
      setMessage("Image processed successfully!");
    } catch (error) {
      setMessage("Error processing image.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center p-5 w-100">
      <div className="shadow-lg rounded p-4 bg-white" style={{ maxWidth: "500px", width: "100%" }}>
        <h1 className="text-center text-white bg-success py-3 rounded">Upload Image</h1>
        <form onSubmit={handleFileSubmit} className="mt-4">
          <label className="form-label fw-bold">Choose an image:</label>
          <input type="file" onChange={handleFileChange} className="form-control shadow-sm" accept="image/*" />
          <button type="submit" className="btn btn-outline-primary w-100 mt-3 shadow-sm" disabled={loading}>
            {loading ? "Processing..." : "Upload"}
          </button>
          <Link to="/">
            <button type="submit" className="btn btn-outline-secondary w-100 mt-2 shadow-sm" disabled={loading}>
              Back to home
            </button>
          </Link>
        </form>

        {message && <div className={`alert ${success && file ? "alert-success" : "alert-danger"} mt-4 text-center`}>{message}</div>}
      </div>
    </div>
  );
}

export default UploadBox;
