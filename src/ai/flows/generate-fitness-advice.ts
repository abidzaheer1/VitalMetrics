'use server';
/**
 * @fileOverview A fitness advice generation AI agent based on BMI score.
 *
 * - generateFitnessAdvice - A function that handles the fitness advice generation process.
 * - GenerateFitnessAdviceInput - The input type for the generateFitnessAdvice function.
 * - GenerateFitnessAdviceOutput - The return type for the generateFitnessAdvice function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

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
  return generateFitnessAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFitnessAdvicePrompt',
  input: {
    schema: z.object({
      bmiScore: z.number().describe('The BMI score of the user.'),
      gender: z.enum(['Male', 'Female']).describe('The gender of the user.'),
    }),
  },
  output: {
    schema: z.object({
      advice: z.string().describe('Personalized fitness advice based on the BMI score.'),
      healthRisks: z.string().describe('Potential health risks associated with the BMI score.'),
      recommendedActions: z.string().describe('Recommended actions to improve health.'),
    }),
  },
  prompt: `You are a fitness and health expert providing personalized advice based on a user's BMI score and gender.

  Provide fitness advice, potential health risks, and recommended actions based on the following information:

  BMI Score: {{{bmiScore}}}
  Gender: {{{gender}}}

  Format your output into advice, healthRisks, and recommendedActions. Be concise and informative.
  `,
});

const generateFitnessAdviceFlow = ai.defineFlow<
  typeof GenerateFitnessAdviceInputSchema,
  typeof GenerateFitnessAdviceOutputSchema
>(
  {
    name: 'generateFitnessAdviceFlow',
    inputSchema: GenerateFitnessAdviceInputSchema,
    outputSchema: GenerateFitnessAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
