"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Welcome to VitalMetrics</CardTitle>
          <CardDescription>
            Your personal BMI calculator and fitness advisor.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/gender-selection">
            <Button className="bg-accent text-accent-foreground hover:bg-accent-foreground hover:text-accent">
              Get Started
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
