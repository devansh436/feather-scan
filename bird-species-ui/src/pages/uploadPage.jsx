import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Component for bird info
function BirdInfo() {
  return (
    <div className="bird-info-container min-vh-100 text-dark py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">
          ⭐ Discover the Amazing World of Birds ⭐
        </h2>

        {/* Bird Types Section */}
        <div className="row g-4">
          {/* Eagles */}
          <div className="col-md-6">
            <div className="p-4 shadow-lg rounded bg-white">
              <h3 className="text-primary fw-bold">
                🦅 Eagles - The Majestic Hunters
              </h3>
              <p>
                Eagles are powerful birds of prey with excellent eyesight,
                allowing them to spot their prey from miles away. They are found
                all over the world, soaring high in the sky with their massive
                wings.
              </p>
              <ul>
                <li>They can spot a rabbit from 3 km away! 👀</li>
                <li>The Harpy Eagle has talons as big as a bear's claws! 🐻</li>
              </ul>
            </div>
          </div>

          {/* Parrots */}
          <div className="col-md-6">
            <div className="p-4 shadow-lg rounded bg-white">
              <h3 className="text-success fw-bold">
                🦜 Parrots - The Talkative Companions
              </h3>
              <p>
                Parrots are known for their vibrant colors and ability to mimic
                human speech! They are one of the most intelligent bird species.
              </p>
              <ul>
                <li>The African Grey Parrot can learn 1,000+ words! 🗣️</li>
                <li>Parrots use their feet like hands to grab food. 🦶</li>
              </ul>
            </div>
          </div>

          {/* Penguins */}
          <div className="col-md-6">
            <div className="p-4 shadow-lg rounded bg-white">
              <h3 className="text-info fw-bold">
                🐧 Penguins - The Cool Swimmers
              </h3>
              <p>
                Penguins are flightless birds that have adapted to life in the
                water. They are expert swimmers, using their flipper-like wings
                to glide through the ocean.
              </p>
              <ul>
                <li>They can swim up to 22 mph! 🏊‍♂️</li>
                <li>Emperor Penguins huddle together to stay warm. ❄️</li>
              </ul>
            </div>
          </div>

          {/* Owls */}
          <div className="col-md-6">
            <div className="p-4 shadow-lg rounded bg-white">
              <h3 className="text-warning fw-bold">
                🦉 Owls - The Silent Predators
              </h3>
              <p>
                Owls are nocturnal birds of prey with specialized feathers that
                allow them to fly silently. They rely on their sharp hearing to
                hunt in the dark.
              </p>
              <ul>
                <li>Owls can rotate their heads 270°! 😲</li>
                <li>They have asymmetrical ears for better hearing. 👂</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Fun Bird Fact */}
        <div className="mt-5 p-4 text-center bg-success text-white rounded shadow-lg">
          <h4 className="fw-bold">Fun Bird Fact of the Day 🐦</h4>
          <p className="lead">
            Did you know? The Arctic Tern migrates 70,900 km every year—the
            longest migration of any bird! 🌍✈️
          </p>
        </div>
      </div>
    </div>
  );
}

// Component for file upload by user
function UploadBox() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Changes chosen file content
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage(""); // Clear message when selecting a new file
  };

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
        <h1 className="text-center text-white bg-success py-3 rounded">
          📷 Upload Image
        </h1>

        <form onSubmit={handleFileSubmit} className="mt-4">
          <label className="form-label fw-bold text">Choose an image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="form-control border-success shadow-sm"
            accept="image/*"
          />
          <button
            type="submit"
            className="btn btn-outline-success w-100 mt-3 shadow-sm"
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


// Main page component
function UploadPage() {
  return (
    <div data-bs-theme="light" className="d-flex flex-column min-vh-100 bg-light">
      <div className="d-flex justify-content-end"> 
      </div>
        <div>
          <UploadBox />
        </div>
        <div>
          <BirdInfo />
        </div>
    </div>
  );
}

export default UploadPage;
