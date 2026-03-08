import { Header } from "@/components/header/Header";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import RoleBasedFeatures from "@/components/home/RoleBasedFeatures";
import SecurityCompliance from "@/components/home/SecurityCompliance";
import StatisticsPreview from "@/components/home/StatisticsPreview";
import Footer from "@/components/home/Footer";
import { Button } from "@heroui/react";

export function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <HowItWorks />
      <RoleBasedFeatures />
      <SecurityCompliance />
      <StatisticsPreview />
      <Footer />
    </>
  );
}
