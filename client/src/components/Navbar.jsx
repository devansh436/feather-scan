import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import { logout } from '../services/auth.js';

function Navbar() {
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;

    return (
        <nav 
            className="navbar navbar-expand-lg navbar-dark p-3"
            style={{
                background: "linear-gradient(135deg, rgba(46, 125, 50, 0.95) 0%, rgba(67, 160, 71, 0.95) 100%)",
                backdropFilter: "blur(10px)",
                borderBottom: "2px solid rgba(102, 187, 106, 0.5)",
                boxShadow: "0 4px 20px rgba(46, 125, 50, 0.3)"
            }}
        >
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-white fs-2 fw-bold d-flex align-items-center gap-2" style={{ textDecoration: "none" }}>
                    <span style={{ fontSize: "2rem" }}>🌿</span>
                    Nature Scan
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="ms-auto d-flex gap-2">
                        <Link 
                            to="/" 
                            className={`btn rounded-pill fw-bold px-4 py-2 ${
                                isActive('/') 
                                    ? 'btn-light text-success' 
                                    : 'btn-outline-light'
                            }`}
                            style={{ minWidth: "100px" }}
                        >
                            🏠 Home
                        </Link>
                        <Link 
                            to="/upload" 
                            className={`btn rounded-pill fw-bold px-4 py-2 ${
                                isActive('/upload') 
                                    ? 'btn-light text-success' 
                                    : 'btn-outline-light'
                            }`}
                            style={{ minWidth: "100px" }}
                        >
                            📤 Upload
                        </Link>
                        <Link 
                            to="/about" 
                            className={`btn rounded-pill fw-bold px-4 py-2 ${
                                isActive('/about') 
                                    ? 'btn-light text-success' 
                                    : 'btn-outline-light'
                            }`}
                            style={{ minWidth: "100px" }}
                        >
                            ℹ️ About
                        </Link>
                        <button 
                            to="/login" 
                            className={`btn rounded-pill fw-bold px-4 py-2 ${
                                isActive('/about') 
                                    ? 'btn-light text-success' 
                                    : 'btn-outline-light'
                            }`}
                            style={{ minWidth: "100px" }}
                            onClick={ logout }
                        >
                            📤 Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;