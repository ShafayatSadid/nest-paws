import { FaHeart, FaPaw, FaSmile, FaShieldAlt } from "react-icons/fa";

export default function WhyAdopt() {
  const reasons = [
    {
      icon: FaHeart,
      title: "Save a Life",
      description:
        "Every adoption gives a homeless animal a second chance at life. Shelters are overcrowded, and your adoption saves two lives—the one you adopt and the one that takes its place.",
    },
    {
      icon: FaPaw,
      title: "Unconditional Love",
      description:
        "Adopted pets are incredibly loyal and grateful. They form deep bonds with their new families and shower them with endless love and affection.",
    },
    {
      icon: FaSmile,
      title: "Boost Mental Health",
      description:
        "Pets reduce stress, anxiety, and depression. The simple act of petting a dog or cat releases oxytocin, making you happier and healthier.",
    },
    {
      icon: FaShieldAlt,
      title: "Safety & Security",
      description:
        "Dogs provide excellent protection for your home and family. They alert you to dangers and give you peace of mind, especially at night.",
    },
  ];

  return (
    <section className="py-16 px-5 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Why <span className="text-primary">Adopt</span> Pets?
          </h2>
          <p className="font-body text-base sm:text-lg text-muted mt-2">
            Thousands of animals are waiting for a loving home. Here&apos;s why you should adopt.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-transparent rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-muted/20 dark:border-muted/10 hover:border-primary/30 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-primary text-2xl" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}