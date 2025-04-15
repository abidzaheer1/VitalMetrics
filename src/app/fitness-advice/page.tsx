
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { generateFitnessAdvice } from "@/ai/flows/generate-fitness-advice";

export default function FitnessAdvice() {
  const [advice, setAdvice] = useState({
    advice: "Loading...",
    healthRisks: "Loading...",
    recommendedActions: "Loading...",
  });
	const searchParams = useSearchParams();
  const bmi = parseFloat(searchParams.get('bmi') || '0');
  const gender = searchParams.get('gender') || 'Unspecified';

  useEffect(() => {
    const fetchFitnessAdvice = async () => {
      try {
        const fitnessAdvice = await generateFitnessAdvice({ bmiScore: bmi, gender: gender as "Male" | "Female" });
        setAdvice(fitnessAdvice);
      } catch (error) {
        console.error("Failed to generate fitness advice:", error);
        setAdvice({
          advice: "Failed to load advice.",
          healthRisks: "Failed to load health risks.",
          recommendedActions: "Failed to load recommended actions.",
        });
      }
    };

    if (bmi) {
      fetchFitnessAdvice();
    }
  }, [bmi, gender]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-semibold mb-4 text-primary">
        Fitness Advice
      </h1>
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
      <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent" onClick={() => window.history.back()}>
        Back to Calculator
      </Button>
    </div>
  );
}
