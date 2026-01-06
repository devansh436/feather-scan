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
    <div 
      className={`rounded-4 shadow-lg overflow-hidden slide-in-right ${geminiResult ? '' : 'border border-success border-2'}`}
      style={{ 
        background: "white",
      }}
    >
      <div className="card-body p-0">
        {/* Header */}
        <div 
          className="text-center py-4 nature-gradient text-white position-relative"
          style={{
            background: geminiResult 
              ? "linear-gradient(135deg, #2e7d32 0%, #43a047 50%, #66bb6a 100%)"
              : "linear-gradient(135deg, #81c784 0%, #a5d6a7 100%)"
          }}
        >
          <div className="d-flex justify-content-center align-items-center gap-3">
            <div
              className="bg-white rounded-circle d-flex align-items-center justify-content-center pulse"
              style={{
                width: '60px',
                height: '60px',
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
            >
              <span style={{ fontSize: '2rem' }}>
                {geminiResult ? "✨" : "🔍"}
              </span>
            </div>
            <h3
              className="fw-bold mb-0"
              style={{
                fontSize: "2rem",
                letterSpacing: "1.5px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
              }}
            >
              {geminiResult ? "🎉 Analysis Result" : "Awaiting Analysis"}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-4">
          {geminiResult ? (
            <div className="row g-4">
              {Object.entries(geminiResult).map(([key, value], index) => (
                <div 
                  key={key} 
                  className="col-12 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="p-4 rounded-4 shadow-sm"
                    style={{
                      background: index % 2 === 0 
                        ? 'linear-gradient(135deg, #f1f8e9 0%, #ffffff 100%)' 
                        : 'linear-gradient(135deg, #ffffff 0%, #e8f5e9 100%)',
                      border: '2px solid #e0e0e0',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.borderColor = 'var(--nature-green)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.borderColor = '#e0e0e0';
                    }}
                  >
                    <div className="row align-items-start">
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="nature-gradient"
                            style={{
                              width: '8px',
                              height: '32px',
                              borderRadius: '4px',
                              boxShadow: '0 2px 8px rgba(46, 125, 50, 0.3)'
                            }}
                          />
                          <h6
                            className="mb-0 fw-bold"
                            style={{
                              fontSize: "1.1rem",
                              letterSpacing: "0.5px",
                              color: "var(--nature-dark-green)"
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
                            fontSize: "1.05rem",
                            lineHeight: "1.8",
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
            <div className="text-center py-5 px-3">
              <div
                className="mb-4 border rounded-circle d-flex align-items-center justify-content-center mx-auto pulse"
                style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                  border: '3px solid var(--nature-light-green)'
                }}
              >
                <span style={{ fontSize: '4rem' }}>🔍</span>
              </div>
              <h4
                className="fw-bold mb-3"
                style={{
                  fontSize: "1.8rem",
                  letterSpacing: "0.5px",
                  color: "var(--nature-green)"
                }}
              >
                Ready to Discover
              </h4>
              <p
                className="text-muted mb-4"
                style={{
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  maxWidth: "400px",
                  margin: "0 auto"
                }}
              >
                Upload an image and select a category to begin your nature exploration journey! 🌿
              </p>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <div className="text-center">
                  <div style={{ fontSize: "2.5rem" }}>🦅</div>
                  <small className="text-muted">Birds</small>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: "2.5rem" }}>🌸</div>
                  <small className="text-muted">Plants</small>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: "2.5rem" }}>🦁</div>
                  <small className="text-muted">Animals</small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;