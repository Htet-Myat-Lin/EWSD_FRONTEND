import { CgArrowRight } from "react-icons/cg";
import { FaBookOpen, FaCheckCircle, FaUpload } from "react-icons/fa";


const steps = [
  {
    number: "01",
    icon: <FaUpload className="w-6 h-6 text-white" />,
    iconBgColor: "bg-[#3b82f6]",
    borderColor: "border-[#dbeafe]",
    title: "Students Submit Articles",
    description:
      "Students upload their contributions with supporting documents before the deadline. System validates file formats and ensures proper metadata.",
  },
  {
    number: "02",
    icon: <FaCheckCircle className="w-6 h-6 text-white" />,
    iconBgColor: "bg-[#7c3aed]",
    borderColor: "border-[#e9d5ff]",
    title: "Faculty Review & Comment",
    description:
      "Marketing Coordinators review submissions within 14 days. They provide feedback, request revisions, or approve for publication.",
  },
  {
    number: "03",
    icon: <FaBookOpen className="w-6 h-6 text-white" />,
    iconBgColor: "bg-[#22c55e]",
    borderColor: "border-[#dcfce7]",
    title: "University Compiles Magazine",
    description:
      "Marketing Manager selects approved articles, arranges layout, and publishes the final magazine. System tracks all contributions and credits.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-[#f8fbff] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, streamlined process from submission to publication
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 ${step.borderColor} bg-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              {/* Number Badge */}
              <div className="absolute -top-3 -right-2 w-10 h-10 rounded-full bg-foreground text-white text-sm font-bold flex items-center justify-center">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-lg ${step.iconBgColor} flex items-center justify-center mb-6`}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-base text-muted-foreground mb-6">
            Ready to streamline your magazine contribution process?
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 text-[#3b82f6] font-semibold hover:text-[#1d4ed8] transition-colors duration-200 group">
            Get Started Today
            <CgArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
