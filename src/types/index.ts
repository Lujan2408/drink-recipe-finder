import { z } from 'zod'
import { CategoriesAPIResponseSchema } from '../schemas/recipe_schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema> 