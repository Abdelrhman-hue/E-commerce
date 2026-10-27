"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  X,
  Filter,
} from "lucide-react";
import ProductsSkeleton from "@/app/admin/products/loading";
import api from "@/api/api";

type Category = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  id: string;
  title: string;
  description?: string;
  price: number;
  stock: number;
  images?: string[];
  thumbnail?: string;
  category?: Category | string;
};

const DEFAULT_PRODUCTS_PER_PAGE = 5;

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const pageParam = Number(searchParams.get("page") || 1);
  const limitParam = Number(
    searchParams.get("limit") || DEFAULT_PRODUCTS_PER_PAGE,
  );
  const currentPage = Number.isFinite(pageParam) ? Math.max(pageParam, 1) : 1;
  const productsPerPage = Number.isFinite(limitParam)
    ? Math.max(limitParam, 1)
    : DEFAULT_PRODUCTS_PER_PAGE;

  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const [deleting, setDeleting] = useState(false);

  /*
   * Fetch Products
   */

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        // Temporary demo data
        // await new Promise((resolve) => setTimeout(resolve, 700));

        const res = await api.get("/products", {
          params: {
            limit: productsPerPage,
            page: currentPage,
          },
        });
        const productsData = res.data.products ?? [];
        const total =
          res.data.totalProducts ??
          res.data.total ??
          res.data.count ??
          productsData.length;
        const pages =
          res.data.totalPages ??
          Math.max(Math.ceil(total / productsPerPage), 1);

        setProducts(productsData);
        setTotalProducts(total);
        setTotalPages(pages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [currentPage, productsPerPage]);

  /*
   * Categories
   */

  const categories = useMemo(() => {
    const categoryMap = new Map<string, string>();

    products.forEach((product) => {
      if (!product.category) return;

      if (typeof product.category === "string") {
        categoryMap.set(product.category, product.category);
      } else {
        categoryMap.set(product.category._id, product.category.name);
      }
    });

    return Array.from(categoryMap.entries()).map(([_id, name]) => ({
      _id,
      name,
    }));
  }, [products]);

  /*
   * Filter Products
   */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      let productCategory = "";

      if (typeof product.category === "string") {
        productCategory = product.category;
      } else if (product.category) {
        productCategory = product.category._id;
      }

      const matchesCategory =
        category === "all" || productCategory === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  /*
   * Pagination
   */

  const paginatedProducts = filteredProducts;

  const updatePage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("limit", String(productsPerPage));
      params.set("page", String(Math.min(Math.max(page, 1), totalPages)));

      router.push(`/admin/products?${params.toString()}`);
    },
    [productsPerPage, router, searchParams, totalPages],
  );

  /*
   * Delete Product
   */

  const handleDelete = async () => {
    if (!deleteProduct) return;

    try {
      setDeleting(true);
      
      await api.delete(`/products/delete/${deleteProduct._id}`);
      /*
      // Real API:

      */

      await new Promise((resolve) => setTimeout(resolve, 500));

      setProducts((prev) =>
        prev.filter((product) => product._id !== deleteProduct._id),
      );

      setDeleteProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeleting(false);
    }
  };

  /*
   * Product Image
   */

  const getProductImage = (product: Product) => {
    return product.thumbnail || product.images?.[0] || "/placeholder.png";
  };

  /*
   * Product Category
   */

  const getCategoryName = (product: Product) => {
    if (!product.category) return "Uncategorized";

    if (typeof product.category === "string") {
      return product.category;
    }

    return product.category.name;
  };

  /*
   * Stock Status
   */

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "bg-red-500/10 text-red-400 border-red-500/20",
      };
    }

    if (stock <= 20) {
      return {
        label: "Low Stock",
        className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      };
    }

    return {
      label: "In Stock",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
  };

  /*
   * Loading
   */

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Products
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
              Manage your store products
            </p>
          </div>

          <Link
            href="/admin/products/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>

        {/* Filters */}

        <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-500"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Category */}

            <div className="relative min-w-[200px]">
              <Filter
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500"
              >
                <option value="all">All Categories</option>

                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
              <Package size={26} className="text-zinc-500" />
            </div>

            <h2 className="text-lg font-semibold">No products found</h2>

            <p className="mt-2 text-sm text-zinc-500">
              Try changing your search or category filter.
            </p>

            {(search || category !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                }}
                className="mt-5 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wider text-zinc-500">
                      <th className="px-6 py-4 font-medium">Product</th>

                      <th className="px-6 py-4 font-medium">Category</th>

                      <th className="px-6 py-4 font-medium">Price</th>

                      <th className="px-6 py-4 font-medium">Stock</th>

                      <th className="px-6 py-4 font-medium">Status</th>

                      <th className="px-6 py-4 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-zinc-800">
                    {paginatedProducts.map((product) => {
                      const stockStatus = getStockStatus(product.stock);

                      return (
                        <tr
                          key={product._id}
                          className="group transition hover:bg-zinc-800/30"
                        >
                          {/* Product */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                                <Image
                                  src={getProductImage(product)}
                                  alt={product.title}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[250px] truncate font-medium text-white">
                                  {product.title}
                                </p>

                                <p className="mt-1 text-xs text-zinc-500">
                                  ID: {product._id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}

                          <td className="px-6 py-4">
                            <span className="rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-xs font-medium text-zinc-300">
                              {getCategoryName(product)}
                            </span>
                          </td>

                          {/* Price */}

                          <td className="px-6 py-4">
                            <span className="font-semibold text-white">
                              ${product.price.toFixed(2)}
                            </span>
                          </td>

                          {/* Stock */}

                          <td className="px-6 py-4">
                            <span className="text-sm text-zinc-300">
                              {product.stock}
                            </span>
                          </td>

                          {/* Status */}

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${stockStatus.className}`}
                            >
                              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-current" />
                              {stockStatus.label}
                            </span>
                          </td>

                          {/* Actions */}

                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/admin/products/edit/${product.id}`}
                                className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
                                title="Edit"
                              >
                                <Pencil size={17} />
                              </Link>

                              <button
                                onClick={() => setDeleteProduct(product)}
                                className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                                title="Delete"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}

            <div className="space-y-4 md:hidden">
              {paginatedProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);

                return (
                  <div
                    key={product._id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
                        <Image
                          src={getProductImage(product)}
                          alt={product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-white">
                          {product.title}
                        </h3>

                        <p className="mt-1 text-xs text-zinc-500">
                          {getCategoryName(product)}
                        </p>

                        <p className="mt-2 font-bold text-blue-400">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                      <div>
                        <p className="text-xs text-zinc-500">Stock</p>

                        <p className="mt-1 text-sm font-medium text-zinc-200">
                          {product.stock}
                        </p>
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${stockStatus.className}`}
                      >
                        {stockStatus.label}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      <button
                        onClick={() => setDeleteProduct(product)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-zinc-500">
                  Showing{" "}
                  <span className="font-medium text-zinc-300">
                    {(currentPage - 1) * productsPerPage + 1}
                  </span>{" "}
                  -{" "}
                  <span className="font-medium text-zinc-300">
                    {Math.min(currentPage * productsPerPage, totalProducts)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-zinc-300">
                    {totalProducts}
                  </span>{" "}
                  products
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => updatePage(currentPage - 1)}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => updatePage(page)}
                        className={`h-10 min-w-10 rounded-xl px-3 text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => updatePage(currentPage + 1)}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}

      {deleteProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Delete Product</h2>

                <p className="mt-1 text-sm text-zinc-500">
                  This action cannot be undone.
                </p>
              </div>

              <button
                onClick={() => !deleting && setDeleteProduct(null)}
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm text-zinc-300">
                Are you sure you want to delete
                <span className="font-semibold text-white">
                  {" "}
                  {deleteProduct.title}
                </span>
                ?
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                disabled={deleting}
                onClick={() => setDeleteProduct(null)}
                className="flex-1 rounded-xl border border-zinc-700 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                disabled={deleting}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={17} />

                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
