import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { increase, decrease, remove } = useCart();
  const subtotal = item.price * item.quantity;
  const isBulk = item.quantity >= 5;

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-img" />
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h3 className="cart-item-name">{item.name}</h3>
          {isBulk && <span className="bulk-badge">Bulk Purchase</span>}
        </div>
        <div className="cart-item-price">₹{item.price.toLocaleString()} / unit</div>
        <div className="cart-item-controls">
          <div className="qty-controls">
            <button
              className="qty-btn"
              onClick={() => decrease(item.id)}
              disabled={item.quantity === 1}
            >
              −
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button
              className="qty-btn"
              onClick={() => increase(item.id)}
              disabled={item.quantity === 10}
            >
              +
            </button>
          </div>
          <div className="cart-item-subtotal">₹{subtotal.toLocaleString()}</div>
          <button className="remove-btn" onClick={() => remove(item.id)}>
            🗑 Remove
          </button>
        </div>
        {item.quantity >= 3 && (
          <div className="discount-hint">🎉 10% discount applied (3+ units)</div>
        )}
        {item.quantity === 10 && (
          <div className="max-hint">⚠ Maximum quantity reached</div>
        )}
      </div>
    </div>
  );
};

export default CartItem;