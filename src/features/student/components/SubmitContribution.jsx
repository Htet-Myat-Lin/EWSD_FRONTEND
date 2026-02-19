import { useState } from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { Stepper } from "./stepper";
import { TermsAndConditions } from "./TermsAndConditions";
import { DetailsForm } from "./DetailsForm";
import { UploadForm } from "./UploadForm";
import { ContributionTypeCard } from "./ContributionTypeCard";
import { HiCamera } from "react-icons/hi";
import { LuFileText } from "react-icons/lu";

const steps = [
  { number: 1, label: "Type & Terms" },
  { number: 2, label: "Details" },
  { number: 3, label: "Upload" },
];

export function SubmitContribution() {
  const [currentStep, setCurrentStep] = useState(1);
  const [contributionType, setContributionType] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    description: "",
    academic_year_id: "",
    category_id: "",
  });
  const [files, setFiles] = useState([]);

  const canProceedStep1 = contributionType && isAgreed;
  const textBodyFilled =
    contributionType === "article" ? formData.abstract : formData.description;
  const canProceedStep2 =
    formData.title && textBodyFilled && formData.academic_year_id && formData.category_id;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert("Contribution submitted successfully! Thank you for your submission.");
  };

  return (
    <main className="min-h-screen bg-[#f8f9fb]">
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
            Submit New Contribution
          </h1>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#64748b] leading-relaxed">
            Submit your article or photography for the 2025-2026 university
            magazine
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-6 sm:mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Step 1: Type & Terms */}
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Contribution Type Selection */}
            <Card shadow="none" className="border border-[#e2e8f0]" radius="lg">
              <CardBody className="p-4 sm:p-6">
                <h2 className="mb-4 sm:mb-5 text-lg sm:text-xl font-bold text-[#1a1a2e]">
                  Select Contribution Type
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2">
                  <ContributionTypeCard
                    icon={
                      <LuFileText className="h-8 w-8 sm:h-10 sm:w-10 text-[#3b82f6]" />
                    }
                    title="Article"
                    description="Submit research papers, projects, creative writing, or reviews"
                    bullets={[
                      "Word document required",
                      "Include title & abstract",
                    ]}
                    isSelected={contributionType === "article"}
                    onSelect={() => setContributionType("article")}
                  />
                  <ContributionTypeCard
                    icon={
                      <HiCamera className="h-8 w-8 sm:h-10 sm:w-10 text-[#3b82f6]" />
                    }
                    title="Photography"
                    description="Submit high-quality images and photographs"
                    bullets={[
                      "High quality image required",
                      "Image caption & title",
                    ]}
                    isSelected={contributionType === "photography"}
                    onSelect={() => setContributionType("photography")}
                  />
                </div>
              </CardBody>
            </Card>

            {/* Terms and Conditions — shown only after a type is selected */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                contributionType
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none h-0 overflow-hidden"
              }`}
            >
              <TermsAndConditions
                isAgreed={isAgreed}
                onAgreeChange={setIsAgreed}
              />
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <DetailsForm
            contributionType={contributionType}
            formData={formData}
            onFormDataChange={(data) =>
              setFormData((prev) => ({ ...prev, ...data }))
            }
          />
        )}

        {/* Step 3: Upload */}
        {currentStep === 3 && (
          <UploadForm
            contributionType={contributionType}
            files={files}
            onFilesChange={setFiles}
          />
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 sm:mt-8 flex items-center justify-between gap-3">
          <div>
            {currentStep > 1 && (
              <Button
                variant="bordered"
                onPress={handleBack}
                className="border-[#e2e8f0] text-[#1a1a2e]"
                radius="lg"
                size="md"
              >
                Back
              </Button>
            )}
          </div>
          <div>
            {currentStep < 3 ? (
              <Button
                color="primary"
                onPress={handleNext}
                isDisabled={currentStep === 1 ? !canProceedStep1 : !canProceedStep2}
                className="bg-[#1e3a5f] text-[#ffffff] text-xs sm:text-sm"
                radius="lg"
                size="md"
              >
                {currentStep === 1
                  ? "Continue to Details"
                  : "Continue to Upload"}
              </Button>
            ) : (
              <Button
                color="primary"
                onPress={handleSubmit}
                isDisabled={files.length === 0}
                className="bg-[#1e3a5f] text-[#ffffff] text-xs sm:text-sm"
                radius="lg"
                size="md"
              >
                Submit Contribution
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
