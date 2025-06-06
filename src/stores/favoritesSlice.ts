import { type StateCreator } from 'zustand' 
import type { Recipe } from '../types'
import { createRecipeSlice, type RecipeSliceTypes } from './recipeSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export type FavoritesSliceType = {
  favorites: Recipe[],
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExists: (id: Recipe['idDrink']) => boolean
  loadFromLocalStorage: () => void
}

// Nesting the types of the slices, we use empty array to indicate that we are not using parameters. This helps us to connect two slices or more
export const createFavoritesSlice : StateCreator<
    FavoritesSliceType & RecipeSliceTypes & NotificationSliceType, [], [], FavoritesSliceType
  > = (set, get, api) => ({
  favorites: [],

  handleClickFavorite: (recipe) => {
    // we evaluate if favorite exists 
    // if it exists we delete the element of the state
    // filter is an array method that returns a new array with all elements that pass the test, in this case, we are filtering out the recipe that we are clicking on
    if(get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
      }))
      // create notification 
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se eliminó de Favoritos',
        error: false
      })
    } else {
      // we access to the favorite state, and then we add the current recipe
      set ((state) => ({
        favorites: [ ...state.favorites, recipe ],
      }))
      // create notification 
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se agregó a Favoritos',
        error: false
      })
    }
    createRecipeSlice(set, get, api).closeModal()
    // set the item to add to localStorage 
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },
  
  favoriteExists: (id) => {
    // some is an array method that returns true if at least one element in the array passes the test, in this case, we are checking if the recipe idDrink is equal to the id that we are passing in
    return get().favorites.some(favorite => favorite.idDrink === id)
  },
  
  loadFromLocalStorage: () => {
    // get favorites from localStorage 
    const storedFavorites = localStorage.getItem('favorites')
    // add to favorites state from favorites localStorage
    if(storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites)
      })
    }

  }
})