import { Form, Input, Button, Spinner, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFaculties } from "../../faculty/hooks/useFaculty";

export function Register() {

  // React Hook Form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      faculty_id: "",
    },
    onChange: true
  });

  // Fetch faculty data
  const { data: faculties } = useFaculties()

  // user registration mutation hook
  const { mutate, isPending, error, isSuccess } = useRegister()

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  // Handle form submission
  const handleRegister = (payload) => {
    mutate(payload)
  }

  // Error Message from API
  const errMsg = error?.response?.data ? Object.values(error.response.data.errors).flat().join(" ") : "Internal Server Error"

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form
        className="w-full max-w-sm flex flex-col gap-4 p-8 shadow-md rounded-2xl bg-white"
        onSubmit={handleSubmit(handleRegister)}
      >
        <h1 className="text-2xl font-bold mb-4">Register Here</h1>

        {/* Api Response Error */}
        {error && (
          <p className="text-red-500 text-sm">
            {errMsg}
          </p>
        )}

        {/* Username */}
        <div className="w-full">
          <Input
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
            {...register("name", {
              required: "Username is required",
              minLength: {
                value: 2,
                message: "Username must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="w-full">
          <Input
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu|ac)(\.[a-z]{2,3})?$/i,
                message: "Please enter a valid .edu email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="w-full">
          <Input
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="w-full">
          <Input
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Confirm your password"
            type="password"
            {...register("password_confirmation", {
              required: "Password confirmation is required",
              validate: (value, formValues) => {
                return (
                  value === formValues.password || "Passwords do not match"
                );
              },
            })}
          />
          {errors.password_confirmation && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password_confirmation.message}
            </p>
          )}
        </div>

        {/* Faculty */}
        <div className="w-full">
          <Select
              className="max-w-xs"
              label="Faculty"
              labelPlacement="outside-top"
              placeholder="Select your faculty"
              {...register("faculty_id", {
                required: "Faculty is required",
              })}
            >
              {faculties?.map((faculty) => (
                <SelectItem value={faculty.id} key={faculty.id}>{faculty.name}</SelectItem>
              ))}
            </Select>
            {errors.faculty_id && (
            <p className="text-red-500 text-xs mt-1">
              {errors.faculty_id.message}
            </p>
          )}
        </div>

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
