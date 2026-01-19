import { BiSearchAlt, BiWorld } from "react-icons/bi";
import { GiBirdHouse, GiFlowerPot, GiLion } from "react-icons/gi";
import { MdCheckCircle, MdScience, MdLocationOn } from "react-icons/md";
import { TbPercentage } from "react-icons/tb";

function Result({ predictionData }) {
  return (
    <div
      className={`rounded-4 overflow-hidden slide-in-right`}
      style={{
        background: "var(--dark-card)",
        border: predictionData ? "none" : "1px solid var(--accent-green)",
      }}
    >
      <div className="card-body p-0">
        {/* Header */}
        <div
          className="text-center py-3 text-white position-relative"
          style={{
            background: predictionData
              ? "linear-gradient(135deg, var(--accent-green-dim) 0%, var(--accent-blue-dim) 100%)"
              : "linear-gradient(135deg, rgba(63, 185, 80, 0.3) 0%, rgba(88, 166, 255, 0.3) 100%)",
          }}
        >
          <div className="d-flex justify-content-center align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
              }}
            >
              {predictionData ? (
                <MdCheckCircle size={24} color="var(--accent-green)" />
              ) : (
                <BiSearchAlt size={24} color="var(--accent-blue)" />
              )}
            </div>
            <h3
              className="fw-bold mb-0"
              style={{
                fontSize: "1.3rem",
                letterSpacing: "0.5px",
                color: "var(--text-primary)",
              }}
            >
              {predictionData ? "Analysis Result" : "Awaiting Analysis"}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-3 py-3">
          {predictionData ? (
            <div>
              {/* Common Name and Scientific Name */}
              <div className="mb-3">
                {predictionData.info.name && (
                  <div
                    className="mb-2 p-2 rounded-2"
                    style={{
                      background: "var(--dark-surface)",
                      border: "1px solid var(--dark-border)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="fw-semibold"
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--accent-green)",
                          minWidth: "120px",
                        }}
                      >
                        Common Name:
                      </span>
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        {predictionData.info.name}
                      </span>
                    </div>
                  </div>
                )}

                {predictionData.info.scientific_name && (
                  <div
                    className="mb-2 p-2 rounded-2"
                    style={{
                      background: "var(--dark-surface)",
                      border: "1px solid var(--dark-border)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <MdScience
                        size={16}
                        color="var(--accent-blue)"
                        style={{ flexShrink: 0 }}
                      />
                      <span
                        className="fw-semibold"
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--accent-green)",
                          minWidth: "110px",
                        }}
                      >
                        Scientific Name:
                      </span>
                      <span
                        className="fst-italic"
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {predictionData.info.scientific_name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Confidence Score - Less Significant */}
                {predictionData.confidence && (
                  <div
                    className="p-2 rounded-2 d-flex align-items-center justify-content-between"
                    style={{
                      background: "var(--dark-surface)",
                      border: "1px solid var(--dark-border)",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <TbPercentage size={14} color="var(--text-muted)" />
                      <span
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--accent-green)",
                          minWidth: "110px",
                        }}
                      >
                        Confidence:
                      </span>
                    </div>
                    <span
                      className="fw-semibold"
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--accent-green)",
                      }}
                    >
                      {predictionData.confidence}%
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {predictionData.info.description && (
                <div
                  className="mb-3 p-3 rounded-3"
                  style={{
                    background: "var(--dark-surface)",
                    border: "1px solid var(--dark-border)",
                  }}
                >
                  <div
                    className="fw-semibold mb-1"
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--accent-green)",
                    }}
                  >
                    Description
                  </div>
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.6",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {predictionData.info.description}
                  </p>
                </div>
              )}

              {/* Habitat and Origin */}
              <div className="row g-2 mb-2">
                {predictionData.info.habitat && (
                  <div className="col-md-6">
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{
                        background: "var(--dark-surface)",
                        border: "1px solid var(--dark-border)",
                      }}
                    >
                      <div className="d-flex align-items-start gap-2">
                        <BiWorld
                          size={20}
                          color="var(--accent-blue)"
                          style={{ marginTop: "2px", flexShrink: 0 }}
                        />
                        <div>
                          <div
                            className="fw-semibold mb-1"
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--accent-green)",
                            }}
                          >
                            Habitat
                          </div>
                          <div
                            style={{
                              fontSize: "0.9rem",
                              lineHeight: "1.5",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {predictionData.info.habitat}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {predictionData.info.origin && (
                  <div className="col-md-6">
                    <div
                      className="p-3 rounded-3 h-100"
                      style={{
                        background: "var(--dark-surface)",
                        border: "1px solid var(--dark-border)",
                      }}
                    >
                      <div className="d-flex align-items-start gap-2">
                        <MdLocationOn
                          size={20}
                          color="var(--accent-blue)"
                          style={{ marginTop: "2px", flexShrink: 0 }}
                        />
                        <div>
                          <div
                            className="fw-semibold mb-1"
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--accent-green)",
                            }}
                          >
                            Origin
                          </div>
                          <div
                            style={{
                              fontSize: "0.9rem",
                              lineHeight: "1.5",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {predictionData.info.origin}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 px-3">
              <div
                className="mb-3 border rounded-circle d-flex align-items-center justify-content-center mx-auto"
                style={{
                  width: "80px",
                  height: "80px",
                  background:
                    "linear-gradient(135deg, rgba(63, 185, 80, 0.2) 0%, rgba(88, 166, 255, 0.2) 100%)",
                  border: "2px solid var(--accent-blue)",
                }}
              >
                <BiSearchAlt size={40} color="var(--accent-blue)" />
              </div>
              <h4
                className="fw-bold mb-2"
                style={{
                  fontSize: "1.2rem",
                  letterSpacing: "0.3px",
                  color: "var(--accent-green)",
                }}
              >
                Ready to Discover
              </h4>
              <p
                className="mb-3"
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  maxWidth: "350px",
                  margin: "0 auto",
                  color: "var(--text-secondary)",
                }}
              >
                Upload an image and select a category to begin your nature
                exploration journey!
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <div className="text-center">
                  <GiBirdHouse size={32} color="var(--accent-blue)" />
                  <div>
                    <small style={{ color: "var(--text-muted)" }}>Birds</small>
                  </div>
                </div>
                <div className="text-center">
                  <GiFlowerPot size={32} color="var(--accent-green)" />
                  <div>
                    <small style={{ color: "var(--text-muted)" }}>Plants</small>
                  </div>
                </div>
                <div className="text-center">
                  <GiLion size={32} color="var(--accent-cyan)" />
                  <div>
                    <small style={{ color: "var(--text-muted)" }}>
                      Animals
                    </small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
