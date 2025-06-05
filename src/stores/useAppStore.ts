import { create } from 'zustand'  
import { devtools } from 'zustand/middleware'
import { createRecipeSlice } from './recipeSlice'
import { type RecipeSliceTypes } from './recipeSlice' 
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'

export type RecipeDataTypes = RecipeSliceTypes & FavoritesSliceType

export const useAppStore = create<RecipeDataTypes>()(devtools((...a) => ({
  ...createRecipeSlice(...a),
  ...createFavoritesSlice(...a)
})))