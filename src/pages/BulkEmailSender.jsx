import { useState } from 'react'
import { Link } from 'react-router-dom'

const BulkEmailSender = () => {
  const [formData, setFormData] = useState({
    subject: '',
    senderName: '',
    message: ''
  })
  const [fileInfo, setFileInfo] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [stats, setStats] = useState({
    totalSent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0
  })
  const [progress, setProgress] = useState(0)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB'
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate sending
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgress(currentProgress)
      if (currentProgress >= 100) {
        clearInterval(interval)
        setStats(prev => ({
          totalSent: prev.totalSent + 100,
          delivered: prev.delivered + 95,
          opened: prev.opened + 40,
          clicked: prev.clicked + 15
        }))
        setProgress(0)
      }
    }, 200)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/projects" className="flex items-center space-x-2 hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Projects</span>
            </Link>
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-4xl font-bold">
                <i className="fas fa-envelope-bulk mr-3"></i>
                Bulk Email Service
              </h1>
              <p className="text-lg opacity-90">Professional Email Marketing Made Simple</p>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                <i className="fas fa-paper-plane mr-3 text-blue-600"></i>
                Create Campaign
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* CSV Upload */}
                <div className="space-y-4">
                  <label className="block text-lg font-semibold text-gray-700">
                    <i className="fas fa-file-csv mr-2 text-green-600"></i>
                    Recipient List
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-all">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 mb-4">Drop your CSV file here or click to browse</p>
                    <input 
                      type="file" 
                      accept=".csv" 
                      onChange={handleFileChange}
                      className="hidden" 
                      id="csv-file"
                    />
                    <label 
                      htmlFor="csv-file"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-all"
                    >
                      <i className="fas fa-folder-open mr-2"></i>
                      Choose File
                    </label>
                  </div>
                  {fileInfo && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-check-circle text-green-600"></i>
                        <div>
                          <p className="font-medium text-green-800">{fileInfo.name}</p>
                          <p className="text-sm text-green-600">{fileInfo.size}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700">
                      <i className="fas fa-heading mr-2 text-purple-600"></i>
                      Email Subject
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter subject line..."
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-700">
                      <i className="fas fa-user mr-2 text-indigo-600"></i>
                      Sender Name
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name or company"
                      value={formData.senderName}
                      onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-semibold text-gray-700">
                    <i className="fas fa-edit mr-2 text-orange-600"></i>
                    Email Message
                  </label>
                  <textarea 
                    rows="6" 
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    placeholder="Write your email message here... Use {{name}} for personalization"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  ></textarea>
                  <p className="text-sm text-gray-500">
                    <i className="fas fa-info-circle mr-1"></i>
                    Use {'{{name}}'}, {'{{email}}'}, {'{{company}}'} for dynamic content
                  </p>
                </div>

                {/* Preview Button */}
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    onClick={() => setShowPreview(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg transition-all"
                  >
                    <i className="fas fa-eye mr-2"></i>
                    Preview Email
                  </button>
                </div>

                {/* Send Button */}
                <div className="flex justify-center pt-4">
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl text-lg font-semibold transition-all disabled:opacity-50"
                    disabled={!fileInfo}
                  >
                    <i className="fas fa-paper-plane mr-3"></i>
                    Send Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                <i className="fas fa-chart-pie mr-2 text-blue-600"></i>
                Campaign Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sent</span>
                  <span className="font-bold text-green-600">{stats.totalSent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivered</span>
                  <span className="font-bold text-blue-600">{stats.delivered}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Opened</span>
                  <span className="font-bold text-purple-600">{stats.opened}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Clicked</span>
                  <span className="font-bold text-orange-600">{stats.clicked}</span>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                <i className="fas fa-tasks mr-2 text-green-600"></i>
                Sending Progress
              </h3>
              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600">
                  {progress > 0 ? `Sending... ${progress}%` : 'Ready to send'}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                <i className="fas fa-bolt mr-2 text-yellow-600"></i>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg transition-all">
                  <i className="fas fa-file-import mr-2"></i>
                  Import Template
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg transition-all">
                  <i className="fas fa-users mr-2"></i>
                  Manage Lists
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg transition-all">
                  <i className="fas fa-clock mr-2"></i>
                  Schedule Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  <i className="fas fa-eye mr-2 text-blue-600"></i>
                  Email Preview
                </h3>
                <button onClick={() => setShowPreview(false)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 border">
                <div className="mb-4">
                  <strong>Subject:</strong> {formData.subject || 'No subject'}
                </div>
                <div className="mb-4">
                  <strong>From:</strong> {formData.senderName || 'No sender'}
                </div>
                <div className="border-t pt-4">
                  <div className="whitespace-pre-wrap">{formData.message || 'No message'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BulkEmailSender
