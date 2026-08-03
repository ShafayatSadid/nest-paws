import AdoptionForm from "@/components/AdoptionForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";


const PetDetailsPage = async ({ params }) => {

    const { id } = await params;
    const {token} = await auth.api.getToken({
        headers: await headers()
    })

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;

    const res = await fetch(`${process.env.SERVER_URL}/pets/${id}`,{
        headers:{
            authorization: `bearer: ${token}`
        }
    })
    const pet = await res.json()
    

    
    return (
        <div className="min-h-[calc(100vh-80px)] px-5 my-20 py-12 lg:py-16 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Grid: Left → Pet Info, Right → Adoption Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column: Pet Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <div className="relative w-full h-80 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden bg-muted/10 border border-muted/20 dark:border-muted/10">
                            <Image
                                src={pet.image}
                                alt={pet.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Pet Info Card */}
                        <div className="bg-transparent rounded-2xl p-6 border border-muted/20 dark:border-muted/10 shadow-md">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground">
                                        {pet.name}
                                    </h1>
                                    <p className="font-body text-muted mt-1">
                                        {pet.species} · {pet.breed}
                                    </p>
                                </div>
                                <span className="font-heading text-2xl font-bold text-primary bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full">
                                    ${pet.adoptionFee}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                                <div>
                                    <p className="font-body text-xs text-muted uppercase tracking-wide">Age</p>
                                    <p className="font-body text-sm font-medium text-foreground">{pet.age} years</p>
                                </div>
                                <div>
                                    <p className="font-body text-xs text-muted uppercase tracking-wide">Gender</p>
                                    <p className="font-body text-sm font-medium text-foreground">{pet.gender}</p>
                                </div>
                                <div>
                                    <p className="font-body text-xs text-muted uppercase tracking-wide">Location</p>
                                    <p className="font-body text-sm font-medium text-foreground">{pet.location}</p>
                                </div>
                                <div>
                                    <p className="font-body text-xs text-muted uppercase tracking-wide">Health Status</p>
                                    <p className="font-body text-sm font-medium text-foreground">{pet.healthStatus}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="font-body text-xs text-muted uppercase tracking-wide">Vaccination</p>
                                    <p className="font-body text-sm font-medium text-foreground">{pet.vaccinationStatus}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-muted/10 dark:border-muted/5">
                                <p className="font-body text-xs text-muted uppercase tracking-wide">Description</p>
                                <p className="font-body text-sm text-foreground mt-1 leading-relaxed">
                                    {pet.description}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-muted/10 dark:border-muted/5">
                                <p className="font-body text-xs text-muted">
                                    Posted by: <span className="text-foreground">{pet.ownerEmail}</span>
                                </p>
                                {pet.adopted && (
                                    <span className="inline-block mt-2 bg-success/20 text-success font-heading font-semibold text-sm px-4 py-1 rounded-full">
                                        Already Adopted 🎉
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Adoption Form */}
                    <div className="lg:col-span-1">
                        <AdoptionForm pet={pet} user={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetailsPage;