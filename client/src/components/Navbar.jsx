import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../services/auth.js";
import {
  BiLeaf,
  BiHome,
  BiUpload,
  BiInfoCircle,
  BiLogOut,
} from "react-icons/bi";
// import { getAuth, getIdToken } from "firebase/auth";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // const triggerHistory = async () => {
  //   const auth = getAuth();
  //   const token = await getIdToken(auth.currentUser);
  //   const res = await fetch(`http://localhost:3000/history`, {
  //     method: "GET",
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // };


  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark p-3"
      style={{
        background:
          "linear-gradient(135deg, rgba(22, 27, 34, 0.98) 0%, rgba(33, 38, 45, 0.98) 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--dark-border)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand text-white fs-2 fw-bold d-flex align-items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <BiLeaf size={32} color="var(--accent-green)" />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--accent-green), var(--accent-blue))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nature Scan
          </span>
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
              to="/home"
              className={`btn rounded-pill fw-bold px-4 py-2 d-flex align-items-center gap-1 ${
                isActive("/home") ? "" : ""
              }`}
              style={{
                minWidth: "100px",
                background: isActive("/home")
                  ? "linear-gradient(135deg, var(--accent-green-dim), var(--accent-blue-dim))"
                  : "transparent",
                border: isActive("/home")
                  ? "none"
                  : "1px solid var(--dark-border)",
                color: "var(--text-primary)",
              }}
            >
              <BiHome size={18} /> Home
            </Link>
            <Link
              to="/upload"
              className="btn rounded-pill fw-bold px-4 py-2 d-flex align-items-center gap-1"
              style={{
                minWidth: "100px",
                background: isActive("/upload")
                  ? "linear-gradient(135deg, var(--accent-green-dim), var(--accent-blue-dim))"
                  : "transparent",
                border: isActive("/upload")
                  ? "none"
                  : "1px solid var(--dark-border)",
                color: "var(--text-primary)",
              }}
            >
              <BiUpload size={18} /> Upload
            </Link>
            <Link
              to="/about"
              className="btn rounded-pill fw-bold px-4 py-2 d-flex align-items-center gap-1"
              style={{
                minWidth: "100px",
                background: isActive("/about")
                  ? "linear-gradient(135deg, var(--accent-green-dim), var(--accent-blue-dim))"
                  : "transparent",
                border: isActive("/about")
                  ? "none"
                  : "1px solid var(--dark-border)",
                color: "var(--text-primary)",
              }}
            >
              <BiInfoCircle size={18} /> About
            </Link>
            <button
              className="btn rounded-pill fw-bold px-4 py-2 d-flex align-items-center gap-1"
              style={{
                minWidth: "100px",
                background: "transparent",
                border: "1px solid #f85149",
                color: "#f85149",
              }}
              onClick={logout}
            >
              <BiLogOut size={18} /> Logout
            </button>
            {/* <button onClick={triggerHistory}>history</button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
