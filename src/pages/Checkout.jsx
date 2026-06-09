 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart, computeDiscount } = useCart();
  const navigate = useNavigate();
  const [ordered, setOrdered] = useState(false);

  if (cart.length === 0 && !ordered) {
    return (
      <div className="page-wrap">
        <div className="empty-state large">
          <div className="empty-icon">📦</div>
          <h2>Nothing to checkout</h2>
          <Link to="/" className="primary-btn">Shop Now</Link>
        </div>
      </div>
    );
  }

  if (ordered) {
    return (
      <div className="page-wrap">
        <div className="success-state">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with SmartCart.</p>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const {
    rawTotal,
    productDiscounts,
    cartDiscount,
    cheapestItem,
    cheapestDiscount,
    finalAmount,
  } = computeDiscount();

  const totalSaved = rawTotal - finalAmount;

  const handleOrder = () => {
    clearCart();
    setOrdered(true);
  };

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">Checkout</h1>
      </div>

      <div className="checkout-layout">
        {/* Cart Summary */}
        <div className="checkout-section">
          <h2 className="section-heading">Cart Summary</h2>
          <table className="checkout-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Subtotal</th>
                <th>Discount</th>
                <th>After Discount</th>
              </tr>
            </thead>
            <tbody>
              {productDiscounts.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{cart.find((c) => c.id === item.id)?.quantity}</td>
                  <td>₹{cart.find((c) => c.id === item.id)?.price.toLocaleString()}</td>
                  <td>₹{item.subtotal.toLocaleString()}</td>
                  <td className={item.discount > 0 ? "discount-cell" : ""}>
                    {item.discount > 0 ? `−₹${item.discount.toFixed(2)}` : "—"}
                  </td>
                  <td>₹{item.afterDiscount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Discount Breakdown */}
        <div className="checkout-section">
          <h2 className="section-heading">Applied Discounts</h2>

          <div className="discount-breakdown">
            {productDiscounts.some((d) => d.discount > 0) && (
              <div className="discount-row">
                <div className="discount-label">
                  <span className="discount-tag">Rule 1</span>
                  <span>10% off — Products with 3+ units</span>
                </div>
                <span className="discount-amount">
                  −₹{productDiscounts.reduce((s, d) => s + d.discount, 0).toFixed(2)}
                </span>
              </div>
            )}

            {cartDiscount > 0 && (
              <div className="discount-row">
                <div className="discount-label">
                  <span className="discount-tag">Rule 2</span>
                  <span>5% off — Cart total exceeded ₹5,000</span>
                </div>
                <span className="discount-amount">−₹{cartDiscount.toFixed(2)}</span>
              </div>
            )}

            {cheapestDiscount > 0 && cheapestItem && (
              <div className="discount-row">
                <div className="discount-label">
                  <span className="discount-tag">Special</span>
                  <span>50% off — Cheapest item ({cheapestItem.name})</span>
                </div>
                <span className="discount-amount">−₹{cheapestDiscount.toFixed(2)}</span>
              </div>
            )}

            {totalSaved === 0 && (
              <div className="no-discount-note">
                No discounts applied. Add 3+ units of a product or reach ₹5,000 cart value!
              </div>
            )}
          </div>
        </div>

        {/* Final Amount */}
        <div className="checkout-section final-box">
          <div className="final-row">
            <span>Original Total</span>
            <span>₹{rawTotal.toLocaleString()}</span>
          </div>
          <div className="final-row saved">
            <span>Total Savings</span>
            <span>−₹{totalSaved.toFixed(2)}</span>
          </div>
          <div className="final-row grand">
            <span>Final Payable Amount</span>
            <span>₹{finalAmount.toFixed(2)}</span>
          </div>

          <button className="primary-btn full-width place-order-btn" onClick={handleOrder}>
            Place Order 🎉
          </button>
          <Link to="/cart" className="back-link">← Back to Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;