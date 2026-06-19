"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ShopPage({ children }: { children: React.ReactNode }) {
  const categories = [
    { name: "Electronics", count: 412 },
    { name: "Fashion", count: 289 },
    { name: "Home & Living", count: 195 },
    { name: "Sports", count: 143 },
    { name: "Beauty", count: 98 },
  ];

  const brands = [
    { name: "Apple", count: 54 },
    { name: "Samsung", count: 47 },
    { name: "Sony", count: 31 },
    { name: "Nike", count: 28 },
  ];

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [rating, setRating] = useState<number | null>(null);
  const [inStock, setInStock] = useState<boolean>(true);

  // pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 12;
  const limit = 10;

  function toggleArrayItem(
    arr: string[],
    setter: (v: string[]) => void,
    value: string,
  ) {
    if (arr.includes(value)) setter(arr.filter((i) => i !== value));
    else setter([...arr, value]);
  }

  function getDisplayedPages(curr: number, total: number) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (curr <= 3) return [1, 2, 3, 4, "...", total];
    if (curr >= total - 2)
      return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", curr - 1, curr, curr + 1, "...", total];
  }

  const pagesToShow = getDisplayedPages(currentPage, totalPages);

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h3 style={styles.sectionTitle}>Category</h3>
        <div style={styles.section}>
          {categories.map((c) => (
            <label key={c.name} style={styles.row}>
              <input
                type="checkbox"
                checked={selectedCats.includes(c.name)}
                onChange={() =>
                  toggleArrayItem(selectedCats, setSelectedCats, c.name)
                }
                style={styles.checkbox}
              />
              <span style={styles.labelText}>{c.name}</span>
              <span style={styles.count}>{c.count}</span>
            </label>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>Price range</h3>
        <div style={styles.section}>
          <input
            type="range"
            min={0}
            max={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={styles.range}
          />
          <div style={styles.priceInputs}>
            <div style={styles.priceBox}>${minPrice}</div>
            <div style={{ width: 12 }} />
            <div style={styles.priceBox}>${maxPrice}</div>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Rating</h3>
        <div style={styles.section}>
          {[5, 4, 3].map((r) => (
            <label key={r} style={styles.row}>
              <input
                type="radio"
                name="rating"
                checked={rating === r}
                onChange={() => setRating(r)}
                style={styles.radio}
              />
              <span style={styles.stars}>
                {Array.from({ length: r }).map((_, i) => (
                  <span key={i} style={{ color: "#f5b334" }}>
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - r }).map((_, i) => (
                  <span key={i} style={{ color: "#777" }}>
                    ★
                  </span>
                ))}
              </span>
              <span style={styles.labelText}>{r}+ </span>
            </label>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>Brand</h3>
        <div style={styles.section}>
          {brands.map((b) => (
            <label key={b.name} style={styles.row}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.name)}
                onChange={() =>
                  toggleArrayItem(selectedBrands, setSelectedBrands, b.name)
                }
                style={styles.checkbox}
              />
              <span style={styles.labelText}>{b.name}</span>
              <span style={styles.count}>{b.count}</span>
            </label>
          ))}
        </div>

        <h3 style={styles.sectionTitle}>Availability</h3>
        <div style={styles.section}>
          <label style={styles.row}>
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
              style={styles.checkbox}
            />
            <span style={styles.labelText}>In stock</span>
          </label>
          <label style={styles.row}>
            <input
              type="checkbox"
              checked={!inStock}
              onChange={() => setInStock(!inStock)}
              style={styles.checkbox}
            />
            <span style={styles.labelText}>Out of stock</span>
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <a
            href="#"
            style={styles.clearLink}
            onClick={(e) => {
              e.preventDefault();
              setSelectedCats([]);
              setSelectedBrands([]);
              setMinPrice(0);
              setMaxPrice(1000);
              setRating(null);
              setInStock(true);
            }}
          >
            Clear all filters ↗
          </a>
        </div>
      </aside>

      <main style={styles.main}>
        <div style={styles.toolbar}>
          <h2 style={{ margin: 0 }}>Shop</h2>
        </div>

        <div style={styles.gridPlaceholder}>
          {/* هنا يعرض المنتجات - قمت بوضع عنصر نائب */}
          <div style={styles.productPlaceholder}>
            {children}
            <hr />
          </div>
        </div>

        {/* pagination */}
        <div style={styles.paginationWrap}>
          <div style={styles.pagination}>

            {pagesToShow.map((p, idx) => {
              if (p === "...") {
                return (
                  <span key={"e" + idx} style={styles.ellipsis}>
                    …
                  </span>
                );
              }
              const num = p as number;
              const active = num === currentPage;
              return (
                <Link
                  key={num}
                  href={`/shop?limit=${limit || 10}&page=${num}`}
                  onClick={() => {
                    setCurrentPage(num);
                  }}
                  style={
                    active
                      ? { ...styles.pageButton, ...styles.activePage }
                      : styles.pageButton
                  }
                >
                  {num}
                </Link>
                
              );

            })}
          </div>
        </div>
      </main>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  page: {
    display: "flex",
    gap: 24,
    padding: 24,
    background: "#111",
    minHeight: "100vh",
    color: "#ddd",
    fontFamily: "Inter, Arial, sans-serif",
  },
  sidebar: {
    width: 300,
    background: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.6)",
  },
  sectionTitle: {
    fontSize: 14,
    color: "#bbb",
    margin: "12px 0 8px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBottom: 8,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  radio: {
    width: 16,
    height: 16,
  },
  labelText: {
    flex: 1,
    color: "#eee",
  },
  count: {
    color: "#888",
    fontSize: 13,
  },
  range: {
    width: "100%",
    margin: "8px 0",
  },
  priceInputs: {
    display: "flex",
    alignItems: "center",
  },
  priceBox: {
    background: "#2b2b2b",
    padding: "8px 12px",
    borderRadius: 6,
    minWidth: 72,
    textAlign: "center",
    color: "#fff",
  },
  stars: {
    display: "inline-block",
    minWidth: 80,
  },
  clearLink: {
    color: "#6fb0ff",
    textDecoration: "none",
    fontSize: 13,
  },
  main: {
    flex: 1,
    background: "transparent",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  gridPlaceholder: {
    background: "#0f0f0f",
    borderRadius: 8,
    padding: 16,
    minHeight: 400,
  },
  productPlaceholder: {
    color: "#777",
  },

  /* pagination styles */
  paginationWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 18,
  },
  pagination: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
  },
  pageButton: {
    minWidth: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid #333",
    background: "#1b1b1b",
    color: "#ddd",
    cursor: "pointer",
    padding: "0 10px",
    fontSize: 14,
  },
  activePage: {
    background: "#FD9E02",
    color: "#fff",
    border: "1px solid rgba(0,0,0,0.2)",
  },
  ellipsis: {
    color: "#777",
    padding: "0 6px",
    minWidth: 12,
    textAlign: "center",
  },
};
