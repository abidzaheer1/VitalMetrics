
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
	const searchParams = useSearchParams();
  const gender = searchParams.get('gender') || 'Unspecified';
	const router = useRouter();

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
    }
  };

  const handleAnalyze = async () => {
    if (bmi !== null) {
      router.push(`/fitness-advice?bmi=${bmi}&gender=${gender}`);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-semibold mb-4 text-primary">
        BMI Calculator
      </h1>
      <p className="text-lg mb-4 text-muted-foreground">
        Enter your height and weight to calculate your BMI.
      </p>
      <div className="flex flex-col space-y-2 w-80">
        <Input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Button onClick={calculateBMI} className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary">
          Calculate BMI
        </Button>
        {bmi !== null && (
          <div className="mt-4">
            <p className="text-xl font-semibold text-primary">
              Your BMI: {bmi.toFixed(2)}
            </p>
            <Button onClick={handleAnalyze} className="mt-2 bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              Analyze
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
