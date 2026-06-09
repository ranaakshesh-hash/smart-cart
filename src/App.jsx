import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Products from "./pages/Products";

const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<Loader />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={<Loader />}>
                  <Checkout />
                </Suspense>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;