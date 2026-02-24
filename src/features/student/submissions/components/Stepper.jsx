
export function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center gap-0 w-full overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-3">
            <div
              className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                step.number <= currentStep
                  ? "bg-[#1e3a5f] text-[#ffffff]"
                  : "border-2 border-[#cbd5e1] bg-[#ffffff] text-[#94a3b8]"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                step.number <= currentStep
                  ? "text-[#1a1a2e]"
                  : "text-[#94a3b8]"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`mx-2 sm:mx-4 h-0.5 w-8 sm:w-16 lg:w-24 flex-shrink-0 ${
                step.number < currentStep
                  ? "bg-[#1e3a5f]"
                  : "bg-[#e2e8f0]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
