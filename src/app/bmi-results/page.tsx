"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ChartContainer, ChartLegend, ChartStyle } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
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

const BMIGauge = ({ bmi }: { bmi: number }) => {
  const getGaugeColor = (bmi: number) => {
    if (bmi < 18.5) return '#FFCDD2'; // Underweight
    if (bmi < 25) return '#A5D6A7'; // Normal
    if (bmi < 30) return '#FFEB3B'; // Overweight
    return '#F44336'; // Obese
  };

  const gaugeColor = getGaugeColor(bmi);
  const percentage = Math.min(bmi / 40, 1); // Cap at 40 for obese
  const angle = (1 - percentage) * 180;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  const arrowX = centerX + radius * Math.cos((angle * Math.PI) / 180);
  const arrowY = centerY + radius * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="w-64">
      <svg width="200" height="150">
        {/* Background Arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
          stroke="#F0F0F0"
          strokeWidth="10"
          fill="none"
        />
        {/* Value Arc */}
        <motion.path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${arrowX} ${arrowY}`}
          stroke={gaugeColor}
          strokeWidth="10"
          fill="none"
          initial={{ strokeDasharray: '0, 500' }}
          animate={{ strokeDasharray: `${percentage * 500}, 500` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        {/* Needle */}
        <motion.line
          x1={centerX}
          y1={centerY + 5}
          x2={arrowX}
          y2={arrowY}
          stroke="#333"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {/* Central Pivot */}
        <circle cx={centerX} cy={centerY + 5} r="3" fill="#333" />
        {/* BMI Value Text */}
        <text x={centerX} y={centerY - 30} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#555">
          {bmi.toFixed(1)}
        </text>
        <text x={centerX} y={centerY - 10} textAnchor="middle" fontSize="10" fill="#777">
          BMI
        </text>
      </svg>
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

  const data = [
    {
      "BMI Category": "Underweight",
      "BMI": 17.5,
    },
    {
      "BMI Category": "Normal",
      "BMI": 22,
    },
    {
      "BMI Category": "Overweight",
      "BMI": 27,
    },
    {
      "BMI Category": "Obese",
      "BMI": 32,
    }
  ]


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

          <ChartContainer config={{ BMI: { label: "BMI" } }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="BMI Category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="BMI" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>


          <Button onClick={() => router.push(`/fitness-advice?bmi=${bmi}&gender=${gender}`)} className="mt-4 bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent">
            Get Fitness Advice
          </Button>
          <Button className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary" onClick={() => window.history.back()}>
            Back to Calculator
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BMICalculatorResults;
