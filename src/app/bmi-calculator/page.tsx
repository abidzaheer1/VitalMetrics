"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>
            Enter your height and weight to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-col space-y-2">
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
        </CardContent>
      </Card>
    </div>
  );
}
