import parse from "html-react-parser";

function Result({ geminiResult }) {
  return (
    <div
      className="card mb-5 shadow-lg border-0"
      style={{
        width: "60%",
        margin: "auto",
        background: "#119A11",
        color: "white",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <div className="card-body" style={{ display: geminiResult ? "block" : "none" }}>
        <h3 className="fw-bold text-center" style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          letterSpacing: "1px",
        }}>
          Result
        </h3>

        <div className="mt-4 fs-5 fw-medium px-4" style={{
          lineHeight: "1.8",
          fontSize: "1.1rem",
          color: "#E8F5E9"
        }}>
          {geminiResult ? parse(geminiResult) : "No result yet."}
        </div>
      </div>
    </div>
  );
}

export default Result;