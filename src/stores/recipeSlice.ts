import { type StateCreator } from 'zustand' 

type Category = {}

export type RecipeSliceTypes = {
  categories: Category[]
}

export const createRecipeSlice: StateCreator<RecipeSliceTypes> = () => ({
  categories: []
})
