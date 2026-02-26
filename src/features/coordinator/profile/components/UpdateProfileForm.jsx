import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Avatar,
} from "@heroui/react";
import { LuLock, LuEye, LuEyeOff, LuUser, LuImage } from "react-icons/lu";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useUpdatePassword } from "@/features/student/profile/hooks/useUpdatePassword";
import { useUpdateProfile } from "@/features/student/profile/hooks/useUpdateProfile";
import { resolveProfileImageUrl } from "@/utils/profile-image";

const MAX_PROFILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_PROFILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export function UpdateProfileForm() {
  const { user, setUser } = useAuth();
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const {
    register: registerProfile,
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfileForm,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      profile: undefined,
    },
  });

  const {
    register: registerPassword,
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    resetProfileForm({
      name: user?.name || "",
      profile: undefined,
    });
  }, [user?.name, resetProfileForm]);

  const profileFile = useWatch({ control: profileControl, name: "profile" })?.[0];
  const profilePreview = useMemo(() => {
    if (profileFile) {
      return URL.createObjectURL(profileFile);
    }
    return resolveProfileImageUrl(user?.profile_path);
  }, [profileFile, user?.profile_path]);

  useEffect(() => {
    if (!profilePreview || !profilePreview.startsWith("blob:")) return undefined;
    return () => URL.revokeObjectURL(profilePreview);
  }, [profilePreview]);

  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile(
    (updatedUser) => {
      if (updatedUser) {
        setUser(updatedUser);
        resetProfileForm({
          name: updatedUser.name || "",
          profile: undefined,
        });
      }
    },
  );

  const { mutate: updatePassword, isPending: isUpdatingPassword } =
    useUpdatePassword(() => {
      resetPasswordForm();
    });

  const onSubmitProfile = (data) => {
    if (!user?.id) return;

    const trimmedName = data.name?.trim() || "";
    const selectedFile = data.profile?.[0];
    const hasNameChanged = trimmedName !== (user?.name || "");

    if (!hasNameChanged && !selectedFile) {
      toast.info("No changes detected in profile details.");
      return;
    }

    const payload = {};
    if (hasNameChanged) payload.name = trimmedName;
    if (selectedFile) payload.profile_path = selectedFile;

    updateProfile({
      id: user.id,
      payload,
    });
  };

  const onSubmitPassword = (data) => {
    if (!user?.id) return;

    updatePassword({
      id: user.id,
      payload: {
        current_password: data.current_password,
        password: data.password,
        password_confirmation: data.password_confirmation,
      },
    });
  };

  const newPassword = useWatch({ control: passwordControl, name: "password" }) || "";

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 space-y-6">
      <Card className="w-full shadow-sm border border-gray-200">
        <CardHeader className="flex flex-col items-start px-6 pt-6 pb-4">
          <h3 className="text-xl font-bold text-gray-900">Profile Details</h3>
          <p className="text-sm text-gray-500 mt-1">
            Update your display name and photo for your account.
          </p>
        </CardHeader>

        <Divider />

        <CardBody className="px-6 py-6">
          <Form
            className="flex flex-col gap-6"
            onSubmit={handleProfileSubmit(onSubmitProfile)}
          >
            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar
                  src={profilePreview || undefined}
                  name={user?.name}
                  className="w-24 h-24 text-large ring-2 ring-blue-200"
                />
                <p className="text-xs text-gray-500">JPG/PNG up to 2MB</p>
              </div>

              <div className="flex-1 space-y-5">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  labelPlacement="outside"
                  startContent={<LuUser size={18} className="text-gray-500" />}
                  {...registerProfile("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 255,
                      message: "Name must not exceed 255 characters",
                    },
                  })}
                  isInvalid={!!profileErrors.name}
                  errorMessage={profileErrors.name?.message}
                />

                <div className="space-y-2">
                  <label
                    htmlFor="profile"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <LuImage size={16} />
                    Profile Photo
                  </label>
                  <input
                    id="profile"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                    {...registerProfile("profile", {
                      validate: (files) => {
                        const file = files?.[0];
                        if (!file) return true;
                        if (!ALLOWED_PROFILE_TYPES.includes(file.type)) {
                          return "Only JPG and PNG images are allowed";
                        }
                        if (file.size > MAX_PROFILE_SIZE) {
                          return "Profile photo must be less than 2MB";
                        }
                        return true;
                      },
                    })}
                  />
                  {profileErrors.profile && (
                    <p className="text-sm text-danger">{profileErrors.profile.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end">
              <Button
                type="submit"
                color="primary"
                isLoading={isUpdatingProfile}
                className="px-8 bg-blue-600 text-white font-medium"
              >
                Save Profile
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>

      <Card className="w-full shadow-sm border border-gray-200">
        <CardHeader className="flex flex-col items-start px-6 pt-6 pb-4">
          <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-500 mt-1">
            Update your account password to maintain security.
          </p>
        </CardHeader>

        <Divider />

        <CardBody className="px-6 py-6">
          <Form
            className="flex flex-col gap-6"
            onSubmit={handlePasswordSubmit(onSubmitPassword)}
          >
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
                {...registerPassword("current_password", {
                  required: "Current password is required",
                })}
                isInvalid={!!passwordErrors.current_password}
                errorMessage={passwordErrors.current_password?.message}
              />
            </div>

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
                {...registerPassword("password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 16,
                    message: "Password must not exceed 16 characters",
                  },
                })}
                isInvalid={!!passwordErrors.password}
                errorMessage={passwordErrors.password?.message}
              />
            </div>

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
                {...registerPassword("password_confirmation", {
                  required: "Please confirm your new password",
                  validate: (value) => value === newPassword || "Passwords do not match",
                })}
                isInvalid={!!passwordErrors.password_confirmation}
                errorMessage={passwordErrors.password_confirmation?.message}
              />
            </div>

            <div className="w-full flex justify-end mt-2">
              <Button
                type="submit"
                color="primary"
                isLoading={isUpdatingPassword}
                className="px-8 bg-blue-600 text-white font-medium"
              >
                Update Password
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
