import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const outOfStock = product.stock === 0;

  return (
    <div className={`product-card ${outOfStock ? "out-of-stock" : ""}`}>
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} className="product-img" />
        {outOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
        <span className="category-tag">{product.category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <span className={`stock-info ${product.stock === 0 ? "no-stock" : product.stock <= 5 ? "low-stock" : ""}`}>
            {product.stock === 0
              ? "Out of stock"
              : product.stock <= 5
              ? `Only ${product.stock} left`
              : `${product.stock} in stock`}
          </span>
        </div>
        <button
          className={`add-btn ${inCart ? "in-cart" : ""} ${outOfStock ? "disabled" : ""}`}
          onClick={() => !outOfStock && addToCart(product)}
          disabled={outOfStock}
        >
          {outOfStock ? "Unavailable" : inCart ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ComponentName;