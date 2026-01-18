import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { historyAPI } from "../services/api";
import {
  BiUser,
  BiTrash,
  BiChevronLeft,
  BiChevronRight,
  BiHistory,
} from "react-icons/bi";

function UserAccount() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const recordsPerPage = 5;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetchz history using api
  const fetchHistory = async () => {
    try {
      setLoading(true);
      // func from api.js
      const data = await historyAPI.getHistory(currentPage, recordsPerPage);
      // console.log(data);
      setHistory(data.userHistory || []);
      setTotalPages(Math.ceil(data.totalCount / data.limit) || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // fetchz user history if user exists
  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user, currentPage]);

  const handleDelete = async (recordId) => {
    try {
      const res = await historyAPI.deleteRecord(recordId);
      if (res.ok) fetchHistory();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!user) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", background: "var(--dark-bg)" }}
      >
        <p style={{ color: "var(--text-secondary)" }}>
          Please log in to view your account.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`container-fluid page-transition ${
        isVisible ? "fade-in" : ""
      }`}
      style={{
        minHeight: "100vh",
        background: "var(--dark-bg)",
        padding: "40px 20px",
      }}
    >
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* User Profile */}
        <div
          className="border-0 p-4 mb-4"
          style={{ background: "var(--dark-card)", borderRadius: "10px" }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "var(--accent-blue)",
              }}
            >
              <BiUser size={30} color="white" />
            </div>
            <div>
              <h2 className="mb-1" style={{ color: "var(--text-primary)" }}>
                {user.displayName || user.email?.split("@")[0] || "User"}
              </h2>
              <p className="mb-0" style={{ color: "var(--text-secondary)" }}>
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* History */}
        <div
          className="border-0 p-4"
          style={{ background: "var(--dark-card)", borderRadius: "10px" }}
        >
          <div className="d-flex align-items-center gap-2 mb-4">
            <BiHistory size={24} color="var(--accent-blue)" />
            <h3 className="mb-0" style={{ color: "var(--text-primary)" }}>
              Scan History
            </h3>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                style={{ color: "var(--accent-blue)" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-5">
              <p style={{ color: "var(--text-secondary)" }}>
                No scan history yet. Start by uploading an image!
              </p>
            </div>
          ) : (
            <>
              <div className="d-flex flex-column gap-3">
                {history.map((record) => (
                  <div
                    key={record._id}
                    className="d-flex justify-content-between align-items-center p-3"
                    style={{
                      background: "var(--dark-surface)",
                      borderRadius: "8px",
                      border: "1px solid var(--dark-border)",
                    }}
                  >
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-3">
                        {record.prediction?.imageUrl && (
                          <img
                            src={record.prediction.imageUrl}
                            alt="Scan"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                        <div>
                          <h5
                            className="mb-1"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {record.prediction.label || "Unknown Species"}
                          </h5>
                          <p
                            className="mb-0"
                            style={{
                              color: "var(--text-secondary)",
                              fontSize: "0.85rem",
                            }}
                          >
                            {record.createdAt
                              ? new Date(record.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : "Date unknown"}
                          </p>
                          {record.prediction?.confidence && (
                            <p
                              className="mb-0 mt-1"
                              style={{
                                color: "var(--accent-green)",
                                fontSize: "0.8rem",
                              }}
                            >
                              Confidence: {record.prediction.confidence}
                            </p>
                          )}
                          <p
                            className="mb-0 mt-1"
                            style={{
                              color: "var(--text-muted)",
                              fontSize: "0.75rem",
                            }}
                          >
                            Model: {record.modelType}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(record._id)}
                      className="btn btn-sm"
                      style={{
                        background: "transparent",
                        border: "1px solid var(--dark-border)",
                        color: "var(--text-secondary)",
                        borderRadius: "8px",
                        padding: "8px 16px",
                      }}
                    >
                      <BiTrash size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="btn"
                    style={{
                      background:
                        currentPage === 1
                          ? "var(--dark-surface)"
                          : "var(--accent-blue)",
                      border: "none",
                      color: "white",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      opacity: currentPage === 1 ? 0.5 : 1,
                    }}
                  >
                    <BiChevronLeft size={20} />
                  </button>

                  <span style={{ color: "var(--text-primary)" }}>
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="btn"
                    style={{
                      background:
                        currentPage === totalPages
                          ? "var(--dark-surface)"
                          : "var(--accent-blue)",
                      border: "none",
                      color: "white",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      opacity: currentPage === totalPages ? 0.5 : 1,
                    }}
                  >
                    <BiChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
