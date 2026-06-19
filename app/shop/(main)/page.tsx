import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Suspense } from "react";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ page?: string ; limit?: string }>;
}) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  // Simulate loading
  await new Promise((res) => setTimeout(res, 3000));
 const {data} = await axios.get(
  `http://localhost:5000/products?page=${page}&limit=${limit}`
);
  return (
    <div className="container mx-auto py-5">
      <div style={styles.controls}>
        <select style={styles.select}>
          <option>Sort: Featured</option>
          <option>Price: Low to High</option>
        </select>
      </div>
      <Suspense key={page} fallback={<div className="text-center text-gray-500">Loading products...</div>}>
        <div className="grid h-190 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-clip">
          {data.map((i: { id: number; thumbnail: string }) => (
            <div
              key={i.id}
              className="h-60 w-80 bg-white rounded hover:scale-105 transition-transform"
            >
              <Link
                href={`/shop/${i.id}`}
                className="flex justify-center items-center h-full w-full text-center leading-60 text-white font-semibold"
              >
                <Image src={i.thumbnail} alt="image" width={200} height={200} />
              </Link>
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  controls: {
    marginBottom: 30,
  },
  select: {
    padding: "6px 8px",
    borderRadius: 6,
    background: "#2a2a2a",
    color: "#eee",
    border: "1px solid #333",
  },
};
