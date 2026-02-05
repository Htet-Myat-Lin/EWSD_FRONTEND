import { Button, Spinner } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../api/services/auth-service";
import { toast } from "react-toastify";

export function HomePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  // Logout
  const { mutate } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: async() => {
      localStorage.removeItem("access_token");
      await queryClient.removeQueries({ queryKey: ["user"] })
      toast.success("Logout Successful");
    },
  });
  
  // Get User
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: AuthService.getUser,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-6">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <p className="text-lg text-gray-600">
        This is the main landing page of the application.
      </p>
      <Button onClick={() => navigate("/login")} color="primary">
        Login
      </Button>
      <Button onClick={() => navigate("/register")} color="secondary">
        Register
      </Button>
      <Button onClick={() => mutate()} color="danger">
        Logout
      </Button>
      {data?.user ? (
        <div className="mt-4 p-4 border rounded bg-white shadow">
          <h2 className="text-2xl font-semibold mb-2">User Info</h2>
          <p><strong>Name:</strong> {data.user.name}</p>
          <p><strong>Email:</strong> {data.user.email}</p>
        </div>
        ) : (
        <p className="mt-4 text-gray-500">No user data available.</p>
      )}
    </div>
  );
}
