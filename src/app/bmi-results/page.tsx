"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const BMIGauge = ({ bmi }: { bmi: number }) => {
  const getGaugeColor = (bmi: number) => {
    if (bmi < 18.5) return '#FFCDD2'; // Underweight
    if (bmi < 25) return '#A5D6A7'; // Normal
    if (bmi < 30) return '#FFEB3B'; // Overweight
    return '#F44336'; // Obese
  };

  const gaugeColor = getGaugeColor(bmi);
  const percentage = Math.min(bmi, 40) / 40; // Cap at 40 for gauge display

  return (
    <div className="relative w-64 h-32">
      <svg className="transform -rotate-90" width="200" height="100" viewBox="0 0 200 100">
        <path
          d="M100,95 A95,95 0 0,1 5,5"
          stroke="#F0F0F0"
          strokeWidth="10"
          fill="none"
        />
        <path
          d={`M100,95 A95,95 0 0,1 ${100 + 95 * Math.cos(Math.PI * percentage)},${95 - 95 * Math.sin(Math.PI * percentage)}`}
          stroke={gaugeColor}
          strokeWidth="10"
          fill="none"
        />
        {/* Needle */}
        <line x1="100" y1="95" x2={100 + 80 * Math.cos(Math.PI * percentage)} y2={95 - 80 * Math.sin(Math.PI * percentage)} stroke="#333" strokeWidth="3" />
        <circle cx="100" cy="95" r="4" fill="#333" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-xl font-bold">{bmi.toFixed(1)}</span>
      </div>
    </div>
  );
};

const BMICalculatorResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bmi = parseFloat(searchParams.get('bmi') || '0');
  const gender = searchParams.get('gender') || 'Unspecified';
  const [bmiCategory, setBmiCategory] = useState("");
  const [healthyWeightRange, setHealthyWeightRange] = useState("");


  useEffect(() => {
    // Determine BMI category
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
    setBmiCategory(category);

    // Assuming a height of 69 inches (1.75 meters) for demonstration purposes
    const heightInMeters = 69 * 0.0254;
    const minHealthyWeight = (18.5 * Math.pow(heightInMeters, 2)).toFixed(1);
    const maxHealthyWeight = (24.9 * Math.pow(heightInMeters, 2)).toFixed(1);
    setHealthyWeightRange(`${minHealthyWeight} kg - ${maxHealthyWeight} kg`);
  }, [bmi]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-2/3 max-w-md">
        <CardHeader>
          <CardTitle>BMI Results</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <BMIGauge bmi={bmi} />
          <div className="text-center">
            <p className="text-xl">
              BMI = {bmi.toFixed(1)} kg/m² ({bmiCategory})
            </p>
          </div>
          <div>
            <ul className="list-disc pl-5">
              <li>Healthy BMI range: 18.5 kg/m² - 25 kg/m²</li>
              <li>Healthy weight for the height: {healthyWeightRange}</li>
              <li>BMI Prime: {(bmi / 25).toFixed(1)}</li>
            </ul>
          </div>
          <Button onClick={() => router.push(`/fitness-advice?bmi=${bmi}&gender=${gender}`)} className="mt-4 bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent">
            Get Fitness Advice
          </Button>
          <Button className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary" onClick={() => window.history.back()}>
            Back to Calculator
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BMICalculatorResults;
