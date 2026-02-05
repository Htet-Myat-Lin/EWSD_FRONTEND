import { Form, Input, Button, Spinner } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AuthService } from "../api/services/auth-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
  });

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  // Register
  const { isPending, mutate, error } = useMutation({
    mutationFn: AuthService.register,
    onError: (err) => {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    },
    onSuccess: async(data) => {
      localStorage.setItem("access_token", data.access_token)
      reset()
      await queryClient.invalidateQueries({ queryKey: ["user"] })
      navigate("/")
      toast.success("Registration successful! You can now log in.");
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form
        className="w-full max-w-xs flex flex-col gap-4 p-8 shadow-md rounded-2xl bg-white"
        onSubmit={handleSubmit((payload) => mutate(payload))}
      >
        <h1 className="text-2xl font-bold mb-4">Register Here</h1>

        {/* Api Response Error */}
        {error && (
            <p className="text-red-500 text-sm">{error?.response?.data?.message || "Internal Server Error"}</p>
        )}

        <Input
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username"
          type="text"
          {...register("name")}
        />

        <Input
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          {...register("email")}
        />

        <Input
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="password"
          {...register("password")}
        />

        <Input
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Confirm your password"
          type="password"
          {...register("password_confirmation")}
        />

        <Button
          disabled={isPending}
          color="primary"
          type="submit"
          className="w-full"
        >
          {isPending ? <Spinner size="sm" color="default" /> : "Register"}
        </Button>
      </Form>
    </div>
  );
}
