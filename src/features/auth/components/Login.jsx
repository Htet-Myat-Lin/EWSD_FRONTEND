import { Form, Input, Button, Spinner, Link } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Link as RouterLink } from "react-router-dom";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: login, isPending } = useLogin();

  const handleLogin = (data) => {
    login(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        <Form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="w-full">
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              labelPlacement="outside"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </div>

          <div className="w-full">
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              labelPlacement="outside"
              {...register("password", { required: "Password is required" })}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            color="primary"
            className="w-full mt-2"
            isLoading={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link as={RouterLink} to="/register" color="primary">
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
