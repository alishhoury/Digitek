import './style.css';

const Statistic = ({ orders }) => {
    const totalOrders = orders.length;

    const paidOrders = orders.filter(order => order.status === 'paid').length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const packedOrders = orders.filter(order => order.status === 'packed').length;
    const shippedOrders = orders.filter(order => order.status === 'shipped').length;

    return (
        <div className="statistic-container">
            <div className="statistic-card">
                <div className="statistic-number">{totalOrders}</div>
                <div className="statistic-label">Total Orders</div>
            </div>
            <div className="statistic-card">
                <div className="statistic-number">{paidOrders}</div>
                <div className="statistic-label">Paid Orders</div>
            </div>
            <div className="statistic-card">
                <div className="statistic-number">{pendingOrders}</div>
                <div className="statistic-label">Pending Orders</div>
            </div>
            <div className="statistic-card">
                <div className="statistic-number">{packedOrders}</div>
                <div className="statistic-label">Packed Orders</div>
            </div>
            <div className="statistic-card">
                <div className="statistic-number">{shippedOrders}</div>
                <div className="statistic-label">Shipped Orders</div>
            </div>
        </div>
    );
};

export default Statistic;