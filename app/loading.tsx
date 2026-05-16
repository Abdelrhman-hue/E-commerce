export default function Loading() {
  return (
    <div className="space-y-8 p-4">
      {/* Hero Section */}
      <div className="h-64 bg-gray-300 rounded animate-pulse"></div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-300 rounded animate-pulse"></div>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="h-40 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 w-3/4"></div>
            <div className="h-4 bg-gray-300 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
