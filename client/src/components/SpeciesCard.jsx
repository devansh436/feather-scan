// Component for individual species card (bird, plant, or animal)
import { BiWorld } from "react-icons/bi";
import { MdScience } from "react-icons/md";


function SpeciesCard({ species, index }) {
  return (
    <div
      className="card m-2 shadow-lg fade-in"
      style={{
        width: "250px",
        borderRadius: "15px",
        overflow: "hidden",
        border: "1px solid var(--dark-border)",
        background: "var(--dark-card)",
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Image */}
      <div
        style={{ position: "relative", overflow: "hidden", height: "160px" }}
      >
        <img
          src={species.image}
          alt={species.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background:
              "linear-gradient(135deg, var(--accent-green-dim), var(--accent-blue-dim))",
            color: "white",
            padding: "4px 12px",
            borderRadius: "15px",
            fontSize: "0.8rem",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
        >
          {species.type || "Species"}
        </div>
      </div>

      {/* Card Body */}
      <div
        className="card-body p-3"
        style={{
          background: "var(--dark-card)",
        }}
      >
        <h5
          className="card-title fw-bold mb-2"
          style={{ color: "var(--accent-green)", fontSize: "1.1rem" }}
        >
          {species.name}
        </h5>
        {species.scientificName && (
          <div
            className="card-text fst-italic mb-2 d-flex align-items-center gap-1"
            style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
          >
            <MdScience size={16} color="var(--accent-blue)" />
            <span>{species.scientificName}</span>
          </div>
        )}
        {species.habitat && (
          <div className="d-flex align-items-start gap-2">
            <BiWorld
              size={18}
              style={{ marginTop: "2px", flexShrink: 0 }}
              color="var(--text-muted)"
            />
            <div
              className="card-text"
              style={{
                fontSize: "0.85rem",
                lineHeight: "1.5",
                color: "var(--text-secondary)",
              }}
            >
              {species.habitat}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpeciesCard;
