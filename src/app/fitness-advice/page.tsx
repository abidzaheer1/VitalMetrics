"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
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

interface FitnessAdvice {
  category: string;
  advice: string;
  healthRisks: string;
  recommendedActions: string;
}

export default function FitnessAdvice() {
  const [advice, setAdvice] = useState<FitnessAdvice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const bmi = parseFloat(searchParams.get('bmi') || '0');
  const gender = searchParams.get('gender') || 'Unspecified';

  useEffect(() => {
    const fetchFitnessAdvice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/fitness-advice?bmi=${bmi}&gender=${gender}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data && data.advice) {
          setAdvice(data.advice);
        } else {
          setError("No specific advice found for your BMI and gender.");
        }
      } catch (e) {
        setError("Failed to load advice.");
        console.error("Failed to load advice:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFitnessAdvice();
  }, [bmi, gender]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <h1 className="text-3xl font-semibold mb-4 text-primary">
        Fitness Advice
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {advice && (
        <Card className="w-2/3">
          <CardHeader>
            <CardTitle>Your Personalized Advice</CardTitle>
            <CardDescription>Based on your BMI and gender.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <h2 className="text-xl font-semibold text-primary">Advice:</h2>
              <p className="text-muted-foreground">{advice.advice}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">Health Risks:</h2>
              <p className="text-muted-foreground">{advice.healthRisks}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">Recommended Actions:</h2>
              <p className="text-muted-foreground">{advice.recommendedActions}</p>
            </div>
          </CardContent>
        </Card>
      )}
      <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent" onClick={() => window.history.back()}>
        Back to Calculator
      </Button>
    </motion.div>
  );
}
