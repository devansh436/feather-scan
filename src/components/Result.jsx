import React from 'react';

function Result({ geminiResult }) {
  const formatLabel = (key) => {
    // Handle specific cases first
    if (key.toLowerCase() === 'scientific_name') {
      return 'Scientific Name';
    }
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="d-flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span
              key={index}
              className="badge bg-success bg-opacity-25 text-success px-3 py-2"
              style={{
                border: '1px solid rgba(25, 135, 84, 0.3)',
                borderRadius: '15px',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <div className="border border-success border-1 rounded">
      <div 
        className="card-body p-0"
        style={{ display: geminiResult ? "block" : "none" }}
      >
        {/* Header */}
        <div 
          className="text-center py-3 bg-success text-white rounded-top"
        >
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
          {geminiResult ? (
            <div className="row g-3">
              {Object.entries(geminiResult).map(([key, value], index) => (
                <div key={key} className="col-12">
                  <div
                    className="p-3 rounded-3 border"
                    style={{
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                      borderColor: '#dee2e6',
                    }}
                  >
                    <div className="row align-items-start">
                      <div className="col-md-4 mb-2 mb-md-0">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="bg-success"
                            style={{
                              width: '6px',
                              height: '24px',
                              borderRadius: '3px',
                            }}
                          />
                          <h6
                            className="mb-0 fw-bold text-success"
                            style={{
                              fontSize: "1rem",
                              letterSpacing: "0.3px",
                            }}
                          >
                            {formatLabel(key)}
                          </h6>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div
                          className="text-dark"
                          style={{
                            fontSize: "1rem",
                            lineHeight: "1.6",
                            fontWeight: "500",
                          }}
                        >
                          {renderValue(value)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;