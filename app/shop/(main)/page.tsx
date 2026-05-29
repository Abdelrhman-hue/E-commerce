import Link from "next/link";

export default async function Shop() {
  // Simulate loading
  await new Promise((res) => setTimeout(res, 3000));

  return (
    <div className="container mx-auto py-5">
      <div style={styles.controls}>
        <select style={styles.select}>
          <option>Sort: Featured</option>
          <option>Price: Low to High</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-60 w-80 bg-gray-400 rounded hover:scale-105 transition-transform"
          >
            <Link
              href={`/shop/${i}`}
              className="block h-full w-full text-center leading-60 text-white font-semibold"
            >
              Product {i}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  controls: {
    marginBottom: 30
  },
  select: {
    padding: "6px 8px",
    borderRadius: 6,
    background: "#2a2a2a",
    color: "#eee",
    border: "1px solid #333",
  },
};
