"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AllPetsControls({ searchParams }) {
    const router = useRouter();
    const pathname = usePathname();

    const [searchInput, setSearchInput] = useState(searchParams?.search || '');
    const [species, setSpecies] = useState(searchParams?.species || 'all');
    const [sort, setSort] = useState(searchParams?.sort || '');

    // ⏳ Debounce: 300ms পর URL আপডেট
    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams();
            if (searchInput) params.set('search', searchInput);
            if (species && species !== 'all') params.set('species', species);
            if (sort) params.set('sort', sort);
            router.push(`${pathname}?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timeout);
    }, [searchInput, species, sort, router, pathname]);

    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground placeholder-muted focus:border-primary focus:outline-none transition"
            />

            {/* Species Filter */}
            <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="px-4 py-2 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:border-primary focus:outline-none transition"
            >
                <option value="all">All Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
            </select>

            {/* Sort Dropdown */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 rounded-xl border border-muted/30 dark:border-muted/20 bg-transparent text-foreground focus:border-primary focus:outline-none transition"
            >
                <option value="">Sort by</option>
                <option value="name_asc">Name A–Z</option>
                <option value="name_desc">Name Z–A</option>
                <option value="adoptionFee_asc">Price: Low to High</option>
                <option value="adoptionFee_desc">Price: High to Low</option>
            </select>
        </div>
    );
}