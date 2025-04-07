import { useState } from "react";
import { Link } from "react-router-dom";


function UploadBox({ setGeminiResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

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

    const HOST_URL = import.meta.env.VITE_HOST_URL;

    try {
      const response = await fetch(`${HOST_URL}:3000/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      if (data.answer) {
        setGeminiResult(data.answer); // ✅ Send answer to Result.jsx
        setMessage("Image processed successfully!");
        setAlertColor("success");
      } else {
        setMessage("No response from server.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error processing image.");
    } finally {
      setLoading(false);
    }
  };

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setMessage("");
    }
  }
  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div className="d-flex flex-column align-items-center p-5 w-100">
      <div
        className="shadow-lg rounded p-4 bg-white"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h1
          className="text-center text-white py-3 rounded bg-success"
        >
          Upload Image
        </h1>
        <form onSubmit={handleFileSubmit} className="mt-4">
          <label className="form-label fw-bold"> Choose an image or drag and drop:</label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border border-secondary rounded p-3 text-center"
            style={{ cursor: "pointer" }}
          >
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="d-none"
              accept="image/*"
            />
            <label htmlFor="fileInput" className="w-100" style= {{"cursor" : "pointer"}}>
              {file ? file.name : "Click to select or drop an image"}
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary w-100 mt-3 shadow-sm"
            disabled={loading}
          >
            {loading ? "Processing..." : "Upload"}
          </button>
          <Link to="/">
            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2 shadow-sm"
              disabled={loading}
            >
              Back to home
            </button>
          </Link>
        </form>

        {message && (
          <div className={`alert alert-${alertColor} mt-4 text-center`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadBox;
