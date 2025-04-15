'use server';
/**
 * @fileOverview Analyzes the BMI score and provides health risks and recommendations.
 *
 * - analyzeBmiForRisks - A function that analyzes the BMI score.
 * - AnalyzeBmiForRisksInput - The input type for the analyzeBmiForRisks function.
 * - AnalyzeBmiForRisksOutput - The return type for the analyzeBmiForRisks function.
 */

import {z} from 'zod';

const AnalyzeBmiForRisksInputSchema = z.object({
  bmiScore: z.number().describe('The BMI score to analyze.'),
  gender: z.enum(['Male', 'Female']).describe('The gender of the user.'),
});
export type AnalyzeBmiForRisksInput = z.infer<typeof AnalyzeBmiForRisksInputSchema>;

const AnalyzeBmiForRisksOutputSchema = z.object({
  healthRisks: z.string().describe('A detailed breakdown of potential health risks associated with the BMI score.'),
  recommendedActions: z.string().describe('Recommended actions based on the BMI score and identified health risks.'),
});
export type AnalyzeBmiForRisksOutput = z.infer<typeof AnalyzeBmiForRisksOutputSchema>;

export async function analyzeBmiForRisks(input: AnalyzeBmiForRisksInput): Promise<AnalyzeBmiForRisksOutput> {
  return {
    healthRisks: `Health risks for BMI ${input.bmiScore} and gender ${input.gender}`,
    recommendedActions: `Recommended actions for BMI ${input.bmiScore} and gender ${input.gender}`,
  };
}
