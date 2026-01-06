// Component for individual species card (bird, plant, or animal)
function SpeciesCard({ species, index }) {
  return (
    <div
      className="card m-3 shadow-lg fade-in"
      style={{ 
        width: "280px",
        borderRadius: "20px",
        overflow: "hidden",
        border: "none",
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
        <img
          src={species.image}
          alt={species.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        <div 
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(46, 125, 50, 0.9)",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "600"
          }}
        >
          {species.type || "Species"}
        </div>
      </div>

      {/* Card Body */}
      <div 
        className="card-body p-4"
        style={{
          background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)"
        }}
      >
        <h5 className="card-title fw-bold mb-2" style={{ color: "var(--nature-dark-green)", fontSize: "1.3rem" }}>
          {species.name}
        </h5>
        <div className="card-text text-muted fst-italic mb-3" style={{ fontSize: "0.9rem" }}>
          <span style={{ marginRight: "5px" }}>🔬</span>
          {species.scientificName}
        </div>
        <div className="d-flex align-items-start gap-2">
          <span style={{ fontSize: "1.2rem", marginTop: "2px" }}>🌍</span>
          <div className="card-text" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
            {species.habitat}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeciesCard;
