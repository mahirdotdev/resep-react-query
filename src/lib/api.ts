// lib/api.ts

import axios from 'axios';
import { RecipesResponse, Recipe } from '@/types';

const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fungsi untuk mengambil SEMUA resep
export const getRecipes = async (): Promise<RecipesResponse> => {
  const response = await apiClient.get('/recipes');
  return response.data;
};

// Fungsi untuk mengambil SATU resep berdasarkan ID
export const getRecipeById = async (id: number): Promise<Recipe> => {
  const response = await apiClient.get(`/recipes/${id}`);
  return response.data;
};


type NewRecipeData = Omit<Recipe, 'id' | 'userId' | 'rating' | 'reviewCount'>;

// Fungsi untuk MENAMBAH resep baru
export const addRecipe = async (newRecipe: NewRecipeData): Promise<Recipe> => {
  const response = await apiClient.post('https://mahir.free.beeceptor.com', newRecipe);
  // dummyjson akan mengembalikan resep yang baru dibuat beserta ID-nya
  return response.data;
};