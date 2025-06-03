import { type StateCreator } from 'zustand' 
import { getCategories } from '../services/RecipeService'
import type { Categories } from '../types'

export type RecipeSliceTypes = {
  categories: Categories,
  fetchCategories: () => Promise<void>
}

export const createRecipeSlice: StateCreator<RecipeSliceTypes> = (set) => ({
  categories: {
    drinks: []
  },
  fetchCategories: async () => {
    const categories = await getCategories()
    set({
      categories, // We put the data(drinks in this case) in categories state
    })
  } 
})
