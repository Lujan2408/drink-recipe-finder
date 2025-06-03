import { type StateCreator } from 'zustand' 
import { getCategories, getRecipes } from '../services/RecipeService'
import type { Categories, DrinkRecipe, SearchFilter } from '../types'

export type RecipeSliceTypes = {
  categories: Categories,
  drinkRecipe: DrinkRecipe,
  fetchCategories: () => Promise<void>
  searchRecipes: (searchFilter : SearchFilter) => Promise<void>
}

export const createRecipeSlice: StateCreator<RecipeSliceTypes> = (set) => ({
  categories: {
    drinks: []
  },
  drinkRecipe: {
    drinks: []
  },
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories, // We put the data(drinks in this case) in categories state
    })
  },
  searchRecipes: async (filters) => {
    const drinkRecipe = await getRecipes(filters)
    set({
      drinkRecipe
    })
  }
})
