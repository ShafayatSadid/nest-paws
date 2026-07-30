import Image from "next/image";

export default function HappyTails() {
  const tails = [
    {
      name: "Max & Family",
      image:
        "https://images.pexels.com/photos/6034822/pexels-photo-6034822.jpeg",
      caption:
        "Max found his forever home with the Ahmed family. He loves playing with the kids and guarding the garden.",
    },
    {
      name: "Bella & Aisha",
      image:
        "https://images.pexels.com/photos/30000210/pexels-photo-30000210.jpeg?_gl=1*n14g4k*_ga*MzgyMzIyMDY0LjE3NzgyNDQ5MzY.*_ga_8JE65Q40S6*czE3ODU0MDI1MDEkbzExJGcxJHQxNzg1NDAyODIzJGo2MCRsMCRoMA..",
      caption:
        "Bella is now the queen of Aisha's apartment. She loves sunny windowsills and cuddling during movie nights.",
    },
    {
      name: "Rocky & Rafiq",
      image:
        "https://images.pexels.com/photos/31936781/pexels-photo-31936781.jpeg",
      caption:
        "Rocky runs alongside Rafiq every morning. They are inseparable and have built an incredible bond.",
    },
  ];

  return (
    <section className="py-16 px-5 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Happy <span className="text-primary">Tails</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted mt-2">
            A glimpse into the joyful lives of adopted pets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tails.map((tail, index) => (
            <div
              key={index}
              className="bg-transparent rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-muted/20 dark:border-muted/10 hover:border-primary/30"
            >
              <div className="relative h-56 bg-muted/10">
                <Image
                  src={tail.image}
                  alt={tail.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h4 className="font-heading font-bold text-foreground">
                  {tail.name}
                </h4>
                <p className="font-body text-sm text-muted leading-relaxed">
                  &ldquo;{tail.caption}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}