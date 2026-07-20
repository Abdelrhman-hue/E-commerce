import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="mb-6">
        {" "}
        Product not found
        <br />
        This product may have been removed or the link is incorrect.
        <br />
      </div>

      <Link
        href="/shop"
        className="p-2 text-white text-lg bg-blue-500 rounded-lg mr-4"
      >
        Browse all products
      </Link>
      <Link href="/" className="p-2 text-white text-lg bg-blue-500 rounded-lg ">
        Go Home
      </Link>
    </div>
  );
}
