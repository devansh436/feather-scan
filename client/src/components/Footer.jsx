function Footer() {
  return (
    <footer 
      className="text-center py-4 mt-auto"
      style={{
        background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
        color: "white",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.1)"
      }}
    >
      <div className="container">
        <div className="mb-3">
          <span style={{ fontSize: "2rem" }}>🌿</span>
        </div>
        <p className="mb-2 fw-bold" style={{ fontSize: "1.1rem", letterSpacing: "0.5px" }}>
          © 2025 Nature Scan | Powered by AI 🤖
        </p>
        <p className="mb-0 text-light" style={{ fontSize: "0.9rem", opacity: 0.9 }}>
          Exploring nature, one species at a time 🦅🌸🦁
        </p>
      </div>
    </footer>
  );
}

export default Footer;
