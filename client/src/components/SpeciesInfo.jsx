// Component for species info gallery

import speciesData from "../data/birds.js";
import SpeciesCard from "./SpeciesCard";
import { BiLeaf } from "react-icons/bi";

function SpeciesInfo() {
  return (
    <div className="py-4" style={{ background: "var(--dark-surface)" }}>
      {/* title */}
      <div className="container">
        <div className="text-center mb-4 fade-in">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <BiLeaf size={28} color="var(--accent-green)" />
            <h2
              className="fw-bold mb-0"
              style={{
                color: "var(--accent-blue)",
                letterSpacing: "0.5px",
                fontSize: "1.5rem"
              }}
            >
              Explore Nature's Diversity
            </h2>
          </div>
          <p style={{ maxWidth: "500px", margin: "0 auto", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
            Discover fascinating species from around the world
          </p>
        </div>

        {/* main */}
        <div className="d-flex flex-wrap justify-content-center">
          {/* species info cards */}
          {speciesData.map((species, index) => (
            <SpeciesCard key={index} species={species} index={index} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default SpeciesInfo;
