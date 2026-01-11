import { useState, useEffect } from "react";
import { login, loginWithGoogle } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { BiLeaf } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div 
      className="container-fluid d-flex align-items-center justify-content-center page-transition"
      style={{ 
        minHeight: "100vh",
        background: "linear-gradient(135deg, var(--dark-bg) 0%, var(--dark-surface) 50%, var(--dark-card) 100%)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div 
        className={`card border-0 shadow-lg no-hover ${isVisible ? 'fade-in' : ''}`}
        style={{ 
          maxWidth: "380px",
          width: "100%",
          borderRadius: "20px",
          background: "var(--dark-card)",
          border: "1px solid var(--dark-border) !important",
          backdropFilter: "blur(10px)",
          padding: "15px",
          margin: "15px",
          cursor: "default",
          transform: "none"
        }}
      >
        <div className="card-body p-3">
          {/* Header */}
          <div className="text-center mb-3">
            <div 
              style={{ 
                marginBottom: "10px"
              }}
            >
              <BiLeaf size={48} color="var(--accent-green)" />
            </div>
            <h2 
              className="fw-bold mb-1"
              style={{ 
                background: "linear-gradient(135deg, var(--accent-green), var(--accent-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.5px",
                fontSize: "1.5rem"
              }}
            >
              Welcome Back
            </h2>
            <p 
              style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
            >
              Sign in to continue
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleEmailLogin}>
            <div className="mb-2">
              <label 
                htmlFor="email" 
                className="form-label fw-semibold"
                style={{ color: "var(--accent-green)", fontSize: "0.9rem" }}
              >
                Email Address
              </label>
              <input
                id="email"
                className="form-control py-2"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                style={{
                  borderRadius: "12px",
                  background: "var(--dark-surface)",
                  border: "1px solid var(--dark-border)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent-blue)"}
                onBlur={(e) => e.target.style.borderColor = "var(--dark-border)"}
              />
            </div>

            <div className="mb-2">
              <label 
                htmlFor="password" 
                className="form-label fw-semibold"
                style={{ color: "var(--accent-green)", fontSize: "0.9rem" }}
              >
                Password
              </label>
              <input
                id="password"
                className="form-control py-2"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                style={{
                  borderRadius: "12px",
                  background: "var(--dark-surface)",
                  border: "1px solid var(--dark-border)",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--accent-blue)"}
                onBlur={(e) => e.target.style.borderColor = "var(--dark-border)"}
              />
            </div>

            <button 
              className="btn w-100 py-2 fw-bold mb-2 mt-3"
              type="submit"
              style={{
                background: "linear-gradient(135deg, var(--accent-green-dim) 0%, var(--accent-blue-dim) 100%)",
                border: "none",
                color: "white",
                borderRadius: "12px",
                fontSize: "1rem",
                letterSpacing: "0.5px",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                boxShadow: "0 4px 15px rgba(88, 166, 255, 0.2)"
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(88, 166, 255, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(88, 166, 255, 0.2)";
              }}
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="d-flex align-items-center my-2">
            <hr className="flex-grow-1" style={{ borderColor: "var(--dark-border)" }} />
            <span className="px-2" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>or</span>
            <hr className="flex-grow-1" style={{ borderColor: "var(--dark-border)" }} />
          </div>

          {/* Google Sign In */}
          <button
            className="btn w-100 py-2 fw-semibold"
            onClick={handleGoogleLogin}
            style={{
              background: "var(--dark-surface)",
              border: "1px solid var(--dark-border)",
              color: "var(--text-primary)",
              borderRadius: "12px",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "var(--dark-card)";
              e.target.style.borderColor = "var(--accent-blue)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 4px 15px rgba(88, 166, 255, 0.15)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "var(--dark-surface)";
              e.target.style.borderColor = "var(--dark-border)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
            }}
          >
            Continue with Google
          </button>

          {/* Error Message */}
          {error && (
            <div 
              className="alert mt-3 mb-0 fade-in"
              style={{
                background: "rgba(248, 81, 73, 0.15)",
                border: "1px solid #f85149",
                borderRadius: "12px",
                color: "#f85149",
                fontWeight: "500",
                fontSize: "0.9rem",
                padding: "10px 15px"
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
