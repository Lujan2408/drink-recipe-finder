import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)

  // Check if we have favorites 
  // useMemo is a hook that will only re-render if the value changes
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
      <h1 className="text-6xl font-bold">Favorites</h1>

      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
          {favorites.map((drink) => (
            <DrinkCard 
              key={drink.idDrink} 
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-normal ">
          No tienes favoritos aún
        </p>
      )}
    </>
  );
}
