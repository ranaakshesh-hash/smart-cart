 
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart, clearCart, computeDiscount } = useCart();
  const { rawTotal, cartDiscount, cheapestItem, cheapestDiscount, finalAmount } = computeDiscount();

  if (cart.length === 0) {
    return (
      <div className="page-wrap">
        <div className="empty-state large">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/" className="primary-btn">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">Your Cart</h1>
        <button className="clear-btn" onClick={clearCart}>Clear All</button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary-box">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{rawTotal.toLocaleString()}</span>
          </div>
          {cartDiscount > 0 && (
            <div className="summary-row discount">
              <span>🎉 Cart Discount (5%)</span>
              <span>−₹{cartDiscount.toFixed(2)}</span>
            </div>
          )}
          {cheapestDiscount > 0 && cheapestItem && (
            <div className="summary-row discount">
              <span>🏷 Cheapest Item 50% Off<br/><small>({cheapestItem.name})</small></span>
              <span>−₹{cheapestDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{finalAmount.toFixed(2)}</span>
          </div>
          {rawTotal > 5000 && (
            <div className="discount-note">✅ You saved extra 5% on cart total above ₹5000!</div>
          )}
          <Link to="/checkout" className="primary-btn full-width">
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;