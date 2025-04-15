"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function GenderSelection() {
  const router = useRouter();

  const handleGenderSelect = (gender: string) => {
    router.push(`/bmi-calculator?gender=${gender}`);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className="w-2/3 max-w-md">
        <CardHeader>
          <CardTitle>Select Your Gender</CardTitle>
          <CardDescription>
            Choose your gender to tailor the BMI calculation.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-4 justify-center">
          <Button onClick={() => handleGenderSelect('Male')} className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Male
          </Button>
          <Button onClick={() => handleGenderSelect('Female')} className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Female
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

