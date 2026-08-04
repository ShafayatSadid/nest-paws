import Link from "next/link";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DeletePet from "@/components/DeletePet";
import RequestButton from "@/components/RequestButton";


export const metadata = {
  title: "My Listings | Nest Paws",
  description:
    "View and manage all your pet listings on Nest Paws. Edit, delete, or check adoption requests for your listed pets.",
};


export default async function MyListingsPage() {

    

    const { token } = await auth.api.getToken({
        headers: await headers()
    })


    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );

    const myListings = await res.json();

    const adopted = myListings?.filter(pet => pet?.adopted === true)

    const available = myListings?.filter(pet => pet?.adopted === false)






    return (
        <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">My Listings</h1>
                <p className="text-sm text-muted mt-1">Manage your listed pets</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-background border rounded-2xl p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">{myListings?.length}</p>
                    <p className="text-sm text-muted">Total Listings</p>
                </div>
                <div className="bg-background border rounded-2xl p-4 text-center">
                    <p className="text-3xl font-bold text-success">{available?.length === 0 ? 0 : available.length}</p>
                    <p className="text-sm text-muted">Available</p>
                </div>
                <div className="bg-background border rounded-2xl p-4 text-center">
                    <p className="text-3xl font-bold text-primary">{adopted?.length === 0 ? 0 : adopted.length}</p>
                    <p className="text-sm text-muted">Adopted</p>
                </div>
            </div>

            {
                myListings.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed border-muted/30 rounded-3xl">
                        <p className="text-muted text-lg">You haven't listed any pets yet.</p>
                        <Link href="/dashboard/add-pet">
                            <button className="mt-5 bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-2.5 rounded-xl transition">
                                Add Your First Pet
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myListings.map((pet) => (
                            <div
                                key={pet._id}
                                className="group bg-background border border-muted/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Image Section */}
                                <div className="relative h-56 bg-muted/10 overflow-hidden">
                                    <Image
                                        src={pet.image}
                                        alt={pet.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />

                                    {pet.adopted ? (
                                        <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                                            Adopted
                                        </span>
                                    ) : (
                                        <span className="absolute top-3 right-3 bg-success text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                                            Available
                                        </span>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-5 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-heading text-xl font-bold text-foreground line-clamp-1">
                                            {pet.name}
                                        </h3>
                                        <span className="text-primary font-heading font-bold text-lg">
                                            ${pet.adoptionFee}
                                        </span>
                                    </div>

                                    <p className="text-sm text-muted line-clamp-1">
                                        {pet.species} · {pet.breed}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <RequestButton pet={pet}/>
                                        <Link href={`/dashboard/update-pet/${pet._id}`}>
                                            <button className="bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-medium py-2 rounded-xl transition w-full">
                                                 Edit
                                            </button>
                                        </Link>
                                        <Link href={`/all-pets/pet/${pet._id}`}>
                                            <button className="cursor-pointer bg-muted/10 hover:bg-muted/20 text-foreground text-sm font-medium py-2 rounded-xl transition w-full">
                                                View
                                            </button>
                                        </Link>
                                        <DeletePet petId={pet._id} token={token} />
                                    </div>
                                </div>
                            </div>))}
                    </div>
                )

            }



        </div>

    )
};
