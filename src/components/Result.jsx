function Result({ geminiResult }) {
  return (
    <div
      className="card mb-5 shadow-lg border-0"
      style={{
        width: "60%",
        margin: "auto",
        background: "linear-gradient(110deg, green, limegreen)",
        color: "white",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0, 128, 0, 0.3)",
      }}
    >
      <div className="card-body text-center" style={{ display: geminiResult ? "block" : "none" }}>
        <h3 className="fw-bold text-uppercase position-relative d-inline-block px-3">
          <span className="px-3">Result</span>
          <div
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              width: "80%",
              height: "4px",
              backgroundColor: "white",
              transform: "translateX(-50%)",
              opacity: "0.8",
            }}
          ></div>
        </h3>

        <p className="mt-4 fs-5 fw-semibold px-4" style={{ lineHeight: "1.6" }}>
          {geminiResult || "No result yet."}
        </p>
      </div>
    </div>
  );
}

export default Result;
