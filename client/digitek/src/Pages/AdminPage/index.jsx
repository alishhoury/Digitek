import NavBar from "../../Components/Navbar";
import "./style.css";
import Statistic from "../../Components/Statistics";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect } from "react";
import api from "../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrders,
  setUpdatingId,
} from "../../features/dashboard/dashboardSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { orders, updatingId } = useSelector((global) => global.dashboard);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await api.get("/orders", {
          withCredentials: true,
        });
        dispatch(setOrders(response.data));
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getOrders();
  }, [dispatch]);

  const handleStatusChange = async (orderId, newStatus) => {
    dispatch(setUpdatingId(orderId));
    try {
      await api.put(
        `/orders/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      dispatch(setOrders(updatedOrders));
    } catch (error) {
      console.error("Failed to update status", error);
    } finally {
      dispatch(setUpdatingId(null));
    }
  };

  const ordersPerHour = [
    { id: 1, hour: 9, order_count: 10, revenue: 145.5 },
    { id: 2, hour: 12, order_count: 9, revenue: 134.5 },
    { id: 3, hour: 15, order_count: 14, revenue: 215.75 },
    { id: 4, hour: 18, order_count: 9, revenue: 140.25 },
    { id: 5, hour: 21, order_count: 4, revenue: 70.0 },
  ];

  const chartData = ordersPerHour.map(({ hour, order_count, revenue }) => ({
    hour: `${hour}:00`,
    orders: order_count,
    revenue,
  }));

  const statusSteps = ["pending", "paid", "packed", "shipped"];

  return (
    <div className="admin-page">
      <Statistic orders={orders} />
      <h3>Orders per Hour</h3>
      <div className="chart-container">
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis yAxisId="left" orientation="left" stroke="#116466" />
            <YAxis yAxisId="right" orientation="right" stroke="#c95e12ff" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="orders"
              stroke="#116466"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#c95e12ff"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h3>Incoming Orders</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const currentIndex = statusSteps.indexOf(order.status);
            const availableStatuses = statusSteps.slice(currentIndex);

            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user?.username || "Customer"}</td>
                <td>
                  {order.products?.map((product, index) => (
                    <div key={index}>
                      {product.name} (x{product.pivot?.quantity}) -{" "}
                      <strong>${product.pivot?.price}</strong>
                    </div>
                  ))}
                </td>
                <td>
                  <strong>${order.total_price}</strong>
                </td>
                <td>
                  <span className="current-status">{order.status}</span>
                </td>
                <td>
                  {order.status === "shipped" ? (
                    <span className="final-label">Finalized</span>
                  ) : (
                    <select
                      className="admin-select"
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                    >
                      {availableStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
