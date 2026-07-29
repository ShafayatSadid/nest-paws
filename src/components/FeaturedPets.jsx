"use client";

import Image from "next/image";
import Link from "next/link";
import featuredPets from "@/data/featuredPets.json"; // ← এখানে নাম পরিবর্তন

export default function FeaturedPets() {
  return (
    <section className="py-16 px-5 lg:px-8 bg-cream dark:bg-secondary/90">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark dark:text-cream">
            Meet Our <span className="text-primary">Featured</span> Pets
          </h2>
          <p className="font-body text-base sm:text-lg text-muted dark:text-cream/70 mt-2">
            These adorable pets are waiting for their forever home
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredPets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white dark:bg-secondary/50 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-primary/5 dark:border-cream/5"
            >
              <div className="relative h-56 sm:h-64 lg:h-72 bg-muted/10">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 lg:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading text-xl font-bold text-dark dark:text-cream">
                    {pet.name}
                  </h3>
                  <span className="font-heading text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    ${pet.adoptionFee}
                  </span>
                </div>

                <p className="font-body text-sm text-muted dark:text-cream/70">
                  {pet.species} · {pet.breed}
                </p>
                <p className="font-body text-sm text-muted dark:text-cream/60 mt-1">
                  📍 {pet.location}
                </p>

                <Link href={`/pets/${pet.id}`}>
                  <button className="w-full mt-4 bg-primary/10 hover:bg-primary text-primary hover:text-white font-heading font-semibold py-2.5 rounded-full transition border border-primary/20 hover:border-primary">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}