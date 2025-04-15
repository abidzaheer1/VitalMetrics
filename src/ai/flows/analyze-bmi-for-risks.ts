'use server';
/**
 * @fileOverview Analyzes the BMI score and provides health risks and recommendations.
 *
 * - analyzeBmiForRisks - A function that analyzes the BMI score.
 * - AnalyzeBmiForRisksInput - The input type for the analyzeBmiForRisks function.
 * - AnalyzeBmiForRisksOutput - The return type for the analyzeBmiForRisks function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

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
  return analyzeBmiForRisksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeBmiForRisksPrompt',
  input: {
    schema: z.object({
      bmiScore: z.number().describe('The BMI score to analyze.'),
      gender: z.enum(['Male', 'Female']).describe('The gender of the user.'),
    }),
  },
  output: {
    schema: z.object({
      healthRisks: z.string().describe('A detailed breakdown of potential health risks associated with the BMI score.'),
      recommendedActions: z.string().describe('Recommended actions based on the BMI score and identified health risks.'),
    }),
  },
  prompt: `You are a health expert who analyzes BMI scores and provides insights into health risks and recommended actions.

  Based on the BMI score and gender provided, give a detailed explanation of the health risks associated with the BMI score and suggest appropriate actions that can be taken to mitigate these risks.

  BMI Score: {{{bmiScore}}}
  Gender: {{{gender}}}
  `,
});

const analyzeBmiForRisksFlow = ai.defineFlow<
  typeof AnalyzeBmiForRisksInputSchema,
  typeof AnalyzeBmiForRisksOutputSchema
>({
  name: 'analyzeBmiForRisksFlow',
  inputSchema: AnalyzeBmiForRisksInputSchema,
  outputSchema: AnalyzeBmiForRisksOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
