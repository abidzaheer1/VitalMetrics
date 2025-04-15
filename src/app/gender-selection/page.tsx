
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function GenderSelection() {
  const router = useRouter();

  const handleGenderSelect = (gender: string) => {
    router.push(`/bmi-calculator?gender=${gender}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-semibold mb-4 text-primary">
        Select Your Gender
      </h1>
      <div className="flex space-x-4">
        <Button onClick={() => handleGenderSelect('Male')} className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary">
          Male
        </Button>
        <Button onClick={() => handleGenderSelect('Female')} className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary">
          Female
        </Button>
      </div>
    </div>
  );
}
