// app/bmi-calculator/page.tsx
import { Suspense } from "react";
import BMICalculator from "./BMICalculator";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading BMI Calculator...</div>}>
      <BMICalculator />
    </Suspense>
  );
}
