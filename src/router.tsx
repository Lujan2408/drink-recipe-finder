import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './views/HomePage'
import FavoritesPage from './views/FavoritesPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  )
}
