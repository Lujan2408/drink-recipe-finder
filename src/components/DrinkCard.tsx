import { useAppStore } from "../stores/useAppStore"
import type { Drink } from "../types"

type DrinkCardProps = {
  drink: Drink
}

export default function DrinkCard({ drink } : DrinkCardProps) {

  const IMAGE = drink.strDrinkThumb
  const NOMBRE_BEBIDA = drink.strDrink
  const selecRecipe = useAppStore(state => state.selectRecipe)

  return (
    <div className="shadow-xl">
      <div className="overflow-hidden">
        <figure>
          <img 
            src={IMAGE} 
            alt={`Image of ${NOMBRE_BEBIDA}`} 
            className=" hover:cursor-pointer hover:scale-105 transition-transform"
          />
        </figure>
      </div>
      
      <div className=" p-5">
        <h2 className="text-xl truncate font-semibold">{drink.strDrink}</h2>
        <button 
          type="button"
          onClick={() => selecRecipe(drink.idDrink)}
          className="bg-orange-500 hover:bg-orange-600 hover:cursor-pointer mt-5 w-full p-3 font-bold text-white text-lg"
        >Ver Receta</button>
      </div>
    </div>
  )
}
