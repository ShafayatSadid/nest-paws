import Image from "next/image";
import Link from "next/link";
import AllPetsControls from "./controls";

async function getPets(searchParams) {
    const { search, species, sort } = searchParams || {};
    const query = new URLSearchParams();
    if (search) query.append('search', search);
    if (species && species !== 'all') query.append('species', species);
    if (sort) query.append('sort', sort);
    const url = `${process.env.SERVER_URL}/pets?${query.toString()}`;
    const res = await fetch(url, { cache: 'no-store' }); // ক্যাশে বন্ধ
    if (!res.ok) throw new Error('Failed to fetch pets');
    return res.json();
}

export const metadata = {
  title: "All Pets | Nest Paws",
  description:
    "Browse all pets available for adoption on Nest Paws. Find dogs, cats, birds, rabbits, and more. Search, filter, and sort to find your perfect furry friend.",
};

export default async function AllPetsPage({ searchParams }) {
    // 
    const params = await searchParams;
    const pets = await getPets(params);

    return (
        <div className="min-h-[calc(100vh-80px)] px-5 my-20 py-12 lg:py-16 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
                        All <span className="text-primary">Pets</span>
                    </h1>
                    <p className="font-body text-muted mt-2">
                        {pets.length} pets waiting for their forever home
                    </p>
                </div>

                {/* ✅ params পাঠানো হচ্ছে */}
                <AllPetsControls searchParams={params} />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {pets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-transparent rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-muted/20 dark:border-muted/10 hover:border-primary/30 flex flex-col"
                        >
                            <div className="relative h-56 sm:h-64 bg-muted/10">
                                <Image
                                    src={pet.image}
                                    alt={pet.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
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
                                <div className="mt-4 flex flex-col sm:flex-row gap-2 pt-4 border-t border-muted/10 dark:border-muted/5">
                                    <Link href={`/all-pets/pet/${pet._id}`} className="flex-1">
                                        <button className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white font-heading font-semibold py-2 rounded-full transition-all duration-300 border border-primary/20 hover:border-primary text-sm">
                                            View Details
                                        </button>
                                    </Link>
                                    <Link href={`/all-pets/pet/${pet._id}`} className="flex-1">
                                        <button className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-2 rounded-full transition-all duration-300 text-sm">
                                            Adopt Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}