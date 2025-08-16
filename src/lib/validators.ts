// lib/validators.ts

import { z } from 'zod';

export const recipeFormSchema = z.object({
  // --- Basic Info ---
  name: z.string().min(3, { message: 'Nama resep minimal 3 karakter.' }),
  cuisine: z.string().min(3, { message: 'Jenis masakan minimal 3 karakter.' }),
  difficulty: z.string().min(3, { message: 'Keterampilan minimal 3 karakter.' }),
  image: z.url({ message: 'URL gambar tidak valid.' }),
  
  // --- Time & Servings (Numbers) ---
  // z.coerce.number() akan mencoba mengubah string dari input menjadi angka
  prepTimeMinutes: z.coerce.number().min(1, { message: 'Waktu persiapan harus lebih dari 0.' }),
  cookTimeMinutes: z.coerce.number().min(1, { message: 'Waktu memasak harus lebih dari 0.' }),
  servings: z.coerce.number().min(1, { message: 'Jumlah porsi harus lebih dari 0.' }),
  caloriesPerServing: z.coerce.number().min(1, { message: 'Kalori harus lebih dari 0.' }),
  
  // --- Details (Textarea) ---
ingredients: z.preprocess(
    // 1. Fungsi transformasi: string -> string[]
    (val) => {
      if (typeof val !== 'string') return [];
      return val.split('\n').map(item => item.trim()).filter(Boolean); // Filter baris kosong
    },
    // 2. Skema validasi untuk data SETELAH transformasi
    z.array(z.string().min(1, "Bahan tidak boleh kosong."))
     .min(1, "Harap masukkan setidaknya satu bahan.")
  ),
  instructions: z.preprocess(
    // 1. Fungsi transformasi: string -> string[]
    (val) => {
      if (typeof val !== 'string') return [];
      return val.split('\n').map(item => item.trim()).filter(Boolean); // Filter baris kosong
    },
    // 2. Skema validasi untuk data SETELAH transformasi
    z.array(z.string().min(1, "Instruksi tidak boleh kosong."))
     .min(1, "Harap masukkan setidaknya satu instruksi.")
  ),
  
  // --- Tags & Meal Type (Comma-separated string) ---
  tags: z.preprocess(
    // 1. Fungsi transformasi: string -> string[]
    (val) => {
      if (typeof val !== 'string') return [];
      return val.split(',').map(item => item.trim()).filter(Boolean); // Filter baris kosong
    },
    // 2. Skema validasi untuk data SETELAH transformasi
    z.array(z.string().min(1, "Tag tidak boleh kosong."))
     .min(1, "Harap masukkan setidaknya satu tag.")
  ),
  mealType: z.preprocess(
    // 1. Fungsi transformasi: string -> string[]
    (val) => {
      if (typeof val !== 'string') return [];
      return val.split(',').map(item => item.trim()).filter(Boolean); // Filter baris kosong
    },
    // 2. Skema validasi untuk data SETELAH transformasi
    z.array(z.string().min(1, "Tipe makanan tidak boleh kosong."))
     .min(1, "Harap masukkan setidaknya satu tipe makanan.")
  ),
});

export type RecipeFormData = z.infer<typeof recipeFormSchema>;