import { create } from 'zustand'  
import { devtools } from 'zustand/middleware'
import { createRecipeSlice } from './recipeSlice'
import { type RecipeSliceTypes } from './recipeSlice' 
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export type RecipeDataTypes = RecipeSliceTypes &
  FavoritesSliceType &
  NotificationSliceType;

export const useAppStore = create<RecipeDataTypes>()(devtools((...a) => ({
  ...createRecipeSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationSlice(...a)
})))