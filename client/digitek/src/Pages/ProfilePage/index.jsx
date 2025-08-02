import "./styles.css";

function CustomerProfile() {
  return (
    <div className="customer-profile">
      <main className="main-container">
        {/* Customer & Shipping Details */}
        <div className="details-container">
          {/* Customer Details Card */}
          <div className="customer-card">
            <div className="customer-header">
              <h2 className="customer-title">
                Welcome, <span className="customer-name">Ali Al Saghir</span>!
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
                  <p className="info-value">ali@example.com</p>
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
                  <p className="info-value">Mon Jul 15 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="shipping-card">
            <div className="shipping-image">
              <img
                src="https://images.pexels.com/photos/6348105/pexels-photo-6348105.jpeg"
                alt="Shipping"
              />
            </div>

            <div className="shipping-details">
              <h2 className="shipping-title">Shipping Address Details</h2>
              <div className="shipping-info">
                <p>
                  <strong>Full Name:</strong> Ali Al Saghir
                </p>
                <p>
                  <strong>Address:</strong> Hamra Street
                </p>
                <p>
                  <strong>City:</strong> Beirut
                </p>
                <p>
                  <strong>Country:</strong> Lebanon
                </p>
                <p>
                  <strong>Phone:</strong> +961 71 234 567
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <h2 className="orders-title">Recent Orders</h2>
        <div className="orders-section">
          {/* Unpaid Order */}
          <div className="order-card">
            <div className="order-header">
              <div>
                <p className="order-meta">Order Number</p>
                <p className="order-number">#ORD123456</p>
              </div>

              <div>
                <p className="order-meta">Date Placed</p>
                <p className="order-date">July 20, 2024</p>
              </div>

              <div>
                <p className="order-meta">Total price</p>
                <p className="order-price">$3397.00</p>
              </div>
            </div>

            <div className="order-status-container">
              <div className="status-item">
                <span className="status-label">Status:</span>
                <span className="status-badge pending">Pending</span>
              </div>

              <div className="pay-button-container">
                <button className="pay-button">Pay Now</button>
              </div>
            </div>
          </div>

          {/* Paid Order */}
          <div className="order-card">
            <div className="order-header">
              <div>
                <p className="order-meta">Order Number</p>
                <p className="order-number">#ORD789012</p>
              </div>

              <div>
                <p className="order-meta">Date Placed</p>
                <p className="order-date">July 10, 2024</p>
              </div>

              <div>
                <p className="order-meta">Total price</p>
                <p className="order-price">$1699.00</p>
              </div>
            </div>

            <div className="order-status-container">
              <div className="status-item">
                <span className="status-label">Status:</span>
                <span className="status-badge completed">Completed</span>
              </div>

              <div className="status-item">
                <span className="status-label">Payment Status:</span>
                <span className="status-badge paid">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CustomerProfile;
