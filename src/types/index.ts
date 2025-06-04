import { z } from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponse, RecipeAPIResponseSchema, RecipeAPISchema, SearchFilterSchema } from '../schemas/recipe_schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema> 
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type DrinkRecipe = z.infer<typeof RecipeAPISchema>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>