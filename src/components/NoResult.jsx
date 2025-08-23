import React from "react";

function NoResult() {
  return (
    <div className="border border-success border-1 rounded">
      <div className="card-body p-0">
        {/* Header */}
        <div className="text-center py-3 bg-success text-white rounded-top">
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div
              className="bg-white text-success rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '50px',
                height: '50px',
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>🌿</span>
            </div>
            <h3
              className="fw-bold mb-0"
              style={{
                fontSize: "2rem",
                letterSpacing: "1px",
              }}
            >
              Analysis Result
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <div className="text-center py-5">
            <div
              className="mb-4 bg-light border rounded-circle d-flex align-items-center justify-content-center mx-auto"
              style={{
                width: '80px',
                height: '80px',
              }}
            >
              <span style={{ fontSize: '2.5rem', opacity: 0.7 }}>🔍</span>
            </div>
            <h4
              className="text-success fw-bold"
              style={{
                fontSize: "1.5rem",
                letterSpacing: "0.5px",
              }}
            >
              No results available yet
            </h4>
            <p
              className="text-muted"
              style={{
                fontSize: "1rem",
                marginTop: "1rem",
              }}
            >
              Results will appear here once the analysis is complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoResult;
