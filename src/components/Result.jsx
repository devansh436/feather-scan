import { useState } from "react";

function Result() {
  const [ geminiResult, setGeminiResult ] = useState("");
    
  return (
    <div className="card mt-4 shadow-sm">
      <div className="card-body">
        <p><strong>result</strong></p>
        {/* <h3 className="card-title">{result.name}</h3>
        <p><strong>Scientific Name:</strong> {result.scientificName}</p>
        <p><strong>Description:</strong> {result.description}</p> */}
        {/* <img
          src={result.imageUrl}
          alt={result.name}
          className="img-fluid rounded"
        /> */}
      </div>
    </div>
  );
}

export default Result;