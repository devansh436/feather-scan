// BirdCard.jsx - Component for individual bird card
function BirdCard({ bird }) {
  return (
    <div
      className="card m-4 shadow-lg"
      style={{ width: "250px" }} // Fixed width & overflow control
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
  );
}

export default BirdCard;
