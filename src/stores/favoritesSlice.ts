import { type StateCreator } from 'zustand' 
import type { Recipe } from '../types'

export type FavoritesSliceType = {
  favorites: Recipe[],
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExists: (id: Recipe['idDrink']) => boolean
  loadFromLocalStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType> = (set, get) => ({
  favorites: [],

  handleClickFavorite: (recipe) => {
    // "get" allows us to access the state
    // we evaluate if favorite exists 
    if(get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        // if it exists we delete the element of the state
        // filter is an array method that returns a new array with all elements that pass the test, in this case, we are filtering out the recipe that we are clicking on
        favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
      }))
    } else {
      // we access to the favorite state, and then we add the current recipe
      set ((state) => ({
        favorites: [ ...state.favorites, recipe ],
      }))
    }
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