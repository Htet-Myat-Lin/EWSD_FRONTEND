import { Header } from "@/components/Header/Header";
import { Button } from "@heroui/react";

export function HomePage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-6">
        Home Page
      </div>
    </>
  );
}
