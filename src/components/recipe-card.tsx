// components/RecipeCard.tsx

import { Recipe } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block group">
      <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors">
            {recipe.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {recipe.cuisine} • {recipe.difficulty}
          </p>
        </div>
      </div>
    </Link>
  );
}