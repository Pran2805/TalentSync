import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/Footer";
import { lazy, Suspense } from "react";

const Feature = lazy(() => import('@/components/home/Feature'))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Suspense fallback={<>loading</>}>
        <Feature />
      </Suspense>
      <Footer />
    </div>
  );
}