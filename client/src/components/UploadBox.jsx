import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase.js";
import { BiUpload, BiRocket, BiArrowBack } from "react-icons/bi";
import { GiBirdHouse, GiFlowerPot, GiLion } from "react-icons/gi";
import { MdCheckCircle, MdFolder } from "react-icons/md";
import { historyAPI, uploadImage } from "../services/api.js";

function UploadBox({ setPredictionData }) {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");
  const [selectedModel, setSelectedModel] = useState("");

  const chooseSpecies = [
    { value: "bird", Icon: GiBirdHouse, label: "Bird" },
    { value: "plant", Icon: GiFlowerPot, label: "Plant", beta: true },
    { value: "animal", Icon: GiLion, label: "Animal", beta: true },
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setMessage("");
    }
  };

  const handleModelSelection = (event) => {
    setSelectedModel(event.target.value);
    console.log(event.target.value);
  };

  // MAIN MASALAAAA
  const handleFileSubmit = async (event) => {
    // prevent page refresh
    event.preventDefault();

    if (!file) {
      setMessage("Please select an image to upload!");
      return;
    }

    // Get firebase id token before file submit
    const token = await auth.currentUser.getIdToken();

    // Create multipart body to send over http to backend
    const formData = new FormData();
    formData.append("image", file);
    formData.append("model_type", selectedModel);

    setLoading(true);
    setMessage("");

    let data;
    // function from "src/services/api.js"
    try {
      data = await uploadImage(formData);
      const prediction = {
        label: data.label,
        confidence: data.confidence,
      }

      const addRec = await historyAPI.addRecord({
        modelType: selectedModel,
        prediction,
      });
      

    } catch (error) {
      console.error("Error:", error);
      setMessage("Error processing image.");
    } finally {
      setLoading(false);
    }

    if (data.info) {
      setPredictionData(data); // Send data to Result.jsx
      setMessage("Image processed successfully!");
      setAlertColor("success");
    } else {
      setMessage("No response from server.");
    }
  };

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setImagePreview(URL.createObjectURL(droppedFile));
      setMessage("");
    }
  }
  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div className="slide-in-left">
      <div
        className="rounded-4 p-3"
        style={{
          minWidth: "450px",
          width: "100%",
          border: "1px solid var(--dark-border)",
          background: "var(--dark-card)",
        }}
      >
        <div
          className="text-center text-white py-3 rounded-3 mb-3"
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, var(--accent-green-dim) 0%, var(--accent-blue-dim) 100%)",
          }}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <BiUpload size={24} />
            <h2
              className="fw-bold mb-0"
              style={{ fontSize: "1.3rem", letterSpacing: "0.5px" }}
            >
              Upload Image
            </h2>
          </div>
        </div>

        <form onSubmit={handleFileSubmit} className="mt-3">
          <label
            className="form-label fw-semibold mb-2"
            style={{ fontSize: "0.95rem", color: "var(--accent-green)" }}
          >
            Choose species type:
          </label>

          {/* Beautiful radio buttons */}
          <div className="d-flex gap-2 mb-3 flex-wrap">
            {chooseSpecies.map(({ value, Icon, label, beta }) => (
              <label
                key={value}
                className="flex-fill text-center p-2 rounded-3"
                style={{
                  cursor: "pointer",
                  border:
                    selectedModel === value
                      ? "1px solid var(--accent-blue)"
                      : "1px solid var(--dark-border)",
                  background:
                    selectedModel === value
                      ? "linear-gradient(135deg, var(--accent-green-dim), var(--accent-blue-dim))"
                      : "var(--dark-surface)",
                  color:
                    selectedModel === value ? "white" : "var(--text-primary)",
                  minWidth: "100px",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {beta && (
                  <span
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                      color: "white",
                      fontSize: "0.5rem",
                      fontWeight: "700",
                      padding: "2px 2px",
                      borderRadius: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Beta
                  </span>
                )}
                <input
                  type="radio"
                  name="model_type"
                  onChange={handleModelSelection}
                  value={value}
                  className="d-none"
                />
                <div className="d-flex justify-content-center">
                  <Icon size={32} />
                </div>
                <div
                  className="fw-semibold mt-1"
                  style={{ fontSize: "0.9rem" }}
                >
                  {label}
                </div>
              </label>
            ))}
          </div>

          <label
            className="form-label fw-semibold mb-2"
            style={{ fontSize: "0.95rem", color: "var(--accent-green)" }}
          >
            Choose an image:
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="rounded-3 text-center"
            style={{
              cursor: "pointer",
              border: `2px dashed ${
                file ? "var(--accent-green)" : "var(--dark-border)"
              }`,
              background: file
                ? "rgba(63, 185, 80, 0.1)"
                : "var(--dark-surface)",
              transition: "all 0.3s ease",
              padding: imagePreview ? "12px" : "24px 12px",
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
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxHeight: "150px",
                      maxWidth: "100%",
                      borderRadius: "8px",
                      objectFit: "contain",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  />
                  <div
                    className="d-flex align-items-center gap-1 mt-1"
                    style={{ color: "var(--accent-green)" }}
                  >
                    <MdCheckCircle size={18} />
                    <span
                      className="fw-semibold"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {file.name}
                    </span>
                  </div>
                  <div
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    Click to change image
                  </div>
                </>
              ) : (
                <>
                  <div style={{ color: "var(--text-secondary)" }}>
                    <MdFolder size={48} />
                  </div>
                  <div
                    className="fw-semibold"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                    }}
                  >
                    Click or drag & drop your image here
                  </div>
                  <div
                    style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
                  >
                    Supports: JPG, PNG, WEBP
                  </div>
                </>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="btn w-100 mt-3 py-2 fw-semibold shadow"
            style={{
              borderRadius: "25px",
              fontSize: "1rem",
              background:
                selectedModel && file
                  ? "linear-gradient(135deg, var(--accent-green-dim) 0%, var(--accent-blue-dim) 100%)"
                  : "var(--dark-surface)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: selectedModel && file ? "white" : "var(--text-muted)",
            }}
            disabled={loading || !selectedModel || !file}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border spinner-border-sm text-white"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <BiRocket size={20} />
                <span>Analyze Image</span>
              </>
            )}
          </button>

          <Link to="/">
            <button
              type="button"
              className="btn w-100 mt-2 py-2 shadow-sm"
              style={{
                borderRadius: "25px",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                background: "transparent",
                border: "1px solid var(--dark-border)",
                color: "var(--text-primary)",
              }}
              disabled={loading}
            >
              <BiArrowBack size={18} />
              <span>Back to Home</span>
            </button>
          </Link>
        </form>

        {message && (
          <div
            className={`alert alert-${alertColor} mt-3 text-center rounded-3 fade-in`}
            style={{
              border: "none",
              fontWeight: "500",
              fontSize: "0.9rem",
              padding: "10px",
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
