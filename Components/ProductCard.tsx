import Image from "next/image";
import Link from "next/link";

type ProductProps = {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    images?: string[];
    category?: string;
  };
};

export default function ProductCard({ product }: ProductProps) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-700 bg-[#262626] transition hover:border-blue-500 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-zinc-800">
        <Image
          src={product.images?.[0] ?? "/placeholder.png"}
          alt={product.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-4">
        {product.category && (
          <span className="text-xs uppercase tracking-wide text-blue-400">
            {product.category}
          </span>
        )}

        <h3 className="line-clamp-1 text-lg font-semibold text-white">
          {product.title}
        </h3>

        <p className="line-clamp-2 text-sm text-zinc-400">
          {product.description}
        </p>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">${product.price}</span>

          {product.oldPrice && (
            <span className="text-sm text-zinc-500 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>

        <div className="rounded-xl border border-zinc-600 px-4 py-2 text-sm text-white transition group-hover:bg-white group-hover:text-black">
          More Details
        </div>
      </div>
    </Link>
  );
}
