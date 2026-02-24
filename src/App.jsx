import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import BulkEmailSender from './pages/BulkEmailSender'
import TourismManagement from './pages/TourismManagement'
import MovieRecommendation from './pages/MovieRecommendation'
import CarPricePrediction from './pages/CarPricePrediction'
import NDTTesting from './pages/NDTTesting'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/about" element={<><Header /><About /><Footer /></>} />
        <Route path="/skills" element={<><Header /><Skills /><Footer /></>} />
        <Route path="/projects" element={<><Header /><Projects /><Footer /></>} />
        <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
        <Route path="/projects/bulk-email" element={<BulkEmailSender />} />
        <Route path="/projects/tourism" element={<TourismManagement />} />
        <Route path="/projects/movie-recommendation" element={<MovieRecommendation />} />
        <Route path="/projects/car-price-prediction" element={<CarPricePrediction />} />
        <Route path="/projects/ndt-testing" element={<NDTTesting />} />
      </Routes>
    </div>
  )
}

export default App
