import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UploadPage from "./pages/UploadPage.jsx";
import Home from "./pages/Home.jsx";
import Footer from "../src/components/Footer.jsx";
import About from "./pages/About.jsx";
import Navbar from "../src/components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // if user is logged in, allowed in
  // if user is null (logged out), return to login page
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Routes>
          {/* public path */}
          <Route path="/login" element={<Login />} />
          
          {/* private paths, only accessed if auth-ed user */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
