import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Products" },
    { to: "/cart", label: "Cart" },
    { to: "/checkout", label: "Checkout" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="nav-logo">🛒</span>
        <span className="nav-title">SmartCart</span>
      </div>
      <div className="nav-links">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
          >
            {link.label}
            {link.to === "/cart" && totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default ComponentName;;