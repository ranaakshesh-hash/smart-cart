import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];
const SORTS = [
  { label: "Default", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name A–Z", value: "name_asc" },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || p.category === category)
    );
    if (sort === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "name_asc") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, category, sort]);

  return (
    <div className="page-wrap">
      <div className="page-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">Quality picks for everyday life</p>
      </div>

      <div className="filters-bar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-group">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>No products found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;