"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const searchParams = useSearchParams();
  const gender = searchParams.get('gender') || 'Unspecified';
  const router = useRouter();

  const calculateBMI = () => {
    if (height && weight) {
      // Convert height from inches to meters (1 inch = 0.0254 meters)
      const heightInInches = parseFloat(height);
      const heightInMeters = heightInInches * 0.0254;

      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
      // Redirect to the BMI results page with calculated BMI
      router.push(`/bmi-results?bmi=${bmiValue.toFixed(2)}&gender=${gender}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-2/3 max-w-md">
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>
            Enter your height in inches and weight in kg to calculate your BMI.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="height">Height (inches)</Label>
            <Input
              type="number"
              id="height"
              placeholder="Height (inches)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
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
    </div>
  );
}
