import { useState } from 'react'
import './App.css'

function App() {
  const [uploadedImages, setUploadedImages] = useState([])
  const [selectedTruckCategory, setSelectedTruckCategory] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const truckCategories = [
    { id: 1, name: 'Truck Category 1', description: '24\'x6\'x6\' capacity, 180 boxes' },
    { id: 2, name: 'Truck Category 2', description: '20\'x5\'x5\' capacity, 120 boxes' },
    { id: 3, name: 'Truck Category 3', description: '18\'x4.5\'x4.5\' capacity, 90 boxes' },
    { id: 4, name: 'Truck Category 4', description: '16\'x4\'x4\' capacity, 60 boxes' },
    { id: 5, name: 'Truck Category 5', description: '14\'x3.5\'x3.5\' capacity, 40 boxes' }
  ]

  const workflowSteps = [
    { title: 'Basic Steps described here', description: 'Some Content goes here Some Content goes here' },
    { title: 'Basic Steps described here', description: 'Some Content goes here Some Content goes here' },
    { title: 'Basic Steps described here', description: 'Some Content goes here Some Content goes here' },
    { title: 'Basic Steps described here', description: 'Some Content goes here Some Content goes here' }
  ]

  const boxResults = [
    { item: 'Large', boxType: 'Plastic Box', quantity: 20, dimension: '40"x 20"' },
    { item: 'Medium', boxType: 'Plastic Box', quantity: 15, dimension: '30"x 15"' },
    { item: 'Large', boxType: 'Plastic Box', quantity: 30, dimension: '40"x 20"' },
    { item: 'Large', boxType: 'Plastic Box', quantity: 20, dimension: '40"x 20"' }
  ]

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file, index) => ({
      id: uploadedImages.length + index,
      file,
      url: URL.createObjectURL(file)
    }))
    setUploadedImages([...uploadedImages, ...newImages])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    handleImageUpload(files)
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    handleImageUpload(files)
  }

  const handleProcess = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowResults(true)
    }, 3000)
  }

  const handleFindBestTruck = () => {
    // Logic for finding best truck
    console.log('Finding best truck...')
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">BestFIT</span>
          </div>
          <nav className="nav">
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Products</a>
            <a href="#" className="nav-link">Contact Sales</a>
            <a href="#" className="nav-link book-demo">Book Demo</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="main-container">
          {/* Upload Section */}
          <div className="upload-section">
            <h2 className="section-title">Kindly Upload the Box Images</h2>
            <div 
              className="upload-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {uploadedImages.length === 0 ? (
                <div className="upload-placeholder">
                  <div className="upload-icon">📦</div>
                  <p className="upload-text">Drag your box picture here</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="file-input"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="upload-button">
                    Upload & Process
                  </label>
                </div>
              ) : (
                <div className="uploaded-images">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="image-preview">
                      <img src={image.url} alt={`Box ${image.id}`} />
                      <button className="remove-image">×</button>
                    </div>
                  ))}
                  {!isProcessing && !showResults && (
                    <button className="process-button" onClick={handleProcess}>
                      Upload & Process
                    </button>
                  )}
                </div>
              )}
              
              {isProcessing && (
                <div className="processing">
                  <div className="processing-bar">
                    <div className="processing-fill"></div>
                  </div>
                  <p>Processing...</p>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="vehicle-section">
            <h2 className="section-title">Select Your Vehicle</h2>
            <div className="truck-categories">
              {truckCategories.map((category) => (
                <button
                  key={category.id}
                  className={`truck-category ${selectedTruckCategory === category.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTruckCategory(category.id)}
                >
                  <div className="truck-icon">🚛</div>
                  <div className="truck-info">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                </button>
              ))}
              <button className="load-more">Load more</button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="results-section">
            <h2 className="section-title">Uploaded Box Details</h2>
            <div className="results-table">
              <table>
                <thead>
                  <tr>
                    <th>Items</th>
                    <th>Box Type</th>
                    <th>Quantity</th>
                    <th>Dimension</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {boxResults.map((box, index) => (
                    <tr key={index}>
                      <td>{box.item}</td>
                      <td>{box.boxType}</td>
                      <td>{box.quantity}</td>
                      <td>{box.dimension}</td>
                      <td className="actions">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="find-truck-btn" onClick={handleFindBestTruck}>
                🔍 Find Best Truck
              </button>
            </div>
          </div>
        )}

        {/* How it works section */}
        <div className="workflow-section">
          <h2 className="section-title">How it works?</h2>
          <p className="workflow-description">
            Some Content goes here Some Content goes here Some Content goes here
          </p>
          <div className="workflow-steps">
            {workflowSteps.map((step, index) => (
              <div key={index} className="workflow-step">
                <div className="step-indicator">✓</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <span className="step-link">Watch Tutorial</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Copyright 2025 | www.bestfit.com</p>
      </footer>
    </div>
  )
}

export default App
