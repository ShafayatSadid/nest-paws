import Image from "next/image";
import Link from "next/link";


const allPetsPage = async () => {

    const res = await fetch(process.env.SERVER_URL)
    const pets = await res.json();


    return (
        <div className="min-h-[calc(100vh-80px)] px-5 my-20 py-12 lg:py-16 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
                        All <span className="text-primary">Pets</span>
                    </h1>
                    <p className="font-body text-muted mt-2">
                        {pets.length} pets waiting for their forever home
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {pets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-transparent rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-muted/20 dark:border-muted/10 hover:border-primary/30 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-56 sm:h-64 bg-muted/10">
                                <Image
                                    src={pet.image}
                                    alt={pet.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
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

                                {/* Buttons */}
                                <div className="mt-4 flex flex-col sm:flex-row gap-2 pt-4 border-t border-muted/10 dark:border-muted/5">
                                    <Link href={`/all-pets/pet/${pet._id}`} className="cursor-pointer flex-1">
                                        <button className="w-full cursor-pointer bg-primary/10 hover:bg-primary text-primary hover:text-white font-heading font-semibold py-2 rounded-full transition-all duration-300 border border-primary/20 hover:border-primary text-sm">
                                            View Details
                                        </button>
                                    </Link>
                                    
                                        <button className="w-full cursor-pointer flex-1 bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-2 rounded-full transition-all duration-300 text-sm">
                                            Adopt Now
                                        </button>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default allPetsPage;