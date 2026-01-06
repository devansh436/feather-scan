// Component for species info gallery
import birdData from "../data/birds.js";
import SpeciesCard from "./SpeciesCard";

function SpeciesInfo() {
  // Add type to each species for display
  const speciesData = birdData.map(bird => ({ ...bird, type: "Bird" }));

  return (
    <div className="py-5" style={{ background: "rgba(255, 255, 255, 0.5)" }}>
      {/* title */}
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h2 
            className="display-5 fw-bold mb-3"
            style={{ 
              color: "var(--nature-dark-green)",
              letterSpacing: "1px"
            }}
          >
            🌿 Explore Nature's Diversity
          </h2>
          <p className="lead text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Discover fascinating species from around the world
          </p>
          <div 
            style={{
              width: "100px",
              height: "4px",
              background: "linear-gradient(to right, var(--nature-green), var(--nature-light-green))",
              margin: "20px auto",
              borderRadius: "2px"
            }}
          />
        </div>

        {/* main */}
        <div className="d-flex flex-wrap justify-content-center">
          {/* species info cards */}
          {speciesData.map((species, index) => (
            <SpeciesCard key={index} species={species} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-5 fade-in" style={{ animationDelay: "0.8s" }}>
          <p className="lead text-muted mb-4">
            Want to identify your own discoveries?
          </p>
          <a 
            href="/upload" 
            className="btn btn-lg px-5 py-3 nature-gradient text-white fw-bold shadow-lg"
            style={{ borderRadius: "50px", border: "none", fontSize: "1.1rem" }}
          >
            🚀 Try Nature Scan Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default SpeciesInfo;
