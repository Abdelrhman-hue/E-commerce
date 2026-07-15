type SpinnerProps = {
  size?: number;
};

export default function Spinner({ size = 40 }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
}