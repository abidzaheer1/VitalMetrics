"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
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

const BMIGauge = ({ bmi }: { bmi: number }) => {
  const getCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: '#FFCDD2' };
    if (bmi < 25) return { category: "Normal", color: '#A5D6A7' };
    if (bmi < 30) return { category: "Overweight", color: '#FFEB3B' };
    return { category: "Obese", color: '#F44336' };
  };

  const { category, color } = getCategory(bmi);

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-40 h-6 rounded-full overflow-hidden"
        style={{
          background: `linear-gradient(to right, 
            ${category === "Underweight" ? color : '#ddd'} 0%, 
            ${category === "Underweight" ? color : '#ddd'} ${Math.min(bmi, 18.5) / 40 * 100}%,
            ${category === "Normal" ? color : '#ddd'} ${Math.max(0, Math.min(bmi, 25) - 18.5) / 40 * 100 + (18.5 / 40 * 100)}%,
            ${category === "Normal" ? color : '#ddd'} ${Math.min(bmi, 25) / 40 * 100}%,
            ${category === "Overweight" ? color : '#ddd'} ${Math.max(0, Math.min(bmi, 30) - 25) / 40 * 100 + (25 / 40 * 100)}%,
            ${category === "Overweight" ? color : '#ddd'} ${Math.min(bmi, 30) / 40 * 100}%,
            ${category === "Obese" ? color : '#ddd'} ${Math.max(0, bmi - 30) / 40 * 100 + (30 / 40 * 100)}%,
            ${category === "Obese" ? color : '#ddd'} 100%)`
        }}
      />
      <div className="text-center mt-2">
        <p className="text-lg font-semibold">{bmi.toFixed(1)}</p>
        <p className="text-sm text-muted-foreground">{category}</p>
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
    <Suspense fallback={<div>Loading BMI Calculator...</div>}>
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
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
          <Button onClick={() => router.push(`/fitness-advice?bmi=${bmi}&gender=${gender}`)} className="mt-4 bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent border border-primary hover:border-transparent">
            Get Fitness Advice
          </Button>
          <Button className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary border border-primary hover:border-transparent" onClick={() => window.history.back()}>
            Back to Calculator
          </Button>
        </CardContent>
      </Card>
    </motion.div>
    </Suspense>
  );
};

export default BMICalculatorResults;
