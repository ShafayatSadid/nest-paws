

import Image from "next/image";
import Link from "next/link";

const FeaturedPets = async () => {

    const res = await fetch(process.env.SERVER_URL)
    const allPets = await res.json()
    const featuredPets = allPets.slice(0, 6)
    return (
        <section className="py-16 px-5 lg:px-8 bg-muted/5 dark:bg-secondary/30">
            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
                        Meet Our <span className="text-primary">Featured</span> Pets
                    </h2>
                    <p className="font-body text-base sm:text-lg text-muted mt-2">
                        These adorable pets are waiting for their forever home
                    </p>
                </div>

                {/* Pets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featuredPets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-transparent dark:bg-transparent rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-muted/20 dark:border-muted/10 hover:border-primary/30"
                        >
                            {/* Image */}
                            <div className="relative h-56 sm:h-64 lg:h-72 bg-muted/10">
                                <Image
                                    src={pet.image}
                                    alt={pet.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 lg:p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-heading text-xl font-bold text-foreground">
                                        {pet.name}
                                    </h3>
                                    <span className="font-heading text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
                                        ${pet.adoptionFee}
                                    </span>
                                </div>

                                <p className="font-body text-sm text-muted">
                                    {pet.species} · {pet.breed}
                                </p>
                                <p className="font-body text-sm text-muted/70 mt-1">
                                    {pet.location}
                                </p>

                                <Link href={`/pets/pet/${pet.id}`}>
                                    <button className="w-full mt-4 bg-primary/10 hover:bg-primary text-primary hover:text-white font-heading font-semibold py-2.5 rounded-full transition-all duration-300 border border-primary/20 hover:border-primary">
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
};

export default FeaturedPets;






