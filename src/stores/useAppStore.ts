import { create } from 'zustand'  
import { devtools } from 'zustand/middleware'
import { createRecipeSlice } from './recipeSlice'
import { type RecipeSliceTypes } from './recipeSlice' 
import { createFavoritesSlice, type FavoritesSliceType } from './favoritesSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'
import { createAISlice, type AISlice } from './aiSlice'

export type RecipeDataTypes = RecipeSliceTypes &
  FavoritesSliceType &
  NotificationSliceType &
  AISlice; 

export const useAppStore = create<RecipeDataTypes>()(devtools((...a) => ({
  ...createRecipeSlice(...a),
  ...createFavoritesSlice(...a),
  ...createNotificationSlice(...a),
  ...createAISlice(...a),
})))