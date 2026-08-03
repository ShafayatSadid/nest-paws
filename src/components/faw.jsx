"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function MyListingsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📥 সব পেট fetch
  const fetchListings = async () => {
    try {
      const { data: tokenData, error: tokenError } = await authClient.token();
      if (tokenError) throw new Error("Failed to get token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/my-listings`, {
        headers: { Authorization: `Bearer ${tokenData.token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setPets(data);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // 🗑️ ডিলিট
  const handleDelete = async (petId, petName) => {
    if (!confirm(`Are you sure you want to delete "${petName}"?`)) return;

    try {
      const { data: tokenData, error: tokenError } = await authClient.token();
      if (tokenError) throw new Error("Failed to get token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${petId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${tokenData.token}` },
      });

      if (!res.ok) throw new Error("Failed to delete pet");
      toast.success("Pet deleted successfully!");
      await fetchListings();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // Stats
  const total = pets.length;
  const available = pets.filter((p) => !p.adopted).length;
  const adopted = pets.filter((p) => p.adopted).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Listings</h1>
        <p className="text-sm text-muted mt-1">Manage your listed pets</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-background border border-muted/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-3xl font-bold text-foreground">{total}</p>
          <p className="text-sm text-muted">Total Listings</p>
        </div>
        <div className="bg-background border border-muted/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-3xl font-bold text-success">{available}</p>
          <p className="text-sm text-muted">Available</p>
        </div>
        <div className="bg-background border border-muted/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <p className="text-3xl font-bold text-primary">{adopted}</p>
          <p className="text-sm text-muted">Adopted</p>
        </div>
      </div>

      {/* 🐾 Pets Grid */}
      {pets.length === 0 ? (
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
          {pets.map((pet) => (
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
                  <span className="absolute top-3 right-3 bg-success/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    ✅ Adopted
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 bg-success/20 text-success text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm border border-success/20">
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
                  <button
                    onClick={() => toast.info("Requests modal coming soon!")}
                    className="bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium py-2 rounded-xl transition"
                  >
                    📋 Requests
                  </button>
                  <Link href={`/dashboard/update-pet/${pet._id}`}>
                    <button className="bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-medium py-2 rounded-xl transition w-full">
                      ✏️ Edit
                    </button>
                  </Link>
                  <Link href={`/all-pets/pet/${pet._id}`}>
                    <button className="bg-muted/10 hover:bg-muted/20 text-foreground text-sm font-medium py-2 rounded-xl transition w-full">
                      👁️ View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(pet._id, pet.name)}
                    className="bg-danger/10 hover:bg-danger/20 text-danger text-sm font-medium py-2 rounded-xl transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}