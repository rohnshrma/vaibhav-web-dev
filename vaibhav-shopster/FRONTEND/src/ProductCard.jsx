const formatCurrency = (value) => {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const ProductCard = ({ product }) => {
  const imageSrc = product.imageUrl || product.url;

  return (
    <div className="col-md-6 mb-4">
      <article className="card product-card h-100">
        <div className="product-image-wrap">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={product.name}
              className="card-img-top product-image"
            />
          ) : (
            <div className="card-img-top product-image product-image-placeholder">
              No Image
            </div>
          )}
        </div>

        <div className="card-body product-card-body">
          <div className="product-title-row">
            <h2 className="card-title">{product.name}</h2>
            <p className="product-price">{formatCurrency(product.price)}</p>
          </div>

          <p className="card-text product-description">{product.description}</p>
        </div>

        <div className="card-footer product-card-footer">
          <span>Product ID : {product._id}</span>
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
