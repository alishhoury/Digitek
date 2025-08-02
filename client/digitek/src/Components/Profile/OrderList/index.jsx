import "./styles.css";
const OrderList = () => {
  const orders = [
    {
      number: "#ORD123456",
      date: "July 20, 2024",
      price: "$3397.00",
      status: "Pending",
      isPaid: false,
    },
    {
      number: "#ORD789012",
      date: "July 10, 2024",
      price: "$1699.00",
      status: "Completed",
      isPaid: true,
    },
  ];

  return (
    <>
      <h2 className="orders-title">Recent Orders</h2>
      <div className="orders-section">
        {orders.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-header">
              <div>
                <p className="order-meta">Order Number</p>
                <p className="order-number">{order.number}</p>
              </div>
              <div>
                <p className="order-meta">Date Placed</p>
                <p className="order-date">{order.date}</p>
              </div>
              <div>
                <p className="order-meta">Total price</p>
                <p className="order-price">{order.price}</p>
              </div>
            </div>

            <div className="order-status-container">
              <div className="status-item">
                <span className="status-label">Status:</span>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              {order.isPaid ? (
                <div className="status-item">
                  <span className="status-label">Payment Status:</span>
                  <span className="status-badge paid">Paid</span>
                </div>
              ) : (
                <div className="pay-button-container">
                  <button className="pay-button">Pay Now</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderList;
