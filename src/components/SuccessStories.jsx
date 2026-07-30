import Image from "next/image";

export default function SuccessStories() {
  const stories = [
    {
      name: "Ridoy & Lalu",
      image:
        "https://images.pexels.com/photos/19719502/pexels-photo-19719502.jpeg",
      story:
        "I adopted Lalu from the streets last year. Today, he’s the heart of our family. He recovered fully and now sleeps on my bed every night.",
      location: "Dhaka",
    },
    {
      name: "Nadia & Bella",
      image:
        "https://images.pexels.com/photos/1945539/pexels-photo-1945539.jpeg",
      story:
        "Bella was shy and scared at first. Now she runs to me every morning. Adopting her was the best decision I ever made.",
      location: "Chittagong",
    },
    {
      name: "Rafiq & Rocky",
      image:
        "https://images.pexels.com/photos/13804401/pexels-photo-13804401.jpeg",
      story:
        "Rocky was a rescue dog with trust issues. After 6 months of love and patience, he’s now the most loyal companion I could ask for.",
      location: "Sylhet",
    },
  ];

  return (
    <section className="py-16 px-5 lg:px-8 bg-muted/10 dark:bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-muted mt-2">
            Real people sharing the joy of adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-transparent dark:bg-transparent rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-muted/20 dark:border-muted/10 hover:border-primary/30"
            >
              {/* Image */}
              <div className="relative h-56 w-full bg-muted/10">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-sm">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground text-sm">
                      {story.name}
                    </h4>
                    <p className="font-body text-xs text-muted">{story.location}</p>
                  </div>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed italic">
                  &ldquo;{story.story}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}