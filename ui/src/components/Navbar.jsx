import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light text-white bg-success p-4">
            <div className="container-fluid">
                <h1 className="navbar-brand text-white fs-1" href="#">Feather Scan</h1>
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
                <div className="d-flex gap-3">
                    <Link to="/" className="btn btn-info rounded-pill fw-bold px-4 py-2 shadow-sm">Home</Link>
                    <Link to="/upload" className="btn btn-info rounded-pill fw-bold px-4 py-2 shadow-sm">Upload</Link>
                    <Link to="/about" className="btn btn-info rounded-pill fw-bold px-4 py-2 shadow-sm">About</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;