import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FavoritesPage from './views/FavoritesPage'
import IndexPage from './views/IndexPage'
import Layout from './layouts/Layout'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index/>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
