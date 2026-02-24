import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ==================== REALISTIC DATA ====================

const destinations = [
  { 
    id: 1, 
    name: 'Paris, France', 
    category: 'city', 
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800', 
    rating: 4.8, 
    reviews: 2847,
    price: 1299, 
    description: 'Experience the magic of the City of Light. From the iconic Eiffel Tower to charming cafés in Montmartre, Paris offers timeless romance, world-class art, and exquisite cuisine.',
    fullDescription: 'Paris captivates visitors with its effortless blend of history, art, and sophistication. Wander through the artistic halls of the Louvre, savor fresh croissants at local bakeries, or watch the sunset from the Seine riverbanks. The city pulses with energy while maintaining its elegant, timeless charm.',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Montmartre'],
    bestTime: 'April - June, September - November',
    duration: '5-7 days',
    activities: ['Museum Tours', 'River Cruises', 'Shopping', 'Food Tours', 'Nightlife']
  },
  { 
    id: 2, 
    name: 'Bali, Indonesia', 
    category: 'beach', 
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 
    rating: 4.9, 
    reviews: 3521,
    price: 899, 
    description: 'Discover the Island of Gods with its lush rice terraces, ancient temples, pristine beaches, and vibrant spiritual culture.',
    fullDescription: 'Bali is a tropical paradise that offers something for everyone. Whether you seek spiritual enlightenment at ancient temples, adventure in the highlands of Ubud, or relaxation on pristine beaches, this Indonesian gem delivers unforgettable experiences. The warm hospitality of the Balinese people adds to the islands enchanting allure.',
    highlights: ['Ubud Rice Terraces', 'Tanah Lot Temple', 'Seminyak Beach', 'Mount Batur', 'Sacred Monkey Forest'],
    bestTime: 'April - October',
    duration: '7-10 days',
    activities: ['Surfing', 'Yoga Retreats', 'Spa Treatments', 'Volcano Treks', 'Cultural Shows']
  },
  { 
    id: 3, 
    name: 'Swiss Alps', 
    category: 'mountain', 
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800', 
    rating: 4.9, 
    reviews: 1956,
    price: 1899, 
    description: 'Immerse yourself in breathtaking mountain scenery, pristine lakes, and charming alpine villages.',
    fullDescription: 'The Swiss Alps represent the pinnacle of mountain beauty and outdoor adventure. Ski down pristine slopes in winter, hike through flower-filled meadows in summer, or simply soak in the spectacular panoramas from luxury mountain lodges. Switzerland offers impeccable service, clean cities, and some of the most scenic train journeys in the world.',
    highlights: ['Matterhorn', 'Jungfrau Region', 'Lake Geneva', 'Interlaken', 'Glacier Express'],
    bestTime: 'December - March (skiing), June - September (hiking)',
    duration: '7-14 days',
    activities: ['Skiing', 'Hiking', 'Paragliding', 'Mountain Biking', 'Scenic Railways']
  },
  { 
    id: 4, 
    name: 'Rome, Italy', 
    category: 'historical', 
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800', 
    rating: 4.7, 
    reviews: 4102,
    price: 1149, 
    description: 'Walk through millennia of history in the Eternal City, where ancient ruins meet vibrant modern life.',
    fullDescription: 'Rome is an open-air museum of human civilization. From the mighty Colosseum to the tiny streets of Trastevere, every corner tells a story. Indulge in authentic Italian cuisine, toss a coin in the Trevi Fountain, and get lost in the winding lanes that have captivated visitors for centuries.',
    highlights: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Pantheon', 'Roman Forum'],
    bestTime: 'April - June, September - October',
    duration: '4-6 days',
    activities: ['Historical Tours', 'Vatican Visits', 'Gelato Tasting', 'Shopping', 'Evening Passeggiata']
  },
  { 
    id: 5, 
    name: 'Tokyo, Japan', 
    category: 'city', 
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 
    rating: 4.9, 
    reviews: 3856,
    price: 1399, 
    description: 'Experience the fascinating contrast of ancient traditions and cutting-edge technology in Japan capital.',
    fullDescription: 'Tokyo is a city of endless discoveries. Ancient temples stand alongside neon-lit skyscrapers, while serene gardens provide refuge from the bustling streets. From the iconic crossing at Shibuya to the historic temples of Asakusa, Tokyo offers an unforgettable journey through time and culture.',
    highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Tower', 'Akihabara', 'Imperial Palace'],
    bestTime: 'March - May, September - November',
    duration: '5-8 days',
    activities: ['Tech Shopping', 'Food Tours', 'Temple Visits', 'Cherry Blossom Viewing', 'Anime Culture']
  },
  { 
    id: 6, 
    name: 'Santorini, Greece', 
    category: 'beach', 
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 
    rating: 4.8, 
    reviews: 2234,
    price: 1499, 
    description: 'Watch breathtaking sunsets over white-washed buildings and crystal-clear Aegean waters.',
    fullDescription: 'Santorini is the crown jewel of the Greek Islands, famous for its stunning sunsets, volcanic beaches, and distinctive architecture. Explore ancient Akrotiri, taste world-class wines produced from volcanic soil, and dine on fresh seafood while overlooking the caldera.',
    highlights: ['Oia Sunset', 'Red Beach', 'Fira Town', 'Ancient Akrotiri', 'Wine Tasting'],
    bestTime: 'April - November',
    duration: '4-7 days',
    activities: ['Sunset Cruises', 'Volcano Tours', 'Wine Tasting', 'Swimming', 'Photography']
  },
  { 
    id: 7, 
    name: 'New York City, USA', 
    category: 'city', 
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800', 
    rating: 4.7, 
    reviews: 5621,
    price: 1199, 
    description: 'The city that never sleeps offers world-famous landmarks, Broadway shows, and diverse neighborhoods.',
    fullDescription: 'New York City is the ultimate urban destination. From the towering Empire State Building to the tranquil Central Park, the city offers endless attractions. Catch a Broadway show, explore world-class museums, sample cuisines from around the globe, and feel the energy that makes NYC unique.',
    highlights: ['Statue of Liberty', 'Times Square', 'Central Park', 'Empire State Building', 'Brooklyn Bridge'],
    bestTime: 'April - June, September - November',
    duration: '5-7 days',
    activities: ['Broadway Shows', 'Museum Visits', 'Food Tours', 'Shopping', 'Neighborhood Walking Tours']
  },
  { 
    id: 8, 
    name: 'Dubai, UAE', 
    category: 'adventure', 
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', 
    rating: 4.6, 
    reviews: 2890,
    price: 1499, 
    description: 'Experience luxury and adventure in the city of the future, from skyscrapers to desert safaris.',
    fullDescription: 'Dubai is a city of superlatives, home to the worlds tallest building, largest shopping mall, and most luxurious hotels. From thrilling desert safaris to world-class dining and shopping, Dubai offers an unforgettable experience.',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari', 'Dubai Marina'],
    bestTime: 'November - March',
    duration: '4-6 days',
    activities: ['Desert Safari', 'Shopping', 'Fine Dining', 'Skydiving', 'Water Sports']
  },
  { 
    id: 9, 
    name: 'Maldives', 
    category: 'beach', 
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', 
    rating: 4.9, 
    reviews: 1876,
    price: 2499, 
    description: 'Escape to paradise with crystal-clear waters, overwater villas, and pristine beaches.',
    fullDescription: 'The Maldives is the ultimate beach destination, offering pristine white sand beaches, crystal-clear turquoise waters, and luxurious overwater bungalows. Its perfect for honeymoons, relaxation, and water sports enthusiasts.',
    highlights: ['Overwater Villas', 'Snorkeling', 'Whale Shark Diving', 'Sunset Cruises', 'Private Islands'],
    bestTime: 'November - April',
    duration: '5-7 days',
    activities: ['Snorkeling', 'Diving', 'Spa Treatments', 'Sunset Cruises', 'Water Sports']
  },
  { 
    id: 10, 
    name: 'Machu Picchu, Peru', 
    category: 'historical', 
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800', 
    rating: 4.9, 
    reviews: 2341,
    price: 1299, 
    description: 'Discover the ancient Incan citadel set high in the Andes Mountains.',
    fullDescription: 'Machu Picchu is one of the most iconic archaeological sites in the world, perched high in the Andes Mountains. This ancient Incan citadel offers breathtaking views and a fascinating glimpse into the history of the Inca civilization.',
    highlights: ['Inca Trail', 'Sun Gate', 'Temple of the Sun', 'Huayna Picchu', 'Sacred Valley'],
    bestTime: 'May - September',
    duration: '5-7 days',
    activities: ['Trekking', 'Historical Tours', 'Photography', 'Cultural Exploration', 'Mountain Biking']
  }
]

// Additional data for hotels, packages, flights
const hotels = [
  { id: 1, name: 'Grand Plaza Hotel', location: 'Paris, France', rating: 4.8, price: 299, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'] },
  { id: 2, name: 'Seaside Resort', location: 'Bali, Indonesia', rating: 4.9, price: 199, image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', amenities: ['WiFi', 'Beach', 'Pool', 'Spa', 'Bar'] },
  { id: 3, name: 'Alpine Lodge', location: 'Swiss Alps', rating: 4.7, price: 349, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', amenities: ['WiFi', 'Ski-in/Ski-out', 'Spa', 'Restaurant', 'Fireplace'] },
  { id: 4, name: 'Colosseum View Hotel', location: 'Rome, Italy', rating: 4.6, price: 249, image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800', amenities: ['WiFi', 'Restaurant', 'Bar', 'Concierge', 'Room Service'] },
  { id: 5, name: 'Tokyo Bay Hotel', location: 'Tokyo, Japan', rating: 4.8, price: 279, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Shopping'] },
  { id: 6, name: 'Santorini Cliff Suites', location: 'Santorini, Greece', rating: 4.9, price: 399, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Sea View'] }
]

const tourPackages = [
  { id: 1, name: 'European Highlights', duration: '10 Days', destinations: ['Paris', 'Rome', 'Amsterdam'], price: 2999, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800', includes: ['Flights', 'Hotels', 'Tours', 'Transfers'] },
  { id: 2, name: 'Asian Adventure', duration: '14 Days', destinations: ['Tokyo', 'Bali', 'Singapore'], price: 3499, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', includes: ['Flights', 'Hotels', 'Tours', 'Transfers'] },
  { id: 3, name: 'Tropical Paradise', duration: '7 Days', destinations: ['Maldives', 'Sri Lanka'], price: 3999, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', includes: ['Flights', 'Overwater Villa', 'All Meals', 'Transfers'] }
]

const flights = [
  { id: 1, from: 'New York', to: 'Paris', airline: 'Air France', duration: '7h 30m', stops: 'Non-stop', price: 599 },
  { id: 2, from: 'Los Angeles', to: 'Tokyo', airline: 'Japan Airlines', duration: '11h 45m', stops: 'Non-stop', price: 899 },
  { id: 3, from: 'Miami', to: 'Dubai', airline: 'Emirates', duration: '14h 20m', stops: 'Non-stop', price: 1099 },
  { id: 4, from: 'San Francisco', to: 'Bali', airline: 'Singapore Airlines', duration: '16h 30m', stops: '1 Stop', price: 799 }
]

// Components
const Navbar = ({ user, onLogout, currentPage, setCurrentPage }) => (
  <nav className="bg-white shadow-lg fixed w-full z-40">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-plane-departure text-2xl text-blue-600"></i>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TravelEase</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => setCurrentPage('home')} className={`font-medium ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Home</button>
          <button onClick={() => setCurrentPage('destinations')} className={`font-medium ${currentPage === 'destinations' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Destinations</button>
          <button onClick={() => setCurrentPage('hotels')} className={`font-medium ${currentPage === 'hotels' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Hotels</button>
          <button onClick={() => setCurrentPage('packages')} className={`font-medium ${currentPage === 'packages' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Packages</button>
          <button onClick={() => setCurrentPage('flights')} className={`font-medium ${currentPage === 'flights' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>Flights</button>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600">Welcome, {user.name}</span>
              <button onClick={() => setCurrentPage('dashboard')} className="text-gray-600 hover:text-blue-600">
                <i className="fas fa-user-circle text-xl"></i>
              </button>
              <button onClick={onLogout} className="text-gray-600 hover:text-red-600">
                <i className="fas fa-sign-out-alt text-xl"></i>
              </button>
            </>
          ) : (
            <button onClick={() => setCurrentPage('login')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700">
              Login
            </button>
          )}
          <button onClick={() => setCurrentPage('mobileMenu')} className="md:hidden text-gray-600">
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
)

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920" alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Discover Your Next Adventure</h1>
        <p className="text-xl md:text-2xl mb-8">Explore the worlds most beautiful destinations</p>
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search destinations..." 
            className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => onSearch(searchTerm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

const DestinationCard = ({ destination, onViewDetails, onAddToWishlist, wishlist }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
    <div className="relative">
      <img src={destination.image} alt={destination.name} className="w-full h-56 object-cover" />
      <div className="absolute top-4 right-4">
        <button onClick={() => onAddToWishlist(destination)} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
          <i className={`${wishlist.includes(destination.id) ? 'fas text-red-500' : 'far'} fa-heart text-gray-600`}></i>
        </button>
      </div>
      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
        ${destination.price}
      </div>
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm capitalize">{destination.category}</div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
      <p className="text-gray-600 mb-4">{destination.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {destination.highlights.slice(0, 3).map((h, i) => (
          <span key={i} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">{h}</span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-blue-600">${destination.price}</span>
          <span className="text-gray-500 text-sm">/person</span>
        </div>
        <button 
          onClick={() => onViewDetails(destination)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
)

const HotelCard = ({ hotel, onBook }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
    <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold">{hotel.name}</h3>
        <div className="flex items-center">
          <i className="fas fa-star text-yellow-400 mr-1"></i>
          <span className="font-semibold">{hotel.rating}</span>
        </div>
      </div>
      <p className="text-gray-600 mb-2"><i className="fas fa-map-marker-alt mr-2"></i>{hotel.location}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {hotel.amenities.map((a, i) => (
          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{a}</span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
          <span className="text-gray-500 text-sm">/night</span>
        </div>
        <button 
          onClick={() => onBook(hotel)}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
)

const PackageCard = ({ pkg, onView }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
    <img src={pkg.image} alt={pkg.name} className="w-full h-56 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
      <p className="text-gray-600 mb-2"><i className="fas fa-clock mr-2"></i>{pkg.duration}</p>
      <p className="text-gray-600 mb-4"><i className="fas fa-map-marker-alt mr-2"></i>{pkg.destinations.join(' → ')}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {pkg.includes.map((item, i) => (
          <span key={i} className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">{item}</span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-bold text-purple-600">${pkg.price}</span>
          <span className="text-gray-500 text-sm">/person</span>
        </div>
        <button 
          onClick={() => onView(pkg)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
)

const FlightCard = ({ flight, onBook }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-102 transition-all duration-300">
    <div className="flex justify-between items-center">
      <div className="text-center">
        <p className="text-xl font-bold">{flight.from}</p>
        <p className="text-gray-500 text-sm">{flight.airline}</p>
      </div>
      <div className="flex-1 px-4">
        <div className="flex items-center justify-center">
          <div className="border-t-2 border-gray-300 flex-1"></div>
          <div className="px-4 text-center">
            <p className="text-gray-500 text-sm">{flight.duration}</p>
            <p className="text-gray-400 text-xs">{flight.stops}</p>
          </div>
          <div className="border-t-2 border-gray-300 flex-1"></div>
          <i className="fas fa-plane ml-4 text-blue-500"></i>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold">{flight.to}</p>
        <p className="text-gray-500 text-sm">Arrival</p>
      </div>
    </div>
    <div className="flex justify-between items-center mt-4 pt-4 border-t">
      <div>
        <span className="text-2xl font-bold text-blue-600">${flight.price}</span>
        <span className="text-gray-500 text-sm">/person</span>
      </div>
      <button 
        onClick={() => onBook(flight)}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700"
      >
        Book Flight
      </button>
    </div>
  </div>
)

const BookingModal = ({ item, type, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', guests: 1, date: '' })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm(formData)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Book {type}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="tel" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
          {type !== 'Flight' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Number of Guests</label>
                <input type="number" min="1" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Travel Date</label>
                <input type="date" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
            </>
          )}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Booking Summary</h4>
            <p className="text-gray-600">{item.name}</p>
            {type === 'Destination' && <p className="text-gray-600">${item.price}/person</p>}
            {type === 'Hotel' && <p className="text-gray-600">${item.price}/night</p>}
            {type === 'Package' && <p className="text-gray-600">${item.price}/person</p>}
            {type === 'Flight' && <p className="text-gray-600">${item.price}/person</p>}
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}

const Dashboard = ({ user, bookings, onCancel }) => (
  <div className="min-h-screen bg-gray-100 py-12 px-4">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-8">My Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Bookings</p>
              <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
            </div>
            <i className="fas fa-bookmark text-4xl text-blue-200"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Spent</p>
              <p className="text-3xl font-bold text-green-600">${bookings.reduce((a, b) => a + b.price, 0)}</p>
            </div>
            <i className="fas fa-wallet text-4xl text-green-200"></i>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Wishlist Items</p>
              <p className="text-3xl font-bold text-purple-600">0</p>
            </div>
            <i className="fas fa-heart text-4xl text-purple-200"></i>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6">My Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet. Start exploring!</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, idx) => (
              <div key={idx} className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <i className={`fas ${booking.type === 'Destination' ? 'fa-map' : booking.type === 'Hotel' ? 'fa-hotel' : booking.type === 'Package' ? 'fa-box' : 'fa-plane'} text-blue-600`}></i>
                  </div>
                  <div>
                    <p className="font-semibold">{booking.itemName}</p>
                    <p className="text-sm text-gray-500">{booking.type} | {booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <span className="font-bold text-green-600">${booking.price}</span>
                  <button onClick={() => onCancel(idx)} className="text-red-500 hover:text-red-700">
                    <i className="fas fa-times-circle mr-1"></i> Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
)

const LoginModal = ({ onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ name: formData.name || 'User', email: formData.email })
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{isRegister ? 'Register' : 'Login'}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700">
            {isRegister ? 'Register' : 'Login'}
          </button>
          <p className="text-center text-gray-600">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-blue-600 hover:underline">
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}

// Main Component
const TourismManagement = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showModal, setShowModal] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchResults, setSearchResults] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage('home')
    setShowModal(null)
  }

  const handleLogout = () => {
    setUser(null)
    setBookings([])
    setCurrentPage('home')
  }

  const handleBook = (item, type) => {
    if (!user) {
      setShowModal('login')
      return
    }
    setSelectedItem(item)
    setShowModal(type)
  }

  const handleConfirmBooking = (formData) => {
    const newBooking = {
      type: showModal,
      itemName: selectedItem.name,
      price: selectedItem.price,
      date: formData.date || new Date().toLocaleDateString(),
      details: formData
    }
    setBookings([...bookings, newBooking])
    setShowModal(null)
    setSelectedItem(null)
    alert('Booking confirmed! Check your dashboard for details.')
  }

  const handleCancelBooking = (index) => {
    setBookings(bookings.filter((_, i) => i !== index))
  }

  const handleAddToWishlist = (destination) => {
    if (wishlist.includes(destination.id)) {
      setWishlist(wishlist.filter(id => id !== destination.id))
    } else {
      setWishlist([...wishlist, destination.id])
    }
  }

  const handleSearch = (term) => {
    if (!term) return
    const results = destinations.filter(d => 
      d.name.toLowerCase().includes(term.toLowerCase()) ||
      d.category.toLowerCase().includes(term.toLowerCase()) ||
      d.description.toLowerCase().includes(term.toLowerCase())
    )
    setSearchResults(results)
    setCurrentPage('search')
  }

  const filteredDestinations = selectedCategory === 'all' 
    ? destinations 
    : destinations.filter(d => d.category === selectedCategory)

  const categories = ['all', 'beach', 'mountain', 'historical', 'city', 'adventure']

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={handleLogout} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Mobile Menu */}
      {currentPage === 'mobileMenu' && (
        <div className="fixed inset-0 bg-black z-40 pt-20 px-4">
          <div className="flex flex-col space-y-4 text-white text-xl">
            <button onClick={() => setCurrentPage('home')} className="py-2">Home</button>
            <button onClick={() => setCurrentPage('destinations')} className="py-2">Destinations</button>
            <button onClick={() => setCurrentPage('hotels')} className="py-2">Hotels</button>
            <button onClick={() => setCurrentPage('packages')} className="py-2">Packages</button>
            <button onClick={() => setCurrentPage('flights')} className="py-2">Flights</button>
            {user && <button onClick={() => setCurrentPage('dashboard')} className="py-2">Dashboard</button>}
          </div>
        </div>
      )}

      {/* Home Page */}
      {currentPage === 'home' && (
        <>
          <Hero onSearch={handleSearch} />
          
          {/* Featured Destinations */}
          <section className="py-16 px-4 bg-gray-50">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">Featured Destinations</h2>
              <p className="text-gray-600 text-center mb-12">Discover our handpicked destinations</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {destinations.slice(0, 6).map(dest => (
                  <DestinationCard 
                    key={dest.id} 
                    destination={dest} 
                    onViewDetails={(d) => { setSelectedItem(d); setShowModal('Destination') }}
                    onAddToWishlist={handleAddToWishlist}
                    wishlist={wishlist}
                  />
                ))}
              </div>
              <div className="text-center mt-8">
                <button onClick={() => setCurrentPage('destinations')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700">
                  View All Destinations
                </button>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { icon: 'fa-headset', title: '24/7 Support', color: 'from-blue-500 to-purple-500' },
                  { icon: 'fa-tags', title: 'Best Prices', color: 'from-green-500 to-blue-500' },
                  { icon: 'fa-shield-alt', title: 'Secure Booking', color: 'from-purple-500 to-pink-500' },
                  { icon: 'fa-star', title: 'Top Rated', color: 'from-yellow-500 to-orange-500' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-6">
                    <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <i className={`fas ${item.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Sarah Johnson', text: 'Amazing experience! Everything was perfectly organized.', rating: 5 },
                  { name: 'Mike Chen', text: 'Best travel agency! Will definitely book again.', rating: 5 },
                  { name: 'Emma Davis', text: 'Unforgettable trip! Highly recommended.', rating: 5 }
                ].map((testimonial, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex text-yellow-400 mb-4">{Array(testimonial.rating).fill().map((_, i) => <i key={i} className="fas fa-star"></i>)}</div>
                    <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8">Subscribe for exclusive deals and travel tips</p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900" />
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Subscribe</button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Destinations Page */}
      {currentPage === 'destinations' && (
        <div className="min-h-screen py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Explore Destinations</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full capitalize ${selectedCategory === cat ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map(dest => (
                <DestinationCard 
                  key={dest.id} 
                  destination={dest} 
                  onViewDetails={(d) => { setSelectedItem(d); setShowModal('Destination') }}
                  onAddToWishlist={handleAddToWishlist}
                  wishlist={wishlist}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hotels Page */}
      {currentPage === 'hotels' && (
        <div className="min-h-screen py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Book Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} onBook={(h) => handleBook(h, 'Hotel')} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Packages Page */}
      {currentPage === 'packages' && (
        <div className="min-h-screen py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Tour Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tourPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} onView={(p) => handleBook(p, 'Package')} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Flights Page */}
      {currentPage === 'flights' && (
        <div className="min-h-screen py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Book Flights</h2>
            <div className="space-y-6">
              {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} onBook={(f) => handleBook(f, 'Flight')} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {currentPage === 'search' && (
        <div className="min-h-screen py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Search Results</h2>
            {searchResults && searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map(dest => (
                  <DestinationCard 
                    key={dest.id} 
                    destination={dest} 
                    onViewDetails={(d) => { setSelectedItem(d); setShowModal('Destination') }}
                    onAddToWishlist={handleAddToWishlist}
                    wishlist={wishlist}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No results found. Try a different search term.</p>
            )}
            <div className="text-center mt-8">
              <button onClick={() => setCurrentPage('home')} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
      {currentPage === 'dashboard' && user && (
        <Dashboard user={user} bookings={bookings} onCancel={handleCancelBooking} />
      )}

      {/* Login Modal */}
      {showModal === 'login' && (
        <LoginModal onClose={() => setShowModal(null)} onLogin={handleLogin} />
      )}

      {/* Booking Modal */}
      {['Destination', 'Hotel', 'Package', 'Flight'].includes(showModal) && selectedItem && (
        <BookingModal 
          item={selectedItem} 
          type={showModal} 
          onClose={() => { setShowModal(null); setSelectedItem(null) }} 
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-blue-400"><i className="fab fa-facebook text-xl"></i></a>
            <a href="#" className="hover:text-blue-400"><i className="fab fa-twitter text-xl"></i></a>
            <a href="#" className="hover:text-blue-400"><i className="fab fa-instagram text-xl"></i></a>
            <a href="#" className="hover:text-blue-400"><i className="fab fa-youtube text-xl"></i></a>
          </div>
          <p>&copy; 2024 TravelEase Tourism Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default TourismManagement
