"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen py-2"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className="w-2/3 max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
            VitalMetrics by Ayesha
          </CardTitle>
          <Heart className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="grid gap-4">
            <CardDescription className="text-center text-muted-foreground">
              Unlock your body's potential with our BMI calculator and personalized fitness advice.
            </CardDescription>
            <Link href="/gender-selection">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary border border-primary hover:border-transparent">
                Get Started
              </Button>
            </Link>
          </div>
          <motion.div
            className="mt-8 border-t pt-8 w-full"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.3,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p className="text-sm text-muted-foreground">
              This BMI calculator is a project created by Ayesha, a Master of Technology student at KBN University.
              It aims to provide a simple and effective way to understand your body mass index and receive personalized
              fitness advice.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              The project utilizes Next.js for the frontend and leverages various UI components from Shadcn UI to provide a
              modern and aesthetic user interface.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

