"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

export default function BMICalculator() {
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender') || 'Unspecified';
  const router = useRouter();

  const calculateBMI = () => {
    if (feet && inches && weight) {
      // Convert height to inches
      const totalInches = (parseFloat(feet) * 12) + parseFloat(inches);

      // Convert height from inches to meters (1 inch = 0.0254 meters)
      const heightInMeters = totalInches * 0.0254;

      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
      // Redirect to the BMI results page with calculated BMI
      router.push(`/bmi-results?bmi=${bmiValue.toFixed(2)}&gender=${gender}`);
    }
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
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>
            Enter your height in feet and inches, and weight in kg to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="feet">Height (feet)</Label>
            <Input
              type="number"
              id="feet"
              placeholder="Feet"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="inches">Height (inches)</Label>
            <Input
              type="number"
              id="inches"
              placeholder="Inches"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              type="number"
              id="weight"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <Button onClick={calculateBMI} className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Calculate BMI
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
