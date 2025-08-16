import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getRecipes } from "./api";
import { Recipe, RecipesResponse } from "@/types";

export function useGetRecips(options?: UseQueryOptions) {
  return useQuery({
    queryKey: ["recipes"], // Kunci unik untuk query ini
    queryFn: getRecipes, // Fungsi yang akan dijalankan
    ...options
  });
}
