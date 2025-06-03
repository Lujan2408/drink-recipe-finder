import axios from "axios"
import { CategoriesAPIResponseSchema, RecipeAPISchema } from "../schemas/recipe_schema"
import type { SearchFilter } from "../types"

export async function getCategories () {

  const URL = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
  const { data } = await axios.get(URL)
  const result = CategoriesAPIResponseSchema.safeParse(data) // Validate if we type correctly the API response

  if(result.success) {
    return result.data // Return the drinks 
  }

}

export async function getRecipes( filters: SearchFilter ) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`

  const { data } = await axios.get(URL)
  const result = RecipeAPISchema.safeParse(data)
  if(result.success) {
    return result.data
  }
}