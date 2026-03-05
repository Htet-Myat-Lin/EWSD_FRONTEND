import { Card, CardBody, Input, Textarea, Select, SelectItem, Spinner } from "@heroui/react";
import { useCategories } from "../hooks/useCategories";
import { useEffect, useState } from "react";
import { HiPhoto } from "react-icons/hi2";

export function DetailsForm({
  contributionType,
  formData,
  onFormDataChange,
  coverPhoto,
  onCoverPhotoChange,
  initialCoverPhotoUrl = null,
  initialCoverPhotoName = "Current cover photo",
  allowCoverPhotoRemoval = true,
}) {
  // const { data: yearsRes, isPending: yearsLoading } = useAcademicYears();
  const { data: catsRes, isPending: catsLoading } = useCategories();

  // const academicYears = yearsRes?.data ?? [];
  const allCategories = catsRes?.data ?? [];
  
  // Filter categories based on contribution type
  const categories = allCategories.filter((cat) => {
    if (contributionType === "article") {
      return cat.type === "article";
    } else if (contributionType === "photography") {
      return cat.type === "gallery";
    }
    return false;
  });
  
  const loadingDropdowns = catsLoading;
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onCoverPhotoChange(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeCoverPhoto = () => {
    onCoverPhotoChange(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <Card shadow="none" className="border border-[#e2e8f0]" radius="lg">
      <CardBody className="p-4 sm:p-6">
        <h2 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold text-[#1a1a2e]">
          {contributionType === "article"
            ? "Article Details"
            : "Photography Details"}
        </h2>

        <div className="flex flex-col gap-4 sm:gap-5">
          <Input
            label="Title"
            placeholder={
              contributionType === "article"
                ? "Enter your article title"
                : "Enter your photo title"
            }
            value={formData.title}
            onValueChange={(val) => onFormDataChange({ title: val })}
            variant="bordered"
            isRequired
            labelPlacement="outside"
            classNames={{
              label: "text-sm font-medium text-[#1a1a2e]",
              inputWrapper: "border-[#e2e8f0]",
            }}
          />

          {contributionType === "article" ? (
            <Textarea
              label="Abstract"
              placeholder="Provide a brief summary of your article (max 300 words)"
              value={formData.abstract}
              onValueChange={(val) => onFormDataChange({ abstract: val })}
              variant="bordered"
              isRequired
              labelPlacement="outside"
              minRows={4}
              classNames={{
                label: "text-sm font-medium text-[#1a1a2e]",
                inputWrapper: "border-[#e2e8f0]",
              }}
            />
          ) : (
            <Textarea
              label="Image Caption"
              placeholder="Describe your photograph"
              value={formData.description}
              onValueChange={(val) => onFormDataChange({ description: val })}
              variant="bordered"
              isRequired
              labelPlacement="outside"
              minRows={3}
              classNames={{
                label: "text-sm font-medium text-[#1a1a2e]",
                inputWrapper: "border-[#e2e8f0]",
              }}
            />
          )}

          {/* Category */}
          <Select
            label="Category"
            placeholder={loadingDropdowns ? "Loading…" : "Select a category"}
            selectedKeys={formData.category_id ? [String(formData.category_id)] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              onFormDataChange({ category_id: selected });
            }}
            variant="bordered"
            isRequired
            isDisabled={loadingDropdowns}
            labelPlacement="outside"
            startContent={loadingDropdowns ? <Spinner size="sm" /> : null}
            classNames={{
              label: "text-sm font-medium text-[#1a1a2e]",
              trigger: "border-[#e2e8f0]",
            }}
          >
            {categories.map((cat) => (
              <SelectItem key={String(cat.id)} textValue={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </Select>

          {/* Cover Photo Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#1a1a2e]">
              Cover Photo <span className="text-[#64748b] font-normal">(Optional)</span>
            </label>

            {!coverPhoto && initialCoverPhotoUrl && (
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-3">
                <div className="flex items-center gap-3">
                  <img
                    src={initialCoverPhotoUrl}
                    alt="Current cover"
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#1a1a2e]">
                      {initialCoverPhotoName}
                    </p>
                    <p className="text-xs text-[#64748b]">
                      Upload a new image to replace it.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!coverPhoto ? (
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#e2e8f0] bg-[#f8f9fb] px-4 py-6 transition-colors hover:border-[#3b82f6] hover:bg-[#eff6ff]">
                <HiPhoto className="h-10 w-10 text-[#94a3b8]" />
                <div className="text-center">
                  <p className="text-sm font-medium text-[#1a1a2e]">
                    {initialCoverPhotoUrl ? "Replace Cover Photo" : "Upload Cover Photo"}
                  </p>
                  <p className="mt-1 text-xs text-[#64748b]">
                    JPG, JPEG, PNG up to 2MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleCoverPhotoChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative rounded-lg border border-[#e2e8f0] bg-white p-3">
                <div className="flex items-center gap-3">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Cover preview"
                      className="h-16 w-16 rounded object-cover"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[#1a1a2e]">
                      {coverPhoto.name}
                    </p>
                    <p className="text-xs text-[#64748b]">
                      {(coverPhoto.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  {allowCoverPhotoRemoval && (
                    <button
                      type="button"
                      onClick={removeCoverPhoto}
                      className="rounded-lg bg-[#fee2e2] px-3 py-1.5 text-xs font-medium text-[#dc2626] transition-colors hover:bg-[#fecaca]"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
