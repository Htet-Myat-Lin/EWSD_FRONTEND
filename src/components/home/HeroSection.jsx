import { Image } from "@heroui/react";
import { Link } from "react-router-dom";
import { CgArrowRight } from "react-icons/cg";
import HeroStudent from '../../../public/hero-student.jpg'

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#eef4ff] via-[#f0f4ff] to-[#f8f9ff] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="flex flex-col gap-7">
            {/* Badge */}
            <div className="inline-flex w-fit">
              <span className="px-4 py-1.5 rounded-full bg-[#dbeafe] text-[#3b82f6] text-sm font-medium tracking-wide">
                Enterprise University Magazine Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-foreground leading-[1.12] tracking-tight text-balance">
              Secure Magazine Contribution Management for Universities
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Role-based system for managing{" "}
              <span className="text-[#3b82f6]">student submissions</span>,{" "}
              <span className="text-[#3b82f6]">faculty reviews</span>, and
              magazine compilation. Streamline your university&apos;s editorial
              process with automated workflows and secure document management.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-primary-foreground rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-colors duration-200 shadow-sm"
              >
                Login to System
                <CgArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column - Image + Stats Card */}
          <div className="relative">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full">
              <Image
                src={HeroStudent}
                alt="University student working on magazine submission"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Floating Stats Card */}
            <div
              className="mt-6 md:mt-0 w-full max-w-md md:w-96 mx-auto md:mx-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5 border border-border z-30
                         static md:absolute md:bottom-12 md:left-12 lg:left-16 xl:left-24
                         md:translate-y-1/3 md:-translate-x-6"
            >
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-4">
                {/* Avatar Stack */}
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#3b82f6] border-2 border-white" />
                  <div className="w-7 h-7 rounded-full bg-[#7c3aed] border-2 border-white" />
                  <div className="w-7 h-7 rounded-full bg-[#22c55e] border-2 border-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">12 New Submissions</p>
                  <p className="text-xs text-muted-foreground">Awaiting review</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 divide-x divide-border">
                <div className="flex flex-col items-center gap-0.5 pr-3">
                  <span className="text-xl font-bold text-[#3b82f6]">45</span>
                  <span className="text-xs text-muted-foreground">Articles</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 px-3 bg-[#f0fdf4] rounded-md">
                  <span className="text-xl font-bold text-[#22c55e]">28</span>
                  <span className="text-xs text-muted-foreground">Approved</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 pl-3">
                  <span className="text-xl font-bold text-[#7c3aed]">8</span>
                  <span className="text-xs text-muted-foreground">Pending</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
