//src/composables/useLogout.js
import { useAuthHandlers } from "@/handlers/auth";

export default function useLogout() {
  const { handleLogout } = useAuthHandlers();

  return {
    handleLogout,
  };
}