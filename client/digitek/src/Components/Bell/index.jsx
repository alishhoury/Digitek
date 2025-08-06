import { useState } from "react";
import bellIcon from "../../assets/bell.svg";
import api from "../../services/axios";
import "./style.css";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get("/notifications");
      console.log("Notifications fetched:", res.data);
      setNotifications(res.data);
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearNotifications = async () => {
    try {
      await api.delete("/notifications/clear");
      setNotifications([]);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  const toggleDropdown = () => {
    if (!open) {
      fetchNotifications();
    }
    setOpen(!open);
  };

  return (
    <div className="notBell-relative">
      <div
        onClick={toggleDropdown}
        className="notBell-cursor-pointer notBell-relative notBell-select-none"
        aria-label="Notifications"
      >
        <img src={bellIcon} alt="Notifications" className="notBell-icon" />
        {notifications.length > 0 && !open && (
          <span className="notBell-badge">{notifications.length}</span>
        )}
      </div>

      {open && (
        <div className="notBell-dropdown">
          <div className="notBell-header">
            <strong>Notifications</strong>
            <button onClick={clearNotifications} className="notBell-clear-btn">
              Clear All
            </button>
          </div>

          {loading && (
            <div className="notBell-loading">Loading notifications...</div>
          )}

          {!loading && notifications.length === 0 && (
            <div className="notBell-empty">No notifications</div>
          )}

          {!loading &&
            notifications.map((note, i) => (
              <div key={i} className="notBell-item">
                <strong>{note.data.title}</strong>
                <p>{note.data.message}</p>
                <small>{new Date(note.data.timestamp).toLocaleString()}</small>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
