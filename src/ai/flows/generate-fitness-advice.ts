'use server';
/**
 * @fileOverview A fitness advice generation AI agent based on BMI score.
 *
 * - generateFitnessAdvice - A function that handles the fitness advice generation process.
 * - GenerateFitnessAdviceInput - The input type for the generateFitnessAdvice function.
 * - GenerateFitnessAdviceOutput - The return type for the generateFitnessAdvice function.
 */

import {z} from 'zod';

const GenerateFitnessAdviceInputSchema = z.object({
  bmiScore: z.number().describe('The BMI score of the user.'),
  gender: z.enum(['Male', 'Female']).describe('The gender of the user.'),
});
export type GenerateFitnessAdviceInput = z.infer<typeof GenerateFitnessAdviceInputSchema>;

const GenerateFitnessAdviceOutputSchema = z.object({
  advice: z.string().describe('Personalized fitness advice based on the BMI score.'),
  healthRisks: z.string().describe('Potential health risks associated with the BMI score.'),
  recommendedActions: z.string().describe('Recommended actions to improve health.'),
});
export type GenerateFitnessAdviceOutput = z.infer<typeof GenerateFitnessAdviceOutputSchema>;

export async function generateFitnessAdvice(input: GenerateFitnessAdviceInput): Promise<GenerateFitnessAdviceOutput> {
  return {
    advice: `Advice for BMI ${input.bmiScore} and gender ${input.gender}`,
    healthRisks: `Health risks for BMI ${input.bmiScore} and gender ${input.gender}`,
    recommendedActions: `Recommended actions for BMI ${input.bmiScore} and gender ${input.gender}`,
  };
}
