// app/bmi-calculator/page.tsx
import { Suspense } from "react";
import BMICalculator from "./BMICalculatorResults";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading BMI Calculator...</div>}>
      <BMICalculator />
    </Suspense>
  );
}
