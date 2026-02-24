import { useState } from 'react'
import { Link } from 'react-router-dom'

const MovieRecommendation = () => {
  const [searchMovie, setSearchMovie] = useState('')
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState(null)
  const [error, setError] = useState('')

  const popularMovies = [
    { title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, rating: '★★★★★' },
    { title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: '★★★★★' },
    { title: 'The Dark Knight', genre: 'Action', year: 2008, rating: '★★★★★' },
    { title: 'Pulp Fiction', genre: 'Crime', year: 1994, rating: '★★★★★' },
    { title: 'Forrest Gump', genre: 'Drama', year: 1994, rating: '★★★★★' },
    { title: 'The Matrix', genre: 'Sci-Fi', year: 1999, rating: '★★★★★' }
  ]

  const handleRecommend = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setRecommendations(null)

    // Simulate API call
    setTimeout(() => {
      // Mock recommendations
      setRecommendations([
        { title: 'Interstellar', genres: 'Adventure, Drama, Sci-Fi' },
        { title: 'The Prestige', genres: 'Drama, Mystery, Thriller' },
        { title: 'Memento', genres: 'Mystery, Thriller' },
        { title: 'Inception', genres: 'Action, Adventure, Sci-Fi' },
        { title: 'The Dark Knight', genres: 'Action, Crime, Drama' }
      ])
      setLoading(false)
    }, 1500)
  }

  const handleSimilar = (movieTitle) => {
    setSearchMovie(movieTitle)
    setLoading(true)
    setRecommendations(null)
    
    setTimeout(() => {
      setRecommendations([
        { title: 'The Silence of the Lambs', genres: 'Crime, Drama, Thriller' },
        { title: 'Se7en', genres: 'Crime, Mystery, Thriller' },
        { title: 'Fight Club', genres: 'Drama' },
        { title: 'Shutter Island', genres: 'Mystery, Thriller' },
        { title: 'Gone Girl', genres: 'Drama, Mystery, Thriller' }
      ])
      setLoading(false)
    }, 1500)
  }

  const openTrailer = (movieTitle) => {
    const searchQuery = encodeURIComponent(movieTitle + ' trailer')
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/projects" className="flex items-center space-x-2 hover:text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back</span>
          </Link>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">Movie Recommendation</h1>
          <div className="w-16"></div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-cyan-400">Movie Recommendation Engine</h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Discover your next favorite movie! Enter a movie you love, and get personalized recommendations based on genres and similarities.
        </p>

        {/* Search Form */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleRecommend} className="space-y-4">
            <input 
              type="text" 
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              placeholder="Enter movie name (e.g., Inception)" 
              className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-cyan-500 text-black py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
            >
              Get Recommendations
            </button>
          </form>
        </div>

        {/* Loading Animation */}
        {loading && (
          <div className="mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="mt-4 text-cyan-400">Finding your perfect movies...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-8">
            <p className="text-red-500 font-semibold text-xl">{error}</p>
          </div>
        )}

        {/* Results */}
        {recommendations && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Recommended Movies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recommendations.map((movie, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-cyan-500/20 transition transform hover:-translate-y-1"
                >
                  <h4 className="text-lg font-semibold mb-2">{movie.title}</h4>
                  <p className="text-gray-400 text-sm mb-4">{movie.genres}</p>
                  <div className="flex text-yellow-400 mb-4">★★★★★</div>
                  <button 
                    onClick={() => openTrailer(movie.title)}
                    className="bg-cyan-500 text-black px-4 py-2 rounded hover:bg-cyan-400 transition w-full"
                  >
                    Watch Trailer
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Movies Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Popular Movies to Try</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularMovies.map((movie, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-cyan-500/20 transition transform hover:-translate-y-1"
              >
                <h4 className="text-lg font-semibold mb-2">{movie.title}</h4>
                <p className="text-gray-400 text-sm mb-2">{movie.genre} | {movie.year}</p>
                <p className="text-yellow-400 text-sm mb-4">{movie.rating}</p>
                <button 
                  onClick={() => handleSimilar(movie.title)}
                  className="bg-cyan-500 text-black px-4 py-2 rounded hover:bg-cyan-400 transition w-full"
                >
                  Get Similar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-cyan-500/20 transition">
            <h4 className="text-xl font-semibold text-cyan-400 mb-2">🎯 Smart Recommendations</h4>
            <p className="text-gray-400">AI-powered suggestions based on movie genres and user preferences.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-cyan-500/20 transition">
            <h4 className="text-xl font-semibold text-cyan-400 mb-2">⚡ Instant Results</h4>
            <p className="text-gray-400">Get personalized movie recommendations in seconds.</p>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl hover:shadow-cyan-500/20 transition">
            <h4 className="text-xl font-semibold text-cyan-400 mb-2">📱 Responsive Design</h4>
            <p className="text-gray-400">Enjoy the experience on any device, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t border-gray-800">
        <p>&copy; 2024 Movie Recommendation Engine. Built by Pruthiraj Rout.</p>
      </footer>
    </div>
  )
}

export default MovieRecommendation
