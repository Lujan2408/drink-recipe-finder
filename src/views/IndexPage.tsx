import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"


export default function IndexPage() {
  
  const drinks = useAppStore(state => state.drinkRecipe )

  // Check if there're recipes 
  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks])

  return (
    <>
      <h1 className="text-6xl font-bold">Recetas</h1>
    
      { hasDrinks ? (
        <>
          {drinks.drinks.map((drink) => (
            <DrinkCard 
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </>
      ) : (
        <p className="my-10 text-center text-2xl">Aún no tienes recetas disponibles. Utiliza el formulario y aquí apareceran tus resultados</p>
      )
      
    }
    </>
  )
}
