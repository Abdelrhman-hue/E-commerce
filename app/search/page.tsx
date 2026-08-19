import ProductCard from "@/Components/ProductCard";
import api from "@/api/api";
import Notfound from "@/Components/NotFound";

type Product = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  images?: string[];
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

async function getSearchResults(q: string | undefined) {
  const { data } = await api.get("/products", {
    params: {
      q,
    },
  });

  return {
    products: (data?.products ?? []) as Product[],
    count: data?.count ?? 0,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: searchQuery } = await searchParams;
  const q = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;
  const { products, count } = await getSearchResults(q);

  return (
    <>
      {count > 0 ? (
        <div>
          <h1 className=" m-4 p-1 ">Search: {q}</h1>
          <h3 className="m-4 ">Results: {count}</h3>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ml-6 mb-6 mr-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  title: product.title,
                  description: product.description,
                  price: product.price,
                  oldPrice: product.oldPrice,
                  category: product.category,
                  images: product.images,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="not-found">
          <Notfound />
        </div>
      )}
    </>
  );
}
