import axios from "axios";

const fallbackMessages: Record<number, string> = {
  400: "All fields are required",
  401: "Invalid credentials",
  403: "Verify your email first",
  404: "User not found",
  409: "Email already registered",
  500: "Server Error",
};

export function getAuthErrorMessage(error: unknown, fallback = "Server Error") {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    const status = error.response?.status;
    if (status && fallbackMessages[status]) {
      return fallbackMessages[status];
    }
  }

  return fallback;
}
