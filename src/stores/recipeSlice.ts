import { type StateCreator } from 'zustand' 
import { getCategories, getRecipes, getRecipeById } from '../services/RecipeService'
import type { Categories, Drink, DrinkRecipe, Recipe, SearchFilter } from '../types'
import type { FavoritesSliceType } from './favoritesSlice'

export type RecipeSliceTypes = {
  categories: Categories,
  drinkRecipe: DrinkRecipe,
  selectedRecipe: Recipe,
  modal: boolean
  fetchCategories: () => Promise<void>
  searchRecipes: (searchFilter : SearchFilter) => Promise<void>
  selectRecipe: (id: Drink['idDrink']) => Promise<void>
  closeModal: () => void
}

// Nesting the types of the slices, we use empty array to indicate that we are not using parameters. This helps us to connect two slices or more
export const createRecipeSlice: StateCreator<RecipeSliceTypes & FavoritesSliceType, [], [], RecipeSliceTypes> = (set) => ({
  categories: {
    drinks: []
  },
  drinkRecipe: {
    drinks: []
  },
  selectedRecipe: {} as Recipe,
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories, // We put the data(drinks in this case) in categories state
    })
  },
  modal: false,
  searchRecipes: async (filters) => {
    const drinkRecipe = await getRecipes(filters)
    set({
      drinkRecipe
    })
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id)
    set({
      selectedRecipe,
      modal: true
    })
  },
  closeModal: () => {
    set({
      modal: false,
      selectedRecipe: {} as Recipe
    })
  }
})
