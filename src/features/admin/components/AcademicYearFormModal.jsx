import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import {
  useCreateAcademicYear,
  useUpdateAcademicYear,
} from "../hooks/useAcademicYears";
import { LuCalendarDays } from "react-icons/lu";
import { useEffect } from "react";

export const AcademicYearFormModal = ({ isOpen, onClose, academicYear = null }) => {
  const isEditMode = !!academicYear;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      start_date: "",
      end_date: "",
      closure_date: "",
      final_closure_date: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && academicYear) {
      reset({
        name: academicYear.name || "",
        start_date: academicYear.start_date?.split("T")[0] || "",
        end_date: academicYear.end_date?.split("T")[0] || "",
        closure_date: academicYear.closure_date?.split("T")[0] || "",
        final_closure_date: academicYear.final_closure_date?.split("T")[0] || "",
      });
    } else {
      reset({
        name: "",
        start_date: "",
        end_date: "",
        closure_date: "",
        final_closure_date: "",
      });
    }
  }, [isEditMode, academicYear, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const {
    mutate: createAcademicYear,
    isPending: isCreating,
    error: createError,
  } = useCreateAcademicYear(handleClose);

  const {
    mutate: updateAcademicYear,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateAcademicYear(handleClose);

  const isPending = isCreating || isUpdating;
  const error = isEditMode ? updateError : createError;
  const apiErrors = error?.response?.data?.errors;

  const onSubmit = (payload) => {
    if (isEditMode) {
      updateAcademicYear({ id: academicYear.id, ...payload });
    } else {
      createAcademicYear(payload);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">
            {isEditMode ? "Edit Academic Year" : "Create New Academic Year"}
          </ModalHeader>
          <ModalBody className="gap-4">
            {/* Name */}
            <Input
              label="Name"
              labelPlacement="outside"
              placeholder="e.g. 2025-2026"
              startContent={
                <LuCalendarDays size={18} className="text-gray-500" />
              }
              isInvalid={!!errors.name || !!apiErrors?.name}
              errorMessage={errors.name?.message || apiErrors?.name?.[0]}
              {...register("name", {
                required: "Name is required",
              })}
            />

            {/* Start Date */}
            <Input
              label="Start Date"
              labelPlacement="outside"
              type="date"
              isInvalid={!!errors.start_date || !!apiErrors?.start_date}
              errorMessage={
                errors.start_date?.message || apiErrors?.start_date?.[0]
              }
              {...register("start_date", {
                required: "Start date is required",
              })}
            />

            {/* End Date */}
            <Input
              label="End Date"
              labelPlacement="outside"
              type="date"
              isInvalid={!!errors.end_date || !!apiErrors?.end_date}
              errorMessage={
                errors.end_date?.message || apiErrors?.end_date?.[0]
              }
              {...register("end_date", {
                required: "End date is required",
              })}
            />

            {/* Closure Date */}
            <Input
              label="Closure Date"
              labelPlacement="outside"
              type="date"
              description="Deadline for new submissions"
              isInvalid={!!errors.closure_date || !!apiErrors?.closure_date}
              errorMessage={
                errors.closure_date?.message || apiErrors?.closure_date?.[0]
              }
              {...register("closure_date", {
                required: "Closure date is required",
              })}
            />

            {/* Final Closure Date */}
            <Input
              label="Final Closure Date"
              labelPlacement="outside"
              type="date"
              description="Deadline for edits after initial submission"
              isInvalid={
                !!errors.final_closure_date || !!apiErrors?.final_closure_date
              }
              errorMessage={
                errors.final_closure_date?.message ||
                apiErrors?.final_closure_date?.[0]
              }
              {...register("final_closure_date", {
                required: "Final closure date is required",
              })}
            />
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
                  : "Create Academic Year"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
