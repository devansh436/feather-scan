import { useState } from "react";
import { Link } from "react-router-dom";

function UploadBox({ setGeminiResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");
  const [selectedModel, setSelectedModel] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
  };

  const handleModelSelection = (event) => {
    setSelectedModel(event.target.value);
    console.log(event.target.value);
  };

  // MAIN MASALAAAA
  const handleFileSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select an image to upload!");
      return;
    }

    // create multipart body to send over http to backend
    const formData = new FormData();
    formData.append("image", file);
    formData.append("model_type", selectedModel);

    setLoading(true);
    setMessage("");

    const HOST_URL =
      import.meta.env.VITE_HOST_URL || `http://localhost:3000/upload`;

    try {
      const response = await fetch(HOST_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      if (data.answer) {
        setGeminiResult(data.answer); // Send answer to Result.jsx
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
    <div className="slide-in-left">
      <div
        className="shadow-lg rounded-4 p-4 bg-white"
        style={{ maxWidth: "550px", width: "100%", border: "2px solid var(--nature-light-green)" }}
      >
        <div 
          className="text-center text-white py-4 rounded-4 nature-gradient mb-4"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <h2 className="fw-bold mb-0" style={{ fontSize: "1.8rem", letterSpacing: "1px" }}>
            📸 Upload Image
          </h2>
        </div>

        <form onSubmit={handleFileSubmit} className="mt-4">
          <label className="form-label fw-bold text-success mb-3" style={{ fontSize: "1.1rem" }}>
            Choose species type:
          </label>
          
          {/* Beautiful radio buttons */}
          <div className="d-flex gap-3 mb-4 flex-wrap">
            {[
              { value: "bird", icon: "🦅", label: "Bird" },
              { value: "plant", icon: "🌿", label: "Plant" },
              { value: "animal", icon: "🦁", label: "Animal" }
            ].map(({ value, icon, label }) => (
              <label
                key={value}
                className={`flex-fill text-center p-3 rounded-3 ${
                  selectedModel === value 
                    ? 'bg-success text-white' 
                    : 'bg-light text-dark'
                }`}
                style={{
                  cursor: "pointer",
                  border: selectedModel === value ? "3px solid var(--nature-dark-green)" : "2px solid #dee2e6",
                  minWidth: "120px",
                  transition: "all 0.3s ease"
                }}
              >
                <input
                  type="radio"
                  name="model_type"
                  onChange={handleModelSelection}
                  value={value}
                  className="d-none"
                />
                <div style={{ fontSize: "2rem" }}>{icon}</div>
                <div className="fw-bold mt-2">{label}</div>
              </label>
            ))}
          </div>

          <label className="form-label fw-bold text-success mb-3" style={{ fontSize: "1.1rem" }}>
            Choose an image:
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`rounded-3 py-5 text-center ${file ? 'bg-success bg-opacity-10' : 'bg-light'}`}
            style={{ 
              cursor: "pointer",
              border: `3px dashed ${file ? 'var(--nature-green)' : '#dee2e6'}`,
              transition: "all 0.3s ease"
            }}
          >
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="d-none"
              accept="image/*"
            />
            <label
              htmlFor="fileInput"
              className="w-100 d-flex flex-column align-items-center gap-2"
              style={{ cursor: "pointer" }}
            >
              <div style={{ fontSize: "3rem" }}>{file ? "✅" : "📁"}</div>
              <div className="fw-bold" style={{ color: file ? "var(--nature-green)" : "#6c757d" }}>
                {file ? file.name : "Click or drag & drop your image here"}
              </div>
              <div className="text-muted small">Supports: JPG, PNG, WEBP</div>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mt-4 py-3 fw-bold shadow-lg"
            style={{
              borderRadius: "50px",
              fontSize: "1.2rem",
              background: selectedModel && file ? "linear-gradient(135deg, #2e7d32 0%, #43a047 100%)" : "",
              border: "none"
            }}
            disabled={loading || !selectedModel || !file}
          >
            {loading ? (
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div className="spinner-border text-white" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <span>🚀 Analyze Image</span>
            )}
          </button>

          <Link to="/">
            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-3 py-2 shadow-sm"
              style={{ borderRadius: "50px" }}
              disabled={loading}
            >
              ← Back to Home
            </button>
          </Link>
        </form>

        {message && (
          <div 
            className={`alert alert-${alertColor} mt-4 text-center rounded-3 fade-in`}
            style={{ 
              border: "none",
              fontWeight: "500"
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadBox;
