import { z } from 'zod'
import { CategoriesAPIResponseSchema, RecipeAPISchema, SearchFilterSchema } from '../schemas/recipe_schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema> 
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type DrinkRecipe = z.infer<typeof RecipeAPISchema>