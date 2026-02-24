"use client";

import { Card, CardBody, Input, Textarea, Select, SelectItem, Spinner } from "@heroui/react";
import { useAcademicYears } from "../hooks/useAcademicYears";
import { useCategories } from "../hooks/useCategories";



export function DetailsForm({
  contributionType,
  formData,
  onFormDataChange,
}) {
  const { data: yearsRes, isPending: yearsLoading } = useAcademicYears();
  const { data: catsRes, isPending: catsLoading } = useCategories();

  const academicYears = yearsRes?.data ?? [];
  const categories = Array.isArray(catsRes) ? catsRes : [];
  const loadingDropdowns = yearsLoading || catsLoading;

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


          {/* Academic Year */}
          <Select
            label="Academic Year"
            placeholder={loadingDropdowns ? "Loading…" : "Select academic year"}
            selectedKeys={formData.academic_year_id ? [String(formData.academic_year_id)] : []}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0];
              onFormDataChange({ academic_year_id: selected });
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
            {academicYears.map((year) => (
              <SelectItem key={String(year.id)} textValue={year.name}>
                <div className="flex items-center justify-between gap-2">
                  <span>{year.name}</span>
                  {year.is_active && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Active
                    </span>
                  )}
                </div>
              </SelectItem>
            ))}
          </Select>

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
        </div>
      </CardBody>
    </Card>
  );
}
