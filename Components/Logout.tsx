import { useRouter } from "next/navigation";
import api from "@/api/api";

interface LogoutProps {
  onLogout?: () => void;
}

export default function Logout({ onLogout }: LogoutProps) {
  const router = useRouter();

  function handleLogout() {
    api.post("/users/logout").then(() => {
      onLogout?.();
      router.refresh();
    });
  }

  return (
    <div>
      <button
        className="bg-red-500 text-white rounded-md px-4 py-2 cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
