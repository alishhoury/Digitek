import NavBar from "../../Components/Navbar";
import "./style.css";
import Statistic from "../../Components/Statistics";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminPage = () => {
  const orders = [
    {
      id: 1,
      customer: "Ali Al Saghir",
      products: [
        { name: "Ear buds", quantity: 1, price: 60.99 },
        { name: "Phone Case", quantity: 2, price: 20 }
      ],
      totalPrice: 80.99,
      status: "paid"
    },
    {
      id: 2,
      customer: "Ali Shhoury",
      products: [
        { name: "Ear buds", quantity: 1, price: 60.99 }
      ],
      totalPrice: 60.99,
      status: "packed"
    },
    {
      id: 3,
      customer: "Maroun Ghaya",
      products: [
        { name: "Phone Case", quantity: 1, price: 10 }
      ],
      totalPrice: 10,
      status: "shipped"
    }
  ]

  const ordersPerHour = [
    { id: 1, hour: 9, order_count: 10, revenue: 145.5 },
    { id: 2, hour: 12, order_count: 9, revenue: 134.5 },
    { id: 3, hour: 15, order_count: 14, revenue: 215.75 },
    { id: 4, hour: 18, order_count: 9, revenue: 140.25 },
    { id: 5, hour: 21, order_count: 4, revenue: 70.0 }
  ];
  
  const chartData = ordersPerHour.map(({ hour, order_count, revenue }) => ({
    hour: `${hour}:00`,
    orders: order_count,
    revenue,
  }));

  return (
    <div className="admin-page">
      <Statistic orders = {orders}/>
      <h3>Orders per Hour</h3>
      <div className="chart-container">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
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
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>
                {order.products.map((product, index) => (
                  <div key={index}>
                    {product.name} (x{product.quantity}){" "}
                    <strong>${product.price}</strong>
                  </div>
                ))}
              </td>
              <td>
                <strong>${order.totalPrice}</strong>
              </td>
              <td>{order.status}</td>
              <td>
                <select className="admin-select">
                  <option value="">Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;