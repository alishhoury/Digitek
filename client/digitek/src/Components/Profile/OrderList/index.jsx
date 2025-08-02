import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import api from "../../../services/axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/getUserOrders");
        const userOrders = response.data.payload;

        const mappedOrders = userOrders.map(order => ({
          number: `${order.order_number}`,
          date: new Date(order.created_at).toDateString(),
          price: `$${parseFloat(order.total_price).toFixed(2)}`,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
        }));

        setOrders(mappedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <h2 className="orders-title">Recent Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-section">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-header">
                <div>
                  <p className="order-meta">Order Number</p>
                  <p className="order-number">#{order.number}</p>
                </div>
                <div>
                  <p className="order-meta">Date Placed</p>
                  <p className="order-date">{order.date}</p>
                </div>
                <div>
                  <p className="order-meta">Total Price</p>
                  <p className="order-price">{order.price}</p>
                </div>
              </div>

              <div className="order-status-container">
                <div className="status-item">
                  <span className="status-label">Status:</span>
                  <span
                    className={`status-badge ${
                      order.status.toLowerCase() == "paid"
                        ? "completed"
                        : order.status.toLowerCase()
                    }`}
                  >
                    {order.status.toLowerCase() == "paid"
                      ? "completed"
                      : order.status}
                  </span>
                </div>

                {order.status.toLowerCase() != "pending" ? (
                  <div className="status-item">
                    <span className="status-label">Payment Status:</span>
                    <span className="status-badge paid">Paid</span>
                  </div>
                ) : (
                  <div className="pay-button-container">
                    <Link
                      to={`/payment/${order.number}`}
                      className="pay-button"
                    >
                      Pay Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderList;
