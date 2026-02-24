import React from "react";
import { LuGraduationCap, LuCheck } from "react-icons/lu";
import authSideImage from "../../assets/auth-side-panel.jpg";

export default function AuthSidePanel() {
  return (
    <div className="hidden lg:flex flex-col relative w-full h-full text-white overflow-hidden">
      {/* 1. Background Image */}
      <img
        src={authSideImage}
        alt="University Library"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Gradient Overlay (The Purple Tint) */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900/90 via-purple-900/85 to-blue-900/90 z-0" />

      {/* 3. Content Wrapper */}
      <div className="relative z-10 flex flex-col justify-between h-full p-12">
        
        {/* --- Top: Brand/Logo --- */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
            <LuGraduationCap size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">University</h2>
            <p className="text-xs text-white/70 uppercase tracking-wider">Magazine Portal</p>
          </div>
        </div>

        {/* --- Middle: Hero Text --- */}
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Share Your <br />
            Story With <br />
            The World
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Join thousands of students contributing to our annual university 
            magazine. Your voice matters, your ideas inspire.
          </p>
        </div>

        {/* --- Bottom: Features List --- */}
        <div className="space-y-6">
          <FeatureItem 
            title="Easy Submission" 
            desc="Upload articles and images with just a few clicks" 
          />
          <FeatureItem 
            title="Expert Feedback" 
            desc="Receive guidance from faculty coordinators" 
          />
          <FeatureItem 
            title="Get Published" 
            desc="See your work featured in the annual magazine" 
          />
        </div>
      </div>
    </div>
  );
}

// Helper Component for the list items
const FeatureItem = ({ title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 border border-white/10 backdrop-blur-md">
      <LuCheck size={16} />
    </div>
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/60">{desc}</p>
    </div>
  </div>
);