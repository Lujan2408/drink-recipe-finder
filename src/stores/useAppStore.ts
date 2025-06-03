import { create } from 'zustand'  
import { createRecipeSlice } from './recipeSlice'
import { type RecipeSliceTypes } from './recipeSlice' 

export const useAppStore = create<RecipeSliceTypes>((...a) => ({
  ...createRecipeSlice(...a)
}))