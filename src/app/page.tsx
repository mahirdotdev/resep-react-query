// app/page.tsx

"use client"; // useQuery adalah client hook

import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/lib/api";
import RecipeCard from "@/components/recipe-card";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['recipes'], // Kunci unik untuk query ini
    queryFn: getRecipes,    // Fungsi yang akan dijalankan
  });

  if (isLoading) {
    return <div className="text-center">Loading resep...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dapur Kita</h1>
        <Link href="/recipes/add" className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">
          + Tambah Resep
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}