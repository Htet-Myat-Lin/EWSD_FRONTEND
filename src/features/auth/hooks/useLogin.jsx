import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/api/services/auth-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: (credentials) => AuthService.login(credentials),
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        setUser(data?.user)
        navigate("/");
        toast.success("Login successful");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again.",
      );
    },
  });
};
