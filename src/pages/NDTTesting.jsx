import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NDTTesting = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser')
    if (user) {
      setLoggedInUser(JSON.parse(user))
    }
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  const machines = [
    { id: 1, name: 'Ultrasonic Testing Machine', category: 'NDT', services: [{ name: 'Thickness Measurement', price: 500 }, { name: 'Flaw Detection', price: 800 }] },
    { id: 2, name: 'X-Ray Machine', category: 'NDT', services: [{ name: 'Weld Inspection', price: 1200 }, { name: 'Castings Inspection', price: 1000 }] },
    { id: 3, name: 'Dye Penetrant Testing', category: 'NDT', services: [{ name: 'Surface Crack Detection', price: 300 }] },
    { id: 4, name: 'Tensile Testing Machine', category: 'DT', services: [{ name: 'Tensile Strength Test', price: 1500 }, { name: 'Yield Strength Test', price: 1500 }] },
    { id: 5, name: 'Hardness Tester', category: 'DT', services: [{ name: 'Rockwell Test', price: 400 }, { name: 'Brinell Test', price: 400 }] },
    { id: 6, name: 'Impact Testing Machine', category: 'DT', services: [{ name: 'Charpy Test', price: 800 }, { name: 'Izod Test', price: 800 }] }
  ]

  const trainingPrograms = [
    { title: 'NDT Level I Training', duration: '1 Month', fee: '₹10,000' },
    { title: 'DT Advanced Course', duration: '2 Months', fee: '₹18,000' }
  ]

  const addToCart = (serviceName, price) => {
    const newCart = [...cart, { name: serviceName, price }]
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    alert(`${serviceName} (₹${price}) added to cart!`)
  }

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('userRole')
    setLoggedInUser(null)
  }

  const ndtMachines = machines.filter(m => m.category === 'NDT')
  const dtMachines = machines.filter(m => m.category === 'DT')

  return (
    <div className="min-h-screen bg-gray-100 font-roboto">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <i className="fas fa-cogs text-3xl"></i>
            <h1 className="text-2xl font-bold">
              {loggedInUser ? `Welcome, ${loggedInUser.name}` : 'DT & NDT SERVICES'}
            </h1>
          </div>
          <nav className="flex space-x-4">
            <a href="#home" className="hover:text-blue-400">Home</a>
            <a href="#machines" className="hover:text-blue-400">Machines</a>
            <a href="#training" className="hover:text-blue-400">Training</a>
            <a href="#contact" className="hover:text-blue-400">Contact</a>
            {loggedInUser ? (
              <>
                <Link to="/projects" className="hover:text-blue-400">Back to Projects</Link>
                <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
              </>
            ) : (
              <a href="#login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Login</a>
            )}
          </nav>
        </div>
      </header>

      {/* Banner */}
      <section id="home" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Machine Testing Company</h2>
          <p className="text-xl mb-8">Book, Track & Get Reports of Your Machine Testing Easily</p>
          <a href="#machines" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100">
            Get Started
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <i className="fas fa-cogs text-4xl text-blue-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Advanced Equipment</h3>
              <p className="text-gray-600">State-of-the-art NDT and DT machines for accurate testing.</p>
            </div>
            <div className="text-center p-6">
              <i className="fas fa-user-check text-4xl text-green-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Certified Professionals</h3>
              <p className="text-gray-600">Experienced technicians ensuring reliable results.</p>
            </div>
            <div className="text-center p-6">
              <i className="fas fa-clock text-4xl text-purple-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">Fast processing and timely report delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Machines & Services */}
      <section id="machines" className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Machines & Services</h2>

          <h3 className="text-2xl font-semibold mb-4">🛠️ NDT (Non-Destructive Testing)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {ndtMachines.map(machine => (
              <div key={machine.id} className="bg-white rounded-lg shadow-lg p-6">
                <i className="fas fa-microscope text-3xl text-blue-600 mb-4"></i>
                <h4 className="text-xl font-semibold mb-4">{machine.name}</h4>
                <div className="space-y-3">
                  {machine.services.map((service, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2">
                      <span>{service.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">₹{service.price}</span>
                        {loggedInUser ? (
                          <button 
                            onClick={() => addToCart(service.name, service.price)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Book
                          </button>
                        ) : (
                          <span className="text-red-500 text-sm">Login to Book</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-semibold mb-4">🔧 DT (Destructive Testing)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dtMachines.map(machine => (
              <div key={machine.id} className="bg-white rounded-lg shadow-lg p-6">
                <i className="fas fa-cogs text-3xl text-red-600 mb-4"></i>
                <h4 className="text-xl font-semibold mb-4">{machine.name}</h4>
                <div className="space-y-3">
                  {machine.services.map((service, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2">
                      <span>{service.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">₹{service.price}</span>
                        {loggedInUser ? (
                          <button 
                            onClick={() => addToCart(service.name, service.price)}
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Book
                          </button>
                        ) : (
                          <span className="text-red-500 text-sm">Login to Book</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section id="training" className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Training Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {trainingPrograms.map((program, idx) => (
              <div key={idx} className="bg-gray-100 rounded-lg shadow-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">Duration: {program.duration} | Fee: {program.fee}</p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Track Order</h3>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Track Now
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Download Reports</h3>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Download
              </button>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
              <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Check
              </button>
            </div>
          </div>
          {!loggedInUser && (
            <p className="text-center text-red-500 mt-4">⚠️ Please login to use these features.</p>
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="mb-2">Email: info@company.com | Phone: +91-9876543210</p>
          <p>Address: Bhubaneswar, Odisha, India</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 text-center">
        <p>© 2025 Machine Testing Services</p>
      </footer>
    </div>
  )
}

export default NDTTesting
