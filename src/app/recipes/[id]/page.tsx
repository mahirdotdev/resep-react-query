// app/recipes/[id]/page.tsx

"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
    const id = useParams().id as string
  const recipeId = parseInt(id, 10);

  const { data: recipe, isLoading, isError, error } = useQuery({
    queryKey: ['recipe', recipeId], 
    queryFn: () => getRecipeById(recipeId),
    enabled: !!recipeId,
    refetchOnReconnect:true,
    refetchIntervalInBackground: true,
  });

 

  if (isError ||  recipe === null) {
    return <div className="text-center mt-10 text-red-500">Error: {error.message}</div>;
  }

   if (isLoading) {
    return <div className="text-center mt-10">Loading detail resep...</div>;
  }

  if (!recipe) {
    return <div className="text-center mt-10">Resep tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
      <Link href="/" className="text-orange-500 hover:underline mb-6 block">&larr; Kembali ke daftar resep</Link>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{recipe.name}</h1>
      
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
        <Image src={recipe.image} alt={recipe.name} layout="fill" objectFit="cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Waktu Siap</p>
          <p className="font-bold text-gray-800 dark:text-white">{recipe.prepTimeMinutes} mnt</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Kesulitan</p>
          <p className="font-bold text-gray-800 dark:text-white">{recipe.difficulty}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Masakan</p>
          <p className="font-bold text-gray-800 dark:text-white">{recipe.cuisine}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Bahan-Bahan</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-white">Instruksi</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
            {recipe.instructions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}