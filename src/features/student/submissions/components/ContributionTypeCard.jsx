"use client";

import { Card, CardBody } from "@heroui/react";

export function ContributionTypeCard({
  icon,
  title,
  description,
  bullets,
  isSelected,
  onSelect,
}) {
  return (
    <Card
      isPressable
      onPress={onSelect}
      className={`transition-all ${
        isSelected
          ? "border-2 border-[#3b82f6] bg-[#f0f5ff] shadow-md"
          : "border-2 border-dashed border-[#cbd5e1] bg-[#ffffff] hover:border-[#94a3b8]"
      }`}
      shadow="none"
      radius="lg"
    >
      <CardBody className="p-4 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <span className="[&>svg]:h-8 [&>svg]:w-8 sm:[&>svg]:h-10 sm:[&>svg]:w-10">
            {icon}
          </span>
        </div>
        <h3 className="mb-1.5 sm:mb-2 text-base sm:text-lg font-bold text-[#1a1a2e]">{title}</h3>
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-[#64748b] leading-relaxed">{description}</p>
        <ul className="flex flex-col gap-1 sm:gap-1.5">
          {bullets.map((bullet, i) => (
            <li key={i} className="text-xs sm:text-sm text-[#64748b]">
              {"- "}{bullet}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
