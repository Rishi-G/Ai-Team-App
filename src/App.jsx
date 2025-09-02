import { useState } from 'react'

function App() {
  const [uploadedImages, setUploadedImages] = useState([])
  const [selectedTruckCategory, setSelectedTruckCategory] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showFinalResults, setShowFinalResults] = useState(false)

  const truckCategories = [
    { id: 1, name: 'Truck Category 1', description: '22ft X 10Ft , 22Tons, 8 wheelers, Tata' },
    { id: 2, name: 'Truck Category 2', description: '18ft X 8Ft , 16Tons, 6 wheelers, Eicher' },
    { id: 3, name: 'Truck Category 3', description: '40ft X 8Ft , 35Tons, 10 wheelers, Volvo' },
    { id: 4, name: 'Truck Category 4', description: '10ft X 6Ft , 4Tons, 4 wheelers, Mahindra' },
    { id: 5, name: 'Truck Category 5', description: '32ft X 8Ft , 25Tons, 12 wheelers, Ashok Leyland' }
  ]

  const boxResults = [
    { item: 'Large', boxType: 'Plastic Box', quantity: 20, dimension: '40"X 20"' },
    { item: 'Large', boxType: 'Plastic Box', quantity: 20, dimension: '40"X 20"' },
    { item: 'Large', boxType: 'Plastic Box', quantity: 20, dimension: '40"X 20"' },
    { item: 'Large', boxType: 'Plastic Box', quantity: 20, dimension: '40"X 20"' }
  ]

  const defaultBoxImages = [
    'https://api.builder.io/api/v1/image/assets/TEMP/b3691f86e598a125854e84f54d73ebbcda8642f5?width=214',
    'https://api.builder.io/api/v1/image/assets/TEMP/b3691f86e598a125854e84f54d73ebbcda8642f5?width=214',
    'https://api.builder.io/api/v1/image/assets/TEMP/b3691f86e598a125854e84f54d73ebbcda8642f5?width=214'
  ]

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file, index) => ({
      id: uploadedImages.length + index,
      file,
      url: URL.createObjectURL(file)
    }))
    setUploadedImages([...uploadedImages, ...newImages])
    if (!showResults) {
      setTimeout(() => setShowResults(true), 500)
    }
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
    setShowFinalResults(true)
  }

  const TruckIcon = () => (
    <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3394 25.6667C11.396 25.6664 12.4202 26.0313 13.2387 26.6995C14.0572 27.3676 14.6197 28.2981 14.831 29.3333H27.756V11H7.58936C6.6169 11 5.68426 11.3863 4.99663 12.0739C4.309 12.7616 3.92269 13.6942 3.92269 14.6667V29.3333H5.84769C6.05901 28.2981 6.62152 27.3676 7.44003 26.6995C8.25853 26.0313 9.28276 25.6664 10.3394 25.6667ZM10.3394 34.8333C9.28276 34.8335 8.25853 34.4687 7.44003 33.8005C6.62152 33.1324 6.05901 32.2019 5.84769 31.1667H2.08936V14.6667C2.08936 13.208 2.66882 11.809 3.70027 10.7776C4.73172 9.74613 6.13066 9.16667 7.58936 9.16667H27.756C28.2423 9.16667 28.7086 9.35983 29.0524 9.70364C29.3962 10.0475 29.5894 10.5138 29.5894 11V14.6667H35.0894L40.5894 22V31.1667H36.831C36.6206 32.2028 36.0585 33.1343 35.2399 33.8033C34.4213 34.4724 33.3966 34.8379 32.3394 34.8379C31.2821 34.8379 30.2574 34.4724 29.4388 33.8033C28.6202 33.1343 28.0581 32.2028 27.8477 31.1667H14.831C14.6197 32.2019 14.0572 33.1324 13.2387 33.8005C12.4202 34.4687 11.396 34.8335 10.3394 34.8333ZM10.3394 27.5C9.61001 27.5 8.91054 27.7897 8.39481 28.3055C7.87909 28.8212 7.58936 29.5206 7.58936 30.25C7.58936 30.9793 7.87909 31.6788 8.39481 32.1945C8.91054 32.7103 9.61001 33 10.3394 33C11.0687 33 11.7682 32.7103 12.2839 32.1945C12.7996 31.6788 13.0894 30.9793 13.0894 30.25C13.0894 29.5206 12.7996 28.8212 12.2839 28.3055C11.7682 27.7897 11.0687 27.5 10.3394 27.5ZM32.3394 25.6667C33.396 25.6664 34.4202 26.0313 35.2387 26.6995C36.0572 27.3676 36.6197 28.2981 36.831 29.3333H38.756V22.5867L38.316 22H29.5894V26.5833C30.3594 26.015 31.3127 25.6667 32.3394 25.6667ZM32.3394 27.5C31.61 27.5 30.9105 27.7897 30.3948 28.3055C29.8791 28.8212 29.5894 29.5206 29.5894 30.25C29.5894 30.9793 29.8791 31.6788 30.3948 32.1945C30.9105 32.7103 31.61 33 32.3394 33C33.0687 33 33.7682 32.7103 34.2839 32.1945C34.7996 31.6788 35.0894 30.9793 35.0894 30.25C35.0894 29.5206 34.7996 28.8212 34.2839 28.3055C33.7682 27.7897 33.0687 27.5 32.3394 27.5ZM29.5894 16.5V20.1667H36.9227L34.1727 16.5H29.5894Z" fill="url(#paint0_linear)"/>
      <defs>
        <linearGradient id="paint0_linear" x1="21.3394" y1="9.16667" x2="21.3394" y2="34.8379" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8A0C"/>
          <stop offset="1" stopColor="#CF822F"/>
        </linearGradient>
      </defs>
    </svg>
  )

  const PlayIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34.632 23.551C33.9848 26.0131 30.9232 27.753 24.798 31.2326C18.8763 34.5968 15.9155 36.278 13.5303 35.6033C12.5417 35.3231 11.6424 34.7919 10.9197 34.0615C9.16699 32.2923 9.16699 28.8621 9.16699 22C9.16699 15.1378 9.16699 11.7076 10.9197 9.93847C11.6426 9.20868 12.5419 8.67818 13.5303 8.39847C15.9155 7.72014 18.8763 9.40314 24.798 12.7673C30.9213 16.247 33.9848 17.9868 34.6338 20.449C34.9034 21.4654 34.9034 22.5345 34.6338 23.551" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const SearchIcon = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9998 2.5C11.5798 2.5 12.1498 2.558 12.6988 2.67C12.9587 2.72278 13.187 2.87664 13.3334 3.09775C13.4799 3.31886 13.5325 3.58909 13.4798 3.849C13.427 4.10891 13.2731 4.33721 13.052 4.48368C12.8309 4.63014 12.5607 4.68278 12.3008 4.63C11.0413 4.37306 9.73384 4.49534 8.54382 4.98139C7.3538 5.46743 6.33461 6.2954 5.61512 7.36063C4.89562 8.42586 4.50812 9.6805 4.50162 10.9659C4.49511 12.2514 4.86989 13.5099 5.57857 14.5823C6.28725 15.6548 7.298 16.493 8.48304 16.9911C9.66808 17.4892 10.9742 17.6247 12.2362 17.3805C13.4983 17.1363 14.6596 16.5234 15.5733 15.6193C16.4871 14.7152 17.1122 13.5604 17.3698 12.301C17.3959 12.1723 17.4471 12.05 17.5205 11.9411C17.5939 11.8322 17.688 11.7388 17.7975 11.6663C17.907 11.5938 18.0297 11.5435 18.1586 11.5184C18.2875 11.4933 18.4201 11.4939 18.5488 11.52C18.6775 11.5461 18.7997 11.5974 18.9086 11.6708C19.0175 11.7441 19.1109 11.8383 19.1834 11.9477C19.256 12.0572 19.3062 12.1799 19.3313 12.3088C19.3564 12.4377 19.3559 12.5703 19.3298 12.699C19.0862 13.8916 18.5893 15.018 17.8728 16.002L17.6758 16.262L21.3278 19.914C21.509 20.0935 21.6148 20.3356 21.6234 20.5905C21.6321 20.8455 21.543 21.0942 21.3743 21.2856C21.2056 21.477 20.9702 21.5967 20.7161 21.6202C20.4621 21.6437 20.2087 21.5692 20.0078 21.412L19.9138 21.328L16.2618 17.676C15.1972 18.515 13.9475 19.0872 12.6168 19.3449C11.2861 19.6026 9.91309 19.5384 8.61228 19.1576C7.31147 18.7768 6.12059 18.0904 5.139 17.1557C4.15741 16.2211 3.41357 15.0652 2.96954 13.7846C2.52551 12.504 2.39417 11.1357 2.58647 9.79404C2.77878 8.45235 3.28914 7.17609 4.075 6.07175C4.86086 4.96742 5.89941 4.06702 7.10402 3.44569C8.30863 2.82436 9.64436 2.50012 10.9998 2.5Z" fill="white"/>
    </svg>
  )

  return (
    <div className="min-h-screen bg-neutral text-base-content font-inter" data-theme="bestfit">
      {/* Header */}
      <header className="bg-gradient-to-b from-[#353535] to-[#2E2E2E] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-8 bg-gray-300 rounded-lg"></div>
                <div className="absolute top-1 left-5 w-8 h-6 bg-gray-300 rounded-md"></div>
              </div>
              <span className="text-xl font-bold text-white">BestFIT</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-white/5">Home</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-white/5">About</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-white/5">Products</a>
              <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-white/5">Contact Sales</a>
              <a href="#" className="btn-glass text-sm text-primary font-bold">Book Demo</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-black to-neutral-900 overflow-hidden">
        {/* Background Animation/Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center min-h-screen">
          {/* Left Side - Text Content */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Box Dimension Estimator
                <br />
                <span className="text-primary">& Truck Packing</span>
              </h1>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Advance <span className="text-primary">Ai model</span> Algorithm
                </h2>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our AI optimizes truck space utilization by precisely calculating box dimensions and packing efficiency. By focusing on speed and precision, we ensure tasks are completed faster without compromising quality. Through innovative design, we maximize 3D available space, minimizing waste and optimizing every cubic inch. This revolutionary approach to logistics efficiency transforms the need for excessive manpower. The result is a smarter, faster system that performs better, uses resources, and allows teams to focus on what they matter: Whether in logistics, manufacturing, or supply chain, our AI-powered system elevates performance across speed, clarity, and control.
              </p>

              <button
                className="btn-glass-primary text-lg flex items-center gap-3"
                onClick={() => document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - AI Mapping Section */}
          <div className="lg:w-1/2 lg:pl-12 mt-12 lg:mt-0">
            <div className="relative">
              {/* Box Images */}
              <div className="mb-8">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/b3691f86e598a125854e84f54d73ebbcda8642f5?width=400"
                  alt="Box illustration"
                  className="w-full max-w-md mx-auto"
                />
              </div>

              {/* Warehouse Background */}
              <div className="relative">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/warehouse-bg.jpg"
                  alt="Warehouse background"
                  className="w-full rounded-2xl opacity-80"
                />

                {/* AI Mapping Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl flex flex-col justify-end p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                        <path d="M12 2C13.09 2 14 2.91 14 4C14 5.09 13.09 6 12 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 18C10.91 18 10 18.91 10 20C10 21.09 10.91 22 12 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold">AI Based <span className="text-primary">Mapping</span></h3>
                      <p className="text-gray-300">for your boxes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-400 text-sm mb-2">Scroll Down</p>
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="upload-section" className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <div className="card-glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-primary">Kindly Upload the Box Images</h2>
              <button className="interactive-glass w-8 h-8 flex items-center justify-center rounded-full">
                <span className="text-primary font-bold text-lg">+</span>
              </button>
            </div>
            
            <div
              className="upload-glass p-8 min-h-[200px] flex flex-col justify-center items-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {showResults ? (
                <div className="grid grid-cols-3 gap-4 w-full">
                  {defaultBoxImages.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <div className="w-full aspect-square bg-white rounded-lg border-2 border-primary overflow-hidden">
                        <img src={imageUrl} alt={`Box ${index + 1}`} className="w-full h-full object-cover p-2" />
                      </div>
                      <button className="absolute top-2 right-2 w-8 h-8 bg-black/70 text-red-500 rounded-full flex items-center justify-center text-xl font-bold hover:bg-black/90 transition-colors">
                        +
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl opacity-60 mb-4">📦</div>
                  <p className="text-gray-400 text-lg mb-6">Drag your box picture here</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="btn-glass-primary cursor-pointer inline-block">
                    Upload & Process
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="card-custom p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-primary">Select Your Vehicle</h2>
              <button className="btn btn-ghost btn-sm">
                <span className="text-primary font-bold text-xs">+ Add Vehicle</span>
              </button>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {truckCategories.map((category) => (
                <button
                  key={category.id}
                  className={`w-full p-4 rounded-lg border transition-all flex items-center gap-4 text-left ${
                    selectedTruckCategory === category.id
                      ? 'bg-[#502F0C] border-primary'
                      : 'bg-transparent border-gray-600 hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTruckCategory(category.id)}
                >
                  <TruckIcon />
                  <div className="flex-1">
                    <h3 className={`font-bold text-base ${
                      selectedTruckCategory === category.id ? 'text-primary' : 'text-white'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-xs ${
                      selectedTruckCategory === category.id ? 'text-primary' : 'text-text-muted'
                    }`}>
                      {category.description}
                    </p>
                  </div>
                </button>
              ))}
              <button className="w-full text-center text-gray-500 text-xs py-2 hover:text-primary transition-colors">
                Load more..
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="card-custom p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-primary">Uploaded Box Details</h2>
              <button className="btn btn-ghost btn-sm">
                <span className="text-primary font-bold">-</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700/50 bg-gray-800/50">
                      <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wide">Items</th>
                      <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wide">Box Type</th>
                      <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wide">Quantity</th>
                      <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm uppercase tracking-wide">Dimension</th>
                      <th className="text-left py-4 px-6 text-primary font-semibold text-sm uppercase tracking-wide">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boxResults.map((box, index) => (
                      <tr key={index} className="border-b border-gray-700/30 hover:bg-gray-800/30 transition-colors duration-200">
                        <td className="py-4 px-6 text-white text-sm font-medium">{box.item}</td>
                        <td className="py-4 px-6 text-gray-300 text-sm">{box.boxType}</td>
                        <td className="py-4 px-6 text-gray-300 text-sm">
                          <span className="bg-gray-700/50 px-3 py-1 rounded-full text-xs font-medium">
                            {box.quantity}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-300 text-sm font-mono">{box.dimension}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors duration-200 hover:bg-primary/10 px-3 py-1 rounded-md">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button className="flex items-center gap-1 text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200 hover:bg-red-400/10 px-3 py-1 rounded-md">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Table Footer with Summary */}
                <div className="border-t border-gray-700/50 bg-gray-800/30 px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      Total Items: <span className="text-white font-medium">{boxResults.length}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Total Quantity: <span className="text-white font-medium">{boxResults.reduce((sum, box) => sum + box.quantity, 0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                className="btn bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-full border-0"
                onClick={handleFindBestTruck}
              >
                <SearchIcon />
                Find Best Truck
              </button>
            </div>
          </div>
        )}

        {/* Final Results Section */}
        {showFinalResults && (
          <div className="card-custom p-6" style={{backgroundColor: '#082608', borderColor: 'rgba(46, 167, 48, 0.32)'}}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold">
                <span className="text-primary">BestFit</span>{' '}
                <span className="text-gray-400">Results for you Boxes are -</span>
              </h2>
              <button className="btn btn-ghost btn-sm">
                <span className="text-white font-bold">-</span>
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className="relative bg-white rounded-xl p-8 max-w-md">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/4e724097cfb4787d7db0a581bba71eb59f127b9d?width=652" 
                  alt="3D Visualization" 
                  className="w-full h-auto rounded-lg"
                />
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-15 h-15 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors">
                    <PlayIcon />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-center py-16 mt-16">
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4">Footer Links</p>
          <div className="flex justify-center space-x-8">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Support</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Contact</a>
          </div>
        </div>
        <p className="text-xs text-gray-600">copyright@ 2025 | www.outworx.com</p>
      </footer>
    </div>
  )
}

export default App
