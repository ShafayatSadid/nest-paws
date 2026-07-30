import { FaSearch, FaHandshake, FaPaw, FaHome } from "react-icons/fa";

export default function AdoptionProcess() {
  const steps = [
    {
      icon: FaSearch,
      title: "Search & Find",
      description:
        "Browse through our list of adorable pets. Filter by species, age, and location to find your perfect match.",
    },
    {
      icon: FaHandshake,
      title: "Submit Request",
      description:
        "Fill out the adoption form with your details, pickup date, and a short message. Our team will review your request.",
    },
    {
      icon: FaPaw,
      title: "Meet Your Pet",
      description:
        "Once approved, schedule a meet-and-greet with your pet. Spend time together to ensure it's the right fit.",
    },
    {
      icon: FaHome,
      title: "Welcome Home",
      description:
        "Complete the paperwork, pay the adoption fee, and bring your new furry family member home forever.",
    },
  ];

  return (
    <section className="py-16 px-5 lg:px-8 bg-muted/10 dark:bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Adoption <span className="text-primary">Process</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted mt-2">
            Four simple steps to bring your new best friend home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative bg-transparent rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-muted/20 dark:border-muted/10 hover:border-primary/30 text-center"
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-sm shadow-md">
                  {index + 1}
                </div>
                <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary text-2xl" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}