"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Card className="w-2/3 max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
            VitalMetrics
          </CardTitle>
          <Monitor className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="grid gap-4">
            <CardDescription className="text-center text-muted-foreground">
              Unlock your body's potential with our BMI calculator and personalized fitness advice.
            </CardDescription>
            <Link href="/gender-selection">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Get Started
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


