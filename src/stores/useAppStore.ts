import { create } from 'zustand'  
import { devtools } from 'zustand/middleware'
import { createRecipeSlice } from './recipeSlice'
import { type RecipeSliceTypes } from './recipeSlice' 

export const useAppStore = create<RecipeSliceTypes>()(devtools((...a) => ({
  ...createRecipeSlice(...a)
})))