"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShopPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = [
    { name: "furniture", count: 289 },
    { name: "groceries", count: 195 },
    { name: "beauty", count: 98 },
  ];

  const brands = [
    { name: "Apple", count: 54 },
    { name: "Samsung", count: 47 },
    { name: "Sony", count: 31 },
    { name: "Nike", count: 28 },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCats = searchParams.getAll("category");
  const selectedBrands = searchParams.getAll("brand");

  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 1000);

  const rating = Number(searchParams.get("rating")) || null;

  const inStock = searchParams.get("inStock") === "true";

  const currentPage = Number(searchParams.get("page") || 1);
  const params = new URLSearchParams(searchParams.toString());

  const num = Number(searchParams.get("num") || 5);
  const limit = Number(searchParams.get("limit") || 10);
  const totalPages = 12;

  params.set("page", String(num));
  params.set("limit", String(limit));

  const updateQuery = (
    key: string,
    value: string | number | boolean | string[],
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, String(value));
    }

    params.set("page", "1");

    router.push(`/shop?${params.toString()}`);
  };

  function getDisplayedPages(curr: number, total: number) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    if (curr <= 3) return [1, 2, 3, 4, "...", total];

    if (curr >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }

    return [1, "...", curr - 1, curr, curr + 1, "...", total];
  }

  const pagesToShow = getDisplayedPages(currentPage, totalPages);

  return (
    <>
      <div style={styles.page}>
        <aside style={styles.sidebar}>
          <h3 style={styles.sectionTitle}>Category</h3>

          <div style={styles.section}>
            {categories.map((c) => (
              <label key={c.name} style={styles.row}>
                <input
                  type="checkbox"
                  checked={selectedCats.includes(c.name)}
                  onChange={() => {
                    const cats = selectedCats.includes(c.name)
                      ? selectedCats.filter((i) => i !== c.name)
                      : [...selectedCats, c.name];

                    updateQuery("category", cats);
                  }}
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
              onChange={(e) =>
                updateQuery("maxPrice", Number(e.target.value))
              }
              style={styles.range}
            />

            <div style={styles.priceInputs}>
              <input
                type="number"
                value={minPrice}
                onChange={(e) =>
                  updateQuery("minPrice", Number(e.target.value))
                }
                style={styles.priceBox}
              />

              <div style={{ width: 12 }} />

              <input
                type="number"
                value={maxPrice}
                onChange={(e) =>
                  updateQuery("maxPrice", Number(e.target.value))
                }
                style={styles.priceBox}
              />
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
                  onChange={() => updateQuery("rating", r)}
                  style={styles.radio}
                />

                <span style={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < r ? "#f5b334" : "#777",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </span>

                <span style={styles.labelText}>{r}+</span>
              </label>
            ))}
          </div>

          <h3 style={styles.sectionTitle}>Availability</h3>

          <div style={styles.section}>
            <label style={styles.row}>
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => updateQuery("inStock", !inStock)}
                style={styles.checkbox}
              />

              <span style={styles.labelText}>In stock</span>
            </label>

            <label style={styles.row}>
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => updateQuery("inStock", !inStock)}
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
                router.push("/shop");
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
            <div style={styles.productPlaceholder}>
              {children}
            </div>
          </div>

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

                const page = p as number;
                const active = page === currentPage;

                const pageParams = new URLSearchParams(
                  searchParams.toString(),
                );

                pageParams.set("page", String(page));

                return (
                  <Link
                    key={page}
                    href={`/shop?${pageParams.toString()}`}
                    style={
                      active
                        ? {
                            ...styles.pageButton,
                            ...styles.activePage,
                          }
                        : styles.pageButton
                    }
                  >
                    {page}
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        @media (max-width: 900px) {
          div[style*="display: flex"] {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 768px) {
          aside {
            width: 100% !important;
          }

          main {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          input[type="number"] {
            width: 100%;
            min-width: 0 !important;
          }
        }
      `}</style>
    </>
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
    width: "100%",
  },

  sidebar: {
    width: 300,
    flexShrink: 0,
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
    width: "100%",
  },

  checkbox: {
    width: 16,
    height: 16,
    flexShrink: 0,
  },

  radio: {
    width: 16,
    height: 16,
    flexShrink: 0,
  },

  labelText: {
    flex: 1,
    color: "#eee",
    minWidth: 0,
  },

  count: {
    color: "#888",
    fontSize: 13,
    flexShrink: 0,
  },

  range: {
    width: "100%",
    margin: "8px 0",
  },

  priceInputs: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },

  priceBox: {
    background: "#2b2b2b",
    padding: "8px 12px",
    borderRadius: 6,
    minWidth: 72,
    width: "100%",
    textAlign: "center",
    color: "#fff",
    border: "1px solid #444",
  },

  stars: {
    display: "inline-block",
    minWidth: 80,
    flexShrink: 0,
  },

  clearLink: {
    color: "#6fb0ff",
    textDecoration: "none",
    fontSize: 13,
  },

  main: {
    flex: 1,
    minWidth: 0,
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
    width: "100%",
    overflow: "hidden",
  },

  productPlaceholder: {
    color: "#777",
    width: "100%",
  },

  paginationWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 18,
    width: "100%",
    overflowX: "auto",
  },

  pagination: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    flexShrink: 0,
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
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    textDecoration: "none",
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

