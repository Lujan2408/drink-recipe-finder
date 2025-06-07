import axios from "axios"
import { CategoriesAPIResponseSchema, RecipeAPIResponseSchema, RecipeAPISchema } from "../schemas/recipe_schema"
import type { Drink, SearchFilter } from "../types"

interface DrinkResponse {
  drinks: Array<Drink>
}

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

export async function getRecipeById ( id: Drink['idDrink'] ) {

  const GET_BY_ID_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const { data } = await axios.get<DrinkResponse>(GET_BY_ID_URL)
  
  const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
  if(result.success) {
    return result.data
  }

}