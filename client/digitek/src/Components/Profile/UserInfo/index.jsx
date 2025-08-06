import { useEffect, useState } from "react";
import "./styles.css";

const UserInfo = () => {
  const [user, setUser] = useState({
    username: "Guest",
    email: "Not Available",
    created_at: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const formattedDate = user.created_at
    ? new Date(user.created_at).toDateString()
    : "N/A";

  return (
    <div className="customer-card">
      <div className="customer-header">
        <h2 className="customer-title">
          Welcome, <span className="customer-name">{user.username}</span>!
        </h2>
        <p className="customer-subtitle">
          We're delighted to have you on board.
        </p>
      </div>

      <div className="customer-info">
        <div className="info-item">
          <svg
            className="info-icon email-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
            />
          </svg>
          <div>
            <p className="info-label">Email</p>
            <p className="info-value">{user.email}</p>
          </div>
        </div>

        <div className="info-item">
          <svg
            className="info-icon calendar-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div>
            <p className="info-label">Date Joined</p>
            <p className="info-value">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
