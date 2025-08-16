// app/recipes/add/page.tsx

"use client";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { addRecipe } from "@/lib/api";
import { RecipeFormData, recipeFormSchema } from "@/lib/validators";
import Link from "next/link";
import { Recipe } from "@/types";

// Helper component untuk field form agar tidak repetitif
const FormField = ({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <div className="mt-1">{children}</div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default function AddRecipePage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema) as Resolver<RecipeFormData>,
  });

  // Mutasi data menggunakan React Query
  const {  isPending,mutateAsync } = useMutation({
    mutationKey:["RecipeAdd"],
    // Kita perlu sedikit mengubah tipe agar cocok dengan API
    mutationFn: (
      newRecipe: Omit<Recipe, "id" | "userId" | "rating" | "reviewCount">
    ) => addRecipe(newRecipe),
    onSuccess: (data: Recipe) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      // queryClient.setQueryData<Recipe[]>(
      //   { queryKey: ["recipes"] }, 
      //   (old) => [...old, data]
      // );
      router.push("/");
    },
    onError: (error) => {
      alert(`Gagal menambahkan resep: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<RecipeFormData> = async (data: RecipeFormData) => {
     mutateAsync(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/" className="text-orange-500 hover:underline mb-6 block">
        &larr; Batal
      </Link>
      <h1 className="text-3xl font-bold mb-6">Tambah Resep Baru</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField id="name" label="Nama Resep" error={errors.name?.message}>
            <input
              type="text"
              id="name"
              {...register("name")}
              className="form-input"
            />
          </FormField>
          <FormField
            id="cuisine"
            label="Jenis Masakan"
            error={errors.cuisine?.message}
          >
            <input
              type="text"
              id="cuisine"
              {...register("cuisine")}
              className="form-input"
            />
          </FormField>
        </div>

        <FormField id="image" label="URL Gambar" error={errors.image?.message}>
          <input
            type="url"
            id="image"
            {...register("image")}
            className="form-input"
            placeholder="https://example.com/image.jpg"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FormField
            id="prepTimeMinutes"
            label="Waktu Persiapan (mnt)"
            error={errors.prepTimeMinutes?.message}
          >
            <input
              type="number"
              id="prepTimeMinutes"
              {...register("prepTimeMinutes")}
              className="form-input"
            />
          </FormField>
          <FormField
            id="cookTimeMinutes"
            label="Waktu Memasak (mnt)"
            error={errors.cookTimeMinutes?.message}
          >
            <input
              type="number"
              id="cookTimeMinutes"
              {...register("cookTimeMinutes")}
              className="form-input"
            />
          </FormField>
          <FormField
            id="servings"
            label="Porsi"
            error={errors.servings?.message}
          >
            <input
              type="number"
              id="servings"
              {...register("servings")}
              className="form-input"
            />
          </FormField>
          <FormField
            id="caloriesPerServing"
            label="Kalori per Porsi"
            error={errors.caloriesPerServing?.message}
          >
            <input
              type="number"
              id="caloriesPerServing"
              {...register("caloriesPerServing")}
              className="form-input"
            />
          </FormField>
        </div>

        <FormField
          id="difficulty"
          label="Tingkat Kesulitan"
          error={errors.difficulty?.message}
        >
          <select
            id="difficulty"
            {...register("difficulty")}
            className="form-input"
          >
            <option value="">Pilih...</option>
            <option value="Easy">Mudah</option>
            <option value="Medium">Sedang</option>
            <option value="Hard">Sulit</option>
          </select>
        </FormField>

        <FormField
          id="ingredients"
          label="Bahan-bahan (satu per baris)"
          error={errors.ingredients?.message}
        >
          <textarea
            id="ingredients"
            {...register("ingredients")}
            rows={6}
            className="form-input"
          ></textarea>
        </FormField>

        <FormField
          id="instructions"
          label="Instruksi (satu per baris)"
          error={errors.instructions?.message}
        >
          <textarea
            id="instructions"
            {...register("instructions")}
            rows={8}
            className="form-input"
          ></textarea>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="tags"
            label="Tags (pisahkan dengan koma)"
            error={errors.tags?.message}
          >
            <input
              type="text"
              id="tags"
              {...register("tags")}
              className="form-input"
              placeholder="pencuci mulut, manis, cepat"
            />
          </FormField>
          <FormField
            id="mealType"
            label="Tipe Makanan (pisahkan dengan koma)"
            error={errors.mealType?.message}
          >
            <input
              type="text"
              id="mealType"
              {...register("mealType")}
              className="form-input"
              placeholder="sarapan, makan siang"
            />
          </FormField>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-orange-500 text-white py-2.5 px-4 rounded-md hover:bg-orange-600 disabled:bg-gray-400 font-semibold"
        >
          {isPending ? "Menyimpan..." : "Simpan Resep"}
        </button>
      </form>
    </div>
  );
}
