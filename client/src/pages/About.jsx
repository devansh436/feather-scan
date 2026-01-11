import "bootstrap/dist/css/bootstrap.min.css";
import {
  BiSolidBinoculars,
  BiSolidMicrochip,
  BiSolidData,
  BiSolidMapAlt,
  BiLeaf,
  BiCode,
  BiServer,
  BiBrain,
  BiDesktop,
} from "react-icons/bi";

function About() {
  const keyFeatures = [
    {
      icon: BiSolidBinoculars,
      title: "Instant Recognition",
      desc: "Lightning-fast AI identifies species in seconds with high accuracy",
    },
    {
      icon: BiSolidMicrochip,
      title: "Advanced AI",
      desc: "Multiple specialized deep learning models for each category",
    },
    {
      icon: BiSolidData,
      title: "Rich Information",
      desc: "Comprehensive species data powered by Gemini AI",
    },
    {
      icon: BiSolidMapAlt,
      title: "Habitat Insights",
      desc: "Geographic distribution and environment details",
    },
  ];

  return (
    <div
      className="page-transition"
      style={{
        background: "linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-surface) 50%, var(--dark-card) 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="container py-4">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <BiLeaf size={28} color="var(--accent-green)" />
            <h1
              className="fw-bold mb-0"
              style={{
                background: "linear-gradient(135deg, var(--accent-green), var(--accent-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.8rem",
              }}
            >
              About Nature Scan
            </h1>
          </div>
          <p
            className="mb-3"
            style={{ maxWidth: "600px", margin: "0 auto", fontSize: "0.9rem", color: "var(--text-secondary)" }}
          >
            AI-powered platform for identifying birds, plants, and animals.
          </p>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {[
              "500+ Bird Species",
              "Plant Recognition",
              "Animal Detection",
              "AI-Powered",
            ].map((text) => (
              <span
                key={text}
                className="badge px-2 py-1"
                style={{
                  background: "linear-gradient(135deg, var(--accent-green-dim), var(--accent-blue-dim))",
                  fontSize: "0.75rem",
                  borderRadius: "12px",
                }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div
              className="card no-hover border-0 shadow-sm"
              style={{ borderRadius: "16px", background: "var(--dark-card)", border: "1px solid var(--dark-border) !important" }}
            >
              <div className="card-body p-4">
                <h5
                  className="fw-bold mb-2"
                  style={{ color: "var(--accent-green)", fontSize: "1.1rem" }}
                >
                  How It Works
                </h5>
                <p
                  className="mb-0"
                  style={{ fontSize: "0.9rem", lineHeight: "1.7", color: "var(--text-secondary)" }}
                >
                  Upload a photo and our AI analyzes distinctive features to
                  identify species with remarkable accuracy. Get detailed
                  information including scientific names, habitat details, and
                  geographic distribution powered by Google's Gemini.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features - 2x2 Grid */}
        <div className="mb-4">
          <h5
            className="fw-bold text-center mb-3"
            style={{ color: "var(--accent-blue)", fontSize: "1.1rem" }}
          >
            Key Features
          </h5>
          <div className="row g-2 justify-content-center">
            {keyFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="col-md-3 col-sm-6">
                <div
                  className="card no-hover h-100 border-0 shadow-sm"
                  style={{ borderRadius: "16px", background: "var(--dark-card)", border: "1px solid var(--dark-border) !important" }}
                >
                  <div className="card-body p-3 d-flex align-items-start gap-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "linear-gradient(135deg, rgba(63, 185, 80, 0.2), rgba(88, 166, 255, 0.2))",
                      }}
                    >
                      <Icon size={24} color="var(--accent-blue)" />
                    </div>
                    <div>
                      <h6
                        className="fw-bold mb-1"
                        style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}
                      >
                        {title}
                      </h6>
                      <p
                        className="mb-0"
                        style={{ fontSize: "0.8rem", lineHeight: "1.5", color: "var(--text-secondary)" }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack - Styled */}
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
            <BiCode size={20} color="var(--accent-blue)" />
            <h5
              className="fw-bold mb-0"
              style={{ color: "var(--accent-blue)", fontSize: "1.1rem" }}
            >
              Technology Stack
            </h5>
          </div>
          <div className="row g-3 justify-content-center">
            {[
              {
                icon: BiBrain,
                title: "AI Models",
                color: "#a855f7",
                bgColor: "rgba(168, 85, 247, 0.15)",
                items: [
                  "HuggingFace Transformers",
                  "BioCLIP Zero-Shot",
                  "Google Gemini AI",
                ],
              },
              {
                icon: BiServer,
                title: "Backend",
                color: "#58a6ff",
                bgColor: "rgba(88, 166, 255, 0.15)",
                items: ["Python FastAPI", "PyTorch & OpenCLIP", "Express.js"],
              },
              {
                icon: BiDesktop,
                title: "Frontend",
                color: "#3fb950",
                bgColor: "rgba(63, 185, 80, 0.15)",
                items: ["React + Vite", "Bootstrap CSS", "Responsive Design"],
              },
            ].map(({ icon: Icon, title, color, bgColor, items }) => (
              <div key={title} className="col-md-4">
                <div
                  className="card no-hover h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: "16px",
                    background: "var(--dark-card)",
                    border: "1px solid var(--dark-border) !important",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="px-3 py-2 d-flex align-items-center gap-2"
                    style={{ background: bgColor }}
                  >
                    <Icon size={20} color={color} />
                    <h6
                      className="fw-bold mb-0"
                      style={{ color: color, fontSize: "0.9rem" }}
                    >
                      {title}
                    </h6>
                  </div>
                  <div className="card-body p-3 pt-2">
                    <ul className="list-unstyled mb-0">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="d-flex align-items-center gap-2 mb-2"
                          style={{ fontSize: "0.85rem" }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: color,
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
