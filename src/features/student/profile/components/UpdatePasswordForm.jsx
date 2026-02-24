import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Input, Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { LuLock, LuEye, LuEyeOff } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { useUpdatePassword } from "@/features/student/profile/hooks/useUpdatePassword";

export function UpdatePasswordForm() {
  const { user } = useAuth();
  
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { mutate: updatePassword, isPending } = useUpdatePassword(() => {
    reset(); // Clear form on success
  });

  const onSubmit = (data) => {
    if (user?.id) {
      updatePassword({
        id: user.id,
        payload: {
          current_password: data.current_password,
          password: data.password,
          password_confirmation: data.password_confirmation,
        },
      });
    }
  };

  const newPassword = watch("password", "");

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6 shadow-sm border border-gray-200">
      <CardHeader className="flex flex-col items-start px-6 pt-6 pb-4">
        <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
        <p className="text-sm text-gray-500 mt-1">
          Update your account password to maintain security.
        </p>
      </CardHeader>
      
      <Divider />
      
      <CardBody className="px-6 py-6">
        <Form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Current Password */}
          <div className="w-full">
            <Input
              label="Current Password"
              placeholder="Enter current password"
              labelPlacement="outside"
              type={isVisibleCurrent ? "text" : "password"}
              startContent={<LuLock size={18} className="text-gray-500" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setIsVisibleCurrent(!isVisibleCurrent)}
                  className="focus:outline-none"
                >
                  {isVisibleCurrent ? (
                    <LuEye size={18} className="text-gray-500 pointer-events-none" />
                  ) : (
                    <LuEyeOff size={18} className="text-gray-500 pointer-events-none" />
                  )}
                </button>
              }
              {...register("current_password", {
                required: "Current password is required",
              })}
              isInvalid={!!errors.current_password}
              errorMessage={errors.current_password?.message}
            />
          </div>

          {/* New Password */}
          <div className="w-full">
            <Input
              label="New Password"
              placeholder="Enter new password"
              labelPlacement="outside"
              type={isVisibleNew ? "text" : "password"}
              startContent={<LuLock size={18} className="text-gray-500" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setIsVisibleNew(!isVisibleNew)}
                  className="focus:outline-none"
                >
                  {isVisibleNew ? (
                    <LuEye size={18} className="text-gray-500 pointer-events-none" />
                  ) : (
                    <LuEyeOff size={18} className="text-gray-500 pointer-events-none" />
                  )}
                </button>
              }
              {...register("password", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 16,
                  message: "Password must not exceed 16 characters",
                }
              })}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
          </div>

          {/* Confirm New Password */}
          <div className="w-full">
            <Input
              label="Confirm New Password"
              placeholder="Confirm new password"
              labelPlacement="outside"
              type={isVisibleConfirm ? "text" : "password"}
              startContent={<LuLock size={18} className="text-gray-500" />}
              endContent={
                <button
                  type="button"
                  onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}
                  className="focus:outline-none"
                >
                  {isVisibleConfirm ? (
                    <LuEye size={18} className="text-gray-500 pointer-events-none" />
                  ) : (
                    <LuEyeOff size={18} className="text-gray-500 pointer-events-none" />
                  )}
                </button>
              }
              {...register("password_confirmation", {
                required: "Please confirm your new password",
                validate: (value) => 
                  value === newPassword || "Passwords do not match",
              })}
              isInvalid={!!errors.password_confirmation}
              errorMessage={errors.password_confirmation?.message}
            />
          </div>

          <div className="w-full flex justify-end mt-2">
            <Button
              type="submit"
              color="primary"
              isLoading={isPending}
              className="px-8 bg-blue-600 text-white font-medium"
            >
              Update Password
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
