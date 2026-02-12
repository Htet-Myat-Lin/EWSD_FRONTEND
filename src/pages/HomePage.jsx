import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
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
    </div>
  );
}
