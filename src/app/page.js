import AdoptionProcess from "@/components/AdoptionProcess";
import FeaturedPets from "@/components/FeaturedPets";
import HappyTails from "@/components/HappyTails";
import PetCareTips from "@/components/PetCareTips";
import SuccessStories from "@/components/SuccessStories";
import WhyAdopt from "@/components/WhyAdopt";
import { Button } from "@heroui/react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex-1">
      <div><Toaster/></div>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 lg:px-8 bg-cream dark:bg-secondary/90">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-dark dark:text-cream leading-tight">
            Find Your{" "}
            <span className="text-primary dark:text-primary">Furry</span>{" "}
            Friend Today
          </h1>

          <p className="font-body text-base sm:text-lg lg:text-xl text-dark dark:text-cream/90 mt-4 max-w-2xl mx-auto">
            Adopt dogs, cats, birds, rabbits, and more. Give an abandoned
            animal a loving home and change a life forever.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/all-pets">
              <Button className={'bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-14'}>Adopt Now</Button>
            </Link>

          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <FeaturedPets />

      {/* Why Adopt */}
      <WhyAdopt />

      {/* SuccessStories */}
      <SuccessStories />

      {/* PetCareTips */}
      <PetCareTips />

      {/* HappyTails */}
      <HappyTails />

      {/* AdoptionProcess */}
      <AdoptionProcess />
    </main>
  );
}