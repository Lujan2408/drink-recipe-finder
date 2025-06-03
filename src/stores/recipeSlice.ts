import { type StateCreator } from 'zustand' 
import { getCategories } from '../services/RecipeService'

type Category = {}

export type RecipeSliceTypes = {
  categories: Category[],
  fetchCategories: () => Promise<void>
}

export const createRecipeSlice: StateCreator<RecipeSliceTypes> = () => ({
  categories: [],
  fetchCategories: async () => {
    getCategories()
  } 
})
