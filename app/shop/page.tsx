import Link from "next/link";

export default async function Shop() {
  // Simulate loading
  await new Promise(res => setTimeout(res, 3000));

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-6">Shop</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-40 w-36 bg-gray-400 rounded hover:scale-105 transition-transform">
            <Link href={`/product/${i}`} className="block h-full w-full">
              Product {i}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
