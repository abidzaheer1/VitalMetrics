import {NextResponse} from 'next/server';

import fitnessData from '@/app/fitness-advice/fitness-advice.json';

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const bmi = parseFloat(searchParams.get('bmi') || '0');
  const gender = searchParams.get('gender') || 'Unspecified';

  // Determine BMI category
  const bmiCategory = getBmiCategory(bmi);

  // Find advice based on BMI category
  const adviceItem = fitnessData.find(item => item.category === bmiCategory);

  if (adviceItem) {
    return NextResponse.json({advice: adviceItem});
  } else {
    return NextResponse.json({
      error: 'No specific advice found for your BMI category.',
    }, {status: 404});
  }
}

function getBmiCategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}
