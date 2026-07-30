import { FaSyringe, FaUtensils, FaWalking, FaBath, FaHeartbeat } from "react-icons/fa";

export default function PetCareTips() {
  const tips = [
    {
      icon: FaSyringe,
      title: "Regular Vaccination",
      description:
        "Vaccinate your pet as soon as you adopt. Follow the vet's schedule for booster shots and annual checkups.",
    },
    {
      icon: FaUtensils,
      title: "Proper Nutrition",
      description:
        "Feed your pet high-quality, species-appropriate food. Avoid human food and maintain a balanced diet.",
    },
    {
      icon: FaWalking,
      title: "Daily Exercise",
      description:
        "Dogs need daily walks. Cats need toys and climbing spaces. Regular activity keeps them healthy and happy.",
    },
    {
      icon: FaBath,
      title: "Regular Grooming",
      description:
        "Bathe, brush, and trim nails regularly. Keep their bedding clean and check for ticks or fleas.",
    },
    {
      icon: FaHeartbeat,
      title: "Annual Checkups",
      description:
        "Visit the vet at least once a year. Early detection of health issues can save your pet's life.",
    },
  ];

  return (
    <section className="py-16 px-5 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Pet Care <span className="text-primary">Tips</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted mt-2">
            Essential tips to keep your furry friend healthy and happy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-transparent rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 text-center border border-muted/20 dark:border-muted/10 hover:border-primary/30"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-primary text-xl" />
                </div>
                <h4 className="font-heading font-bold text-foreground text-sm mb-1">
                  {tip.title}
                </h4>
                <p className="font-body text-xs text-muted leading-relaxed">
                  {tip.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}