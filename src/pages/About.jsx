import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { BiSolidBinoculars, BiSolidMicrochip, BiSolidData, BiSolidMapAlt } from "react-icons/bi";

function About() {
    return (
        <div style={{ backgroundColor: "#e8f5e9" }}>
            <Navbar />
            <div className="container py-3">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-success">About Feather Scan</h1>
                    <p className="lead text-muted">
                        The most advanced AI-powered bird species recognition platform, helping users identify over 500 bird species worldwide with 95% accuracy.
                    </p>
                    <div className="d-flex justify-content-center mt-4">
                        <span className="badge bg-success me-2">500+ Species</span>
                        <span className="badge bg-success me-2">95% Accurate</span>
                        <span className="badge bg-success">Free to Use</span>
                    </div>
                </div>

                <div className="row g-4 justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-success mb-4 text-center">How It Works</h2>
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <p className="card-text">
                                    Our platform utilizes a deep learning convolutional neural network trained on over 100k bird images. With just a single photo upload, our AI analyzes distinctive features like plumage patterns, beak shape, and size proportions to identify the species with remarkable accuracy.
                                </p>
                                <p className="card-text">
                                    Beyond identification, Feather Scan provides detailed information about habitat, migration patterns, conservation status, and bird calls for each species in our extensive database.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5 mt-4">
                    <h2 className="text-center text-success">Key Features</h2>
                    <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm text-center">
                            <div className="card-body p-4">
                                <div className="display-6 text-success mb-3">
                                    <BiSolidBinoculars />
                                </div>
                                <h5 className="card-title">Instant Recognition</h5>
                                <p className="card-text">Identify birds in under 5 seconds with our lightning-fast AI algorithm.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm text-center">
                            <div className="card-body p-4">
                                <div className="display-6 text-success mb-3">
                                    <BiSolidMicrochip />
                                </div>
                                <h5 className="card-title">Advanced AI</h5>
                                <p className="card-text">Our model is trained on 100k+ images across species for precise identification.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm text-center">
                            <div className="card-body p-4">
                                <div className="display-6 text-success mb-3">
                                    <BiSolidData />
                                </div>
                                <h5 className="card-title">Rich Information</h5>
                                <p className="card-text">Access detailed species data, bird calls, and conservation status.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card h-100 border-0 shadow-sm text-center">
                            <div className="card-body p-4">
                                <div className="display-6 text-success mb-3">
                                    <BiSolidMapAlt />
                                </div>
                                <h5 className="card-title">Location Insights</h5>
                                <p className="card-text">Get habitat information and migration patterns for each species.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5 mt-4">
                    <h2 className="text-center text-success">Technology Stack</h2>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title text-success">AI Model</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2">• ResNet-50 architecture</li>
                                    <li className="mb-2">• Trained on 100k+ bird images</li>
                                    <li className="mb-2">• 95% accuracy on validation set</li>
                                    <li>• Transfer learning with fine-tuning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title text-success">Backend</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2">• Python with FastAPI</li>
                                    <li className="mb-2">• Express JS for request handling</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h5 className="card-title text-success">Frontend</h5>
                                <ul className="list-unstyled">
                                    <li className="mb-2">• React.js with Express.js</li>
                                    <li className="mb-2">• Bootstrap for responsive design</li>
                                    <li className="mb-2">• PWA capabilities</li>
                                    <li>• Optimized for mobile devices</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mb-5 d-flex justify-content-center mt-4">
                    <h2 className="text-center  text-success">Meet the Team</h2>
                    <div className=" col-lg-3 col-md-6 mb-4">
                        <div className="card border-0 shadow-sm text-center">
                            <div className="card-body p-4">
                                <div className="rounded-circle bg-light mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "100px", height: "100px" }}>
                                    <span className="h1 text-success m-0">DD</span>
                                </div>
                                <h5 className="card-title">Devansh Deshpande</h5>
                                <p className="card-text text-muted mb-1">Full stack dev</p>
                                <p className="card-text small mb-3">Roll No: 23BCE056</p>
                                <div className="mt-3">
                                    <a href="https://www.linkedin.com/in/devansh-deshpande-70982328b/" className="btn btn-sm btn-outline-success me-2" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="me-1" /> LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100 border-0 shadow-sm text-center">
                            <div className="card-body p-4">
                                <div className="rounded-circle bg-light mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: "100px", height: "100px" }}>
                                    <span className="h1 text-success m-0">AB</span>
                                </div>
                                <h5 className="card-title">Ayush Bhatnagar</h5>
                                <p className="card-text text-muted mb-1">UI expert</p>
                                <p className="card-text small mb-3">Roll No: 23BTM007</p>
                                <div className="mt-3">
                                    <a href="https://www.linkedin.com/in/ayushbhatnagar2004/" className="btn btn-sm btn-outline-success me-2" target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="me-1" /> LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;