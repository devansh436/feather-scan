// Component for bird info
import birdData from "../data/birds.js";
import BirdCard from "./BirdCard";
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
          <BirdCard key={index} bird={bird}/>
        ))}
      </div>
    </div>
  );
}

export default BirdInfo;
