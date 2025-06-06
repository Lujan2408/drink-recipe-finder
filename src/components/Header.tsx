import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore';
// # We use NavLink when we want to highlight the current page user is on 

export default function Header() {

  // const location = useLocation() // hook to know where the use is on the page
  const {pathname} = useLocation() // Destructuring of useLocation for using only the pathname
  const isHome = useMemo(() => pathname === "/" ,[pathname])

  // Zustand stores
  // const categories = useAppStore(state => state.categories)
  const { drinks } = useAppStore(state => state.categories)
  const fetchCategories = useAppStore(state => state.fetchCategories)
  const searchRecipes = useAppStore(state => state.searchRecipes)
  const showNotification = useAppStore(state => state.showNotification)

  // states 
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Function to write in the local search state
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value 
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: Validate before submit the form
    if(Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    // Consult recipe 
    searchRecipes(searchFilters)
  }

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

            <NavLink
              to="/generate-ai"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold "
                  : "text-white uppercase font-bold"
              }
            >
              Generar con AI
            </NavLink>
          </nav>
        </div>

        {/* If we are on the home page we execute the following code */}
        {isHome && (
          <form 
            className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
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
                value={searchFilters.ingredient}
                onChange={handleChange}
                className="p-3 w-full rounded-lg bg-white focus:outline-none font-medium"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white font-extrabold uppercase text-lg"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                value={searchFilters.category}
                onChange={handleChange}
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
