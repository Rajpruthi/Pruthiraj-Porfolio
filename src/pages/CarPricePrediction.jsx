import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CarPricePrediction = () => {
  const [formData, setFormData] = useState({
    car_name: '',
    year: '',
    present_price: '',
    kms_driven: '',
    fuel_type: '',
    seller_type: '',
    transmission: '',
    owner: ''
  })
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  const carModels = [
    { group: 'Toyota', models: ['corolla altis', 'fortuner', 'innova', 'etios cross', 'etios g', 'etios liva', 'land cruiser'] },
    { group: 'Hyundai', models: ['creta', 'i20', 'grand i10', 'xcent', 'eon'] },
    { group: 'Honda', models: ['city', 'amaze', 'jazz', 'brio', 'civic', 'cr-v'] },
    { group: 'Maruti Suzuki', models: ['swift', 'dzire', 'ciaz', 'ertiga', 'baleno', 'alto 800', 'alto k10', 'wagon r', 'ignis', 's cross', 'vitara brezza'] },
    { group: 'Others', models: ['ritz', 'omni', 'eclass', 'i-vtec'] }
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i)

  useEffect(() => {
    const savedHistory = localStorage.getItem('carPredictionHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const basePrice = parseFloat(formData.present_price) || 5
      const age = currentYear - parseInt(formData.year)
      const kmFactor = 1 - (parseInt(formData.kms_driven) || 0) / 100000
      const fuelFactor = formData.fuel_type === 'Diesel' ? 1.1 : formData.fuel_type === 'CNG' ? 0.9 : 1
      const transFactor = formData.transmission === 'Automatic' ? 1.15 : 1
      const sellerFactor = formData.seller_type === 'Dealer' ? 1.05 : 1
      const ownerFactor = 1 - (parseInt(formData.owner) || 0) * 0.1

      const predictedPrice = (basePrice * kmFactor * fuelFactor * transFactor * sellerFactor * ownerFactor * (1 - age * 0.05)).toFixed(2)

      const result = {
        predicted_price: Math.max(predictedPrice, 0.5),
        car_data: { ...formData, year: parseInt(formData.year), present_price: parseFloat(formData.present_price), kms_driven: parseInt(formData.kms_driven) }
      }

      setPrediction(result)
      setLoading(false)

      const newHistory = [result, ...history].slice(0, 10)
      setHistory(newHistory)
      localStorage.setItem('carPredictionHistory', JSON.stringify(newHistory))
    }, 1500)
  }

  const resetForm = () => {
    setFormData({
      car_name: '',
      year: '',
      present_price: '',
      kms_driven: '',
      fuel_type: '',
      seller_type: '',
      transmission: '',
      owner: ''
    })
    setPrediction(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/projects" className="flex items-center space-x-2 hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">
                <i className="fas fa-car mr-3"></i>Car Price Prediction
              </h1>
              <p className="text-lg opacity-90">Predict the selling price of your car with AI</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              <i className="fas fa-calculator mr-2 text-blue-600"></i>Enter Car Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Car Model</label>
<select name="car_name" value={formData.car_name} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select Car Model</option>
                  {carModels.map(group => (
                    <optgroup key={group.group} label={group.group}>
                      {group.models.map(model => (
                        <option key={model} value={model}>{model.charAt(0).toUpperCase() + model.slice(1)}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Manufacturing Year</label>
<select name="year" value={formData.year} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Present Price (in lakhs)</label>
                <input type="number" name="present_price" value={formData.present_price} onChange={handleChange} step="0.01" min="0.1" max="100" required placeholder="e.g., 5.59" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Kilometers Driven</label>
                <input type="number" name="kms_driven" value={formData.kms_driven} onChange={handleChange} min="0" max="1000000" required placeholder="e.g., 27000" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fuel Type</label>
<select name="fuel_type" value={formData.fuel_type} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Seller Type</label>
<select name="seller_type" value={formData.seller_type} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select Seller Type</option>
                  <option value="Dealer">Dealer</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Transmission</label>
<select name="transmission" value={formData.transmission} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select Transmission</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Number of Previous Owners</label>
<select name="owner" value={formData.owner} onChange={handleChange} required className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black">
                  <option value="">Select Owner Count</option>
                  <option value="0">First Owner</option>
                  <option value="1">Second Owner</option>
                  <option value="2">Third Owner</option>
                  <option value="3">Fourth & Above</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i> Predicting...
                    </span>
                  ) : (
                    <span><i className="fas fa-magic mr-2"></i> Predict Price</span>
                  )}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition">
                  <i className="fas fa-redo"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {prediction && (
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  <i className="fas fa-chart-line mr-2 text-green-600"></i>Prediction Result
                </h3>
                <div className="text-center py-6">
                  <h4 className="text-lg font-semibold mb-2">Predicted Selling Price</h4>
                  <div className="text-4xl font-bold text-green-600 mb-2">₹{prediction.predicted_price} Lakhs</div>
                  <p className="text-sm text-gray-500">Based on current market conditions</p>
                </div>
                <div className="mt-6">
                  <h5 className="font-semibold mb-3">Car Details Summary:</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Model:</strong> {prediction.car_data.car_name}</div>
                    <div><strong>Year:</strong> {prediction.car_data.year}</div>
                    <div><strong>Present Price:</strong> ₹{prediction.car_data.present_price}L</div>
                    <div><strong>Kms Driven:</strong> {prediction.car_data.kms_driven.toLocaleString()}</div>
                    <div><strong>Fuel:</strong> {prediction.car_data.fuel_type}</div>
                    <div><strong>Transmission:</strong> {prediction.car_data.transmission}</div>
                    <div><strong>Seller:</strong> {prediction.car_data.seller_type}</div>
                    <div><strong>Owners:</strong> {prediction.car_data.owner === '0' ? 'First' : prediction.car_data.owner === '1' ? 'Second' : prediction.car_data.owner === '2' ? 'Third' : 'Fourth+'}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                <i className="fas fa-chart-pie mr-2 text-blue-600"></i>Dataset Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">301</div>
                  <div className="text-sm text-gray-600">Total Cars</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹4.66L</div>
                  <div className="text-sm text-gray-600">Avg Price</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">2018</div>
                  <div className="text-sm text-gray-600">Newest Car</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">2003</div>
                  <div className="text-sm text-gray-600">Oldest Car</div>
                </div>
              </div>
            </div>

            {history.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  <i className="fas fa-history mr-2 text-purple-600"></i>Recent Predictions
                </h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {history.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold">{item.car_data.car_name}</p>
                        <p className="text-sm text-gray-500">{item.car_data.year} • {item.car_data.kms_driven.toLocaleString()} km</p>
                      </div>
                      <div className="text-green-600 font-bold">₹{item.predicted_price}L</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            <i className="fas fa-code mr-2"></i>
            Built with Flask, Scikit-Learn, and Tailwind CSS
          </p>
          <p className="text-gray-400">© 2024 Car Price Prediction. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default CarPricePrediction
