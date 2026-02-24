import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useCreateUser } from "../hooks/useCreateUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useRoles } from "../hooks/useRoles";
import { useFaculties } from "../../faculty/hooks/useFaculty";
import {
  LuUser,
  LuMail,
  LuLock,
  LuSchool,
  LuShield,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";
import { useState, useEffect } from "react";

// Roles that do not require a faculty
const ROLES_WITHOUT_FACULTY = ["admin", "marketing_manager"];

export const UserFormModal = ({ isOpen, onClose, user = null }) => {
  const isEditMode = !!user;
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role_id: "",
      faculty_id: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        role_id: user.role_id ? String(user.role_id) : "",
        faculty_id: user.faculty_id ? String(user.faculty_id) : "",
        password: "",
        password_confirmation: "",
      });
    } else {
      reset({
        name: "",
        email: "",
        role_id: "",
        faculty_id: "",
        password: "",
        password_confirmation: "",
      });
    }
  }, [isEditMode, user, reset]);

  const { data: roles } = useRoles();
  const { data: faculties } = useFaculties();

  const handleClose = () => {
    reset();
    onClose();
  };

  const {
    mutate: createUser,
    isPending: isCreating,
    error: createError,
  } = useCreateUser(handleClose);

  const {
    mutate: updateUser,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateUser(handleClose);

  const isPending = isCreating || isUpdating;
  const error = isEditMode ? updateError : createError;

  // Watch selected role to conditionally show faculty
  const selectedRoleId = watch("role_id");
  const selectedRole = roles?.find(
    (r) => String(r.id) === String(selectedRoleId)
  );
  const needsFaculty =
    selectedRole && !ROLES_WITHOUT_FACULTY.includes(selectedRole.name);

  const onSubmit = (payload) => {
    if (isEditMode) {
      // Edit mode: only send changed profile fields (no password)
      const data = {
        id: user.id,
        name: payload.name,
        email: payload.email,
        role_id: Number(payload.role_id),
      };
      if (needsFaculty && payload.faculty_id) {
        data.faculty_id = Number(payload.faculty_id);
      }
      updateUser(data);
    } else {
      // Create mode: send all fields including password
      const data = {
        ...payload,
        role_id: Number(payload.role_id),
      };
      if (needsFaculty && payload.faculty_id) {
        data.faculty_id = Number(payload.faculty_id);
      } else {
        delete data.faculty_id;
      }
      createUser(data);
    }
  };

  // API validation errors
  const apiErrors = error?.response?.data?.errors;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            {isEditMode ? "Edit User" : "Create New User"}
          </ModalHeader>
          <ModalBody className="gap-4">
            {/* Full Name */}
            <Input
              label="Full Name"
              labelPlacement="outside"
              placeholder="Enter full name"
              startContent={<LuUser size={18} className="text-gray-500" />}
              isInvalid={!!errors.name || !!apiErrors?.name}
              errorMessage={errors.name?.message || apiErrors?.name?.[0]}
              {...register("name", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />

            {/* Email */}
            <Input
              label="Email"
              labelPlacement="outside"
              placeholder="user@university.edu"
              type="email"
              startContent={<LuMail size={18} className="text-gray-500" />}
              isInvalid={!!errors.email || !!apiErrors?.email}
              errorMessage={errors.email?.message || apiErrors?.email?.[0]}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />

            {/* Role */}
            <Controller
              name="role_id"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select
                  label="Role"
                  labelPlacement="outside"
                  placeholder="Select a role"
                  startContent={
                    <LuShield size={18} className="text-gray-500" />
                  }
                  isInvalid={!!errors.role_id || !!apiErrors?.role_id}
                  errorMessage={
                    errors.role_id?.message || apiErrors?.role_id?.[0]
                  }
                  selectedKeys={field.value ? [String(field.value)] : []}
                  onSelectionChange={(keys) => {
                    const val = Array.from(keys)[0];
                    field.onChange(val);
                  }}
                >
                  {(roles ?? []).map((role) => (
                    <SelectItem key={String(role.id)} value={String(role.id)}>
                      {role.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />

            {/* Faculty — only shown when role requires it */}
            {needsFaculty && (
              <Controller
                name="faculty_id"
                control={control}
                rules={{
                  required: needsFaculty ? "Faculty is required" : false,
                }}
                render={({ field }) => (
                  <Select
                    label="Faculty"
                    labelPlacement="outside"
                    placeholder="Select a faculty"
                    startContent={
                      <LuSchool size={18} className="text-gray-500" />
                    }
                    isInvalid={!!errors.faculty_id || !!apiErrors?.faculty_id}
                    errorMessage={
                      errors.faculty_id?.message || apiErrors?.faculty_id?.[0]
                    }
                    selectedKeys={field.value ? [String(field.value)] : []}
                    onSelectionChange={(keys) => {
                      const val = Array.from(keys)[0];
                      field.onChange(val);
                    }}
                  >
                    {(faculties ?? []).map((faculty) => (
                      <SelectItem
                        key={String(faculty.id)}
                        value={String(faculty.id)}
                      >
                        {faculty.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            )}

            {/* Password fields — only shown in create mode */}
            {!isEditMode && (
              <>
                <Input
                  label="Password"
                  labelPlacement="outside"
                  placeholder="Create a password"
                  type={isVisible ? "text" : "password"}
                  startContent={
                    <LuLock size={18} className="text-gray-500" />
                  }
                  endContent={
                    isVisible ? (
                      <LuEye
                        size={18}
                        className="text-gray-500 cursor-pointer"
                        onClick={toggleVisibility}
                      />
                    ) : (
                      <LuEyeOff
                        size={18}
                        className="text-gray-500 cursor-pointer"
                        onClick={toggleVisibility}
                      />
                    )
                  }
                  isInvalid={!!errors.password || !!apiErrors?.password}
                  errorMessage={
                    errors.password?.message || apiErrors?.password?.[0]
                  }
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />

                <Input
                  label="Confirm Password"
                  labelPlacement="outside"
                  placeholder="Re-enter password"
                  type={isVisible ? "text" : "password"}
                  startContent={
                    <LuLock size={18} className="text-gray-500" />
                  }
                  isInvalid={
                    !!errors.password_confirmation ||
                    !!apiErrors?.password_confirmation
                  }
                  errorMessage={
                    errors.password_confirmation?.message ||
                    apiErrors?.password_confirmation?.[0]
                  }
                  {...register("password_confirmation", {
                    required: "Password confirmation is required",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match",
                  })}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isPending}
              disabled={isPending}
            >
              {isPending
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                  ? "Save Changes"
                  : "Create User"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
