import { BiLeaf } from "react-icons/bi";

function Footer() {
  return (
    <footer 
      className="text-center py-3 mt"
      style={{
        background: "var(--dark-surface)",
        borderTop: "1px solid var(--dark-border)",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.2)"
      }}
    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
          <BiLeaf size={20} color="var(--accent-green)" />
          <p className="mb-0 fw-semibold" style={{ fontSize: "0.95rem", letterSpacing: "0.3px", color: "var(--text-primary)" }}>
            © 2025 Nature Scan
          </p>
        </div>
        <p className="mb-0" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Exploring nature, one species at a time
        </p>
      </div>
    </footer>
  );
}

export default Footer;
