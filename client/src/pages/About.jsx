import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { FaLinkedin } from "react-icons/fa";
import { BiSolidBinoculars, BiSolidMicrochip, BiSolidData, BiSolidMapAlt } from "react-icons/bi";

function About() {
    return (
        <div 
            className="page-transition"
            style={{ 
                background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
                minHeight: "100vh"
            }}
        >
            <div className="container py-5">
                <div className="text-center mb-5 fade-in">
                    <h1 
                        className="display-3 fw-bold mb-4"
                        style={{ 
                            color: "var(--nature-dark-green)",
                            letterSpacing: "2px",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
                        }}
                    >
                        🌿 About Nature Scan
                    </h1>
                    <p className="lead text-dark fs-4 mb-4" style={{ maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
                        Advanced AI-powered platform for identifying birds, plants, and animals. 
                        Explore nature with cutting-edge machine learning technology.
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
                        <span 
                            className="badge px-4 py-2 shadow-sm"
                            style={{ 
                                background: "linear-gradient(135deg, #2e7d32, #43a047)",
                                fontSize: "1rem",
                                borderRadius: "20px"
                            }}
                        >
                            🦅 500+ Bird Species
                        </span>
                        <span 
                            className="badge px-4 py-2 shadow-sm"
                            style={{ 
                                background: "linear-gradient(135deg, #2e7d32, #43a047)",
                                fontSize: "1rem",
                                borderRadius: "20px"
                            }}
                        >
                            🌸 Multiple Plant Species
                        </span>
                        <span 
                            className="badge px-4 py-2 shadow-sm"
                            style={{ 
                                background: "linear-gradient(135deg, #2e7d32, #43a047)",
                                fontSize: "1rem",
                                borderRadius: "20px"
                            }}
                        >
                            🦁 Animal Recognition
                        </span>
                        <span 
                            className="badge px-4 py-2 shadow-sm"
                            style={{ 
                                background: "linear-gradient(135deg, #2e7d32, #43a047)",
                                fontSize: "1rem",
                                borderRadius: "20px"
                            }}
                        >
                            ✨ AI-Powered
                        </span>
                    </div>
                </div>

                <div className="row g-4 justify-content-center mb-5">
                    <div className="col-md-8">
                        <div 
                            className="card border-0 shadow-lg slide-in-left"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)"
                            }}
                        >
                            <div className="card-body p-5">
                                <h2 
                                    className="mb-4 text-center fw-bold"
                                    style={{ color: "var(--nature-green)" }}
                                >
                                    🔬 How It Works
                                </h2>
                                <p className="card-text fs-5 mb-4" style={{ lineHeight: "1.8" }}>
                                    Our platform utilizes state-of-the-art deep learning models trained on extensive datasets. 
                                    Upload a photo and our AI analyzes distinctive features like patterns, shapes, and colors 
                                    to identify species with remarkable accuracy.
                                </p>
                                <p className="card-text fs-5" style={{ lineHeight: "1.8" }}>
                                    Beyond identification, Nature Scan provides detailed information including scientific names, 
                                    habitat details, geographic distribution, and fascinating facts about each species through 
                                    AI-generated insights powered by Google's Gemini.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-12 text-center mb-4">
                        <h2 
                            className="display-5 fw-bold fade-in"
                            style={{ color: "var(--nature-dark-green)" }}
                        >
                            ✨ Key Features
                        </h2>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div 
                            className="card h-100 border-0 shadow-lg text-center fade-in"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)",
                                animationDelay: "0.1s"
                            }}
                        >
                            <div className="card-body p-4">
                                <div 
                                    className="display-4 mb-3 pulse"
                                    style={{ color: "var(--nature-green)" }}
                                >
                                    <BiSolidBinoculars />
                                </div>
                                <h5 className="card-title fw-bold">Instant Recognition</h5>
                                <p className="card-text text-muted">Lightning-fast AI identifies species in seconds</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div 
                            className="card h-100 border-0 shadow-lg text-center fade-in"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)",
                                animationDelay: "0.2s"
                            }}
                        >
                            <div className="card-body p-4">
                                <div 
                                    className="display-4 mb-3 pulse"
                                    style={{ color: "var(--nature-green)" }}
                                >
                                    <BiSolidMicrochip />
                                </div>
                                <h5 className="card-title fw-bold">Advanced AI</h5>
                                <p className="card-text text-muted">Multiple specialized models for accurate classification</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div 
                            className="card h-100 border-0 shadow-lg text-center fade-in"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)",
                                animationDelay: "0.3s"
                            }}
                        >
                            <div className="card-body p-4">
                                <div 
                                    className="display-4 mb-3 pulse"
                                    style={{ color: "var(--nature-green)" }}
                                >
                                    <BiSolidData />
                                </div>
                                <h5 className="card-title fw-bold">Rich Information</h5>
                                <p className="card-text text-muted">Detailed data powered by Gemini AI</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div 
                            className="card h-100 border-0 shadow-lg text-center fade-in"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)",
                                animationDelay: "0.4s"
                            }}
                        >
                            <div className="card-body p-4">
                                <div 
                                    className="display-4 mb-3 pulse"
                                    style={{ color: "var(--nature-green)" }}
                                >
                                    <BiSolidMapAlt />
                                </div>
                                <h5 className="card-title fw-bold">Habitat Insights</h5>
                                <p className="card-text text-muted">Geographic and environmental information</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-12 text-center mb-4">
                        <h2 
                            className="display-5 fw-bold fade-in"
                            style={{ color: "var(--nature-dark-green)" }}
                        >
                            ⚙️ Technology Stack
                        </h2>
                    </div>
                    <div className="col-md-4">
                        <div 
                            className="card h-100 border-0 shadow-lg slide-in-left"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)"
                            }}
                        >
                            <div className="card-body p-4">
                                <h5 className="card-title fw-bold mb-4" style={{ color: "var(--nature-green)" }}>
                                    🤖 AI Models
                                </h5>
                                <ul className="list-unstyled">
                                    <li className="mb-3">🦅 Bird: HuggingFace Transformers</li>
                                    <li className="mb-3">🌿 Plant: Medicinal Plants Classifier</li>
                                    <li className="mb-3">🦁 Animal: BioCLIP Zero-Shot</li>
                                    <li>✨ Info: Google Gemini AI</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div 
                            className="card h-100 border-0 shadow-lg fade-in"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)",
                                animationDelay: "0.2s"
                            }}
                        >
                            <div className="card-body p-4">
                                <h5 className="card-title fw-bold mb-4" style={{ color: "var(--nature-green)" }}>
                                    ⚡ Backend
                                </h5>
                                <ul className="list-unstyled">
                                    <li className="mb-3">🐍 Python with FastAPI</li>
                                    <li className="mb-3">🔥 PyTorch & OpenCLIP</li>
                                    <li className="mb-3">🌐 Express.js middleware</li>
                                    <li>💾 JSON data storage</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div 
                            className="card h-100 border-0 shadow-lg slide-in-right"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)",
                                animationDelay: "0.4s"
                            }}
                        >
                            <div className="card-body p-4">
                                <h5 className="card-title fw-bold mb-4" style={{ color: "var(--nature-green)" }}>
                                    💻 Frontend
                                </h5>
                                <ul className="list-unstyled">
                                    <li className="mb-3">⚛️ React with Vite</li>
                                    <li className="mb-3">🎨 Bootstrap & Custom CSS</li>
                                    <li className="mb-3">📱 Fully Responsive</li>
                                    <li>✨ Smooth Animations</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5 justify-content-center">
                    <div className="col-12 text-center mb-4">
                        <h2 
                            className="display-5 fw-bold fade-in"
                            style={{ color: "var(--nature-dark-green)" }}
                        >
                            👥 Meet the Team
                        </h2>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div 
                            className="card border-0 shadow-lg text-center slide-in-left"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)"
                            }}
                        >
                            <div className="card-body p-5">
                                <div 
                                    className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center pulse"
                                    style={{ 
                                        width: "120px", 
                                        height: "120px",
                                        background: "linear-gradient(135deg, #2e7d32, #43a047)",
                                        boxShadow: "0 8px 20px rgba(46, 125, 50, 0.3)"
                                    }}
                                >
                                    <span className="h1 text-white m-0 fw-bold">DD</span>
                                </div>
                                <h4 className="card-title fw-bold mb-2">Devansh Deshpande</h4>
                                <p className="text-muted mb-2 fw-bold">Full Stack Developer</p>
                                <p className="card-text small text-muted mb-4">Roll No: 23BCE056</p>
                                <a 
                                    href="https://www.linkedin.com/in/devansh-deshpande-70982328b/" 
                                    className="btn btn-outline-success px-4 py-2 fw-bold"
                                    style={{ borderRadius: "50px", borderWidth: "2px" }}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedin className="me-2" /> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div 
                            className="card border-0 shadow-lg text-center slide-in-right"
                            style={{ 
                                borderRadius: "20px",
                                background: "rgba(255, 255, 255, 0.95)"
                            }}
                        >
                            <div className="card-body p-5">
                                <div 
                                    className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center pulse"
                                    style={{ 
                                        width: "120px", 
                                        height: "120px",
                                        background: "linear-gradient(135deg, #2e7d32, #43a047)",
                                        boxShadow: "0 8px 20px rgba(46, 125, 50, 0.3)"
                                    }}
                                >
                                    <span className="h1 text-white m-0 fw-bold">AB</span>
                                </div>
                                <h4 className="card-title fw-bold mb-2">Ayush Bhatnagar</h4>
                                <p className="text-muted mb-2 fw-bold">UI/UX Expert</p>
                                <p className="card-text small text-muted mb-4">Roll No: 23BTM007</p>
                                <a 
                                    href="https://www.linkedin.com/in/ayushbhatnagar2004/" 
                                    className="btn btn-outline-success px-4 py-2 fw-bold"
                                    style={{ borderRadius: "50px", borderWidth: "2px" }}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedin className="me-2" /> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;