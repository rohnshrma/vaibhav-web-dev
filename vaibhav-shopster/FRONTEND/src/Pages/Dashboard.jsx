import ProductForm from "../ProductForm";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <p className="eyebrow">Shopster Admin</p>
        <h1>Product Dashboard</h1>
        <p className="dashboard-subtitle">
          Add new products to your catalog with the details customers need.
        </p>
      </header>

      <main className="dashboard-content">
        <ProductForm />
      </main>
    </div>
  );
};

export default Dashboard;
