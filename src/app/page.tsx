
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        Welcome to VitalMetrics
      </h1>
      <p className="text-lg mb-8 text-muted-foreground">
        Your personal BMI calculator and fitness advisor.
      </p>
      <Link href="/gender-selection">
        <Button className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent">
          Get Started
        </Button>
      </Link>
    </div>
  );
}
