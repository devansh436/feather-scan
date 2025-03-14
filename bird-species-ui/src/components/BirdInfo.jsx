// Component for bird info
import birdData from "../data/birds.js";

function BirdInfo() {
  return (
    <div>
      {/* title */}
      <div className="d-flex mt-2 align-items-center">
        <hr className="flex-grow-1 m-0" style={{ borderTop: "1px solid #000" }}/>
        <h1 className="mx-3">Bird Species Info</h1>
        <hr className="flex-grow-1 m-0" style={{ borderTop: "1px solid #000" }}/>
      </div>

      {/* main */}
      <div className="d-flex flex-wrap justify-content-center">
        {/* bird info box */}
        {birdData.map((bird, index) => (
          <div
            className="card m-4 shadow-lg"
            key={index}
            style={{ width: "250px", overflow: "hidden" }} // Fixed width & overflow control
          >
            {/* Image */}
            <img
              src={bird.image}
              alt="image"
              style={{
                width: "100%", // Ensure image matches card width
                objectFit: "cover", // Avoid stretching
              }}
            />

            {/* Card Body */}
            <div className="card-body">
              <h4 className="card-title fw-bold">{bird.name}</h4>
              <div className="card-text text-muted fst-italic mb-1">
                {bird.scientificName}
              </div>
              <div className="card-text">{bird.habitat}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BirdInfo;
