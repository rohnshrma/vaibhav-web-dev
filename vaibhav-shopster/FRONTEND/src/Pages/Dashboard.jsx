import ProductForm from "../ProductForm";
import ProductCard from "../ProductCard";
import useProducts from "../../hooks/useProduct";

const Dashboard = () => {
  const { isLoading, products, error, fetchProducts } = useProducts();

  return (
    <div className="admin-dashboard">
      <div className="container">
        <header className="dashboard-header">
          <p className="eyebrow">Shopster Admin</p>
          <h1>Product Dashboard</h1>
          <p className="dashboard-subtitle">
            Add new products to your catalog with the details customers need.
          </p>
        </header>

        <main>
          <div className="row">
            <div className="col-lg-5 mb-4">
              <ProductForm fetchProducts={fetchProducts} />
            </div>

            <div className="col-lg-7">
              <div className="products-panel">
                <div className="products-panel-header">
                  <div>
                    <p className="eyebrow">Inventory</p>
                    <h2>Products</h2>
                  </div>
                  <span className="product-count">{products.length}</span>
                </div>

                {isLoading && <h2 className="status-text">Loading...</h2>}
                {error && <h2 className="status-text">{error.message}</h2>}
                {!isLoading && !error && products.length > 0 && (
                  <div className="product-scroll-frame">
                    <section className="row product-list" aria-label="Products">
                      {products.map((product) => {
                        return (
                          <ProductCard product={product} key={product._id} />
                        );
                      })}
                    </section>
                  </div>
                )}
                {!isLoading && !error && products.length === 0 && (
                  <p className="status-text">No products found.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
