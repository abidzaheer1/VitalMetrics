// app/bmi-calculator/page.tsx
import { Suspense } from "react";
import BMICalculator from "./GenderSelection";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading BMI Calculator...</div>}>
      <BMICalculator />
    </Suspense>
  );
}
