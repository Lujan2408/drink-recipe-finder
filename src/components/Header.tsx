import { useEffect, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore';
// # We use NavLink when we want to highlight the current page user is on 

export default function Header() {

  // const location = useLocation()
  const {pathname} = useLocation() // Destructuring of useLocation for using only the pathname
  const isHome = useMemo(() => pathname === "/" ,[pathname])

  // Zustand stores
  const fetchCategories = useAppStore(state => state.fetchCategories)
  const categories = useAppStore(state => state.categories)
  const { drinks } = categories

  useEffect(() => {
    fetchCategories()
  },[])

  return (
    <header
      className={
        isHome ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"
      }
    >
      <div className=" mx-auto container px-5 py-16">
        <div className=" flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>

          <nav className=" flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {/* If we are on the home page we execute the following code */}
        {isHome && (
          <form className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-32 p-10 rounded-lg shadow space-y-6">
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white font-extrabold uppercase text-lg"
              >
                Nombre o Ingredientes
              </label>
              {/* We use "name" to put it in the state in the future */}
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg bg-white focus:outline-none font-medium"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white font-extrabold uppercase text-lg"
              >
                Categoría
              </label>
              {/* We use "name" to put it in the state in the future */}
              <select
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg bg-white focus:outline-none font-medium"
              >
                <option value="">-- Seleccione --</option>
                {drinks.map((drinkCategory) => (
                  <option 
                    value={drinkCategory.strCategory} 
                    key={drinkCategory.strCategory}
                  >
                    {drinkCategory.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-700 hover:bg-orange-800 text-white font-bold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}
