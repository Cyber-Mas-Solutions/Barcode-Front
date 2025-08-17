"use client"

import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

const EnterPackageDetails = () => {
  const [formData, setFormData] = useState({
    barcodeType: "",
    customer: "",
    poNo: "",
    saleNo: "",
    orderNo: "",
    color: "",
    artExg: "",
    date: "",
    time: "",
  })

  const [sizeQuantity, setSizeQuantity] = useState({
    size: "",
    quantity: "",
  })

  const [addedItems, setAddedItems] = useState([])
  const [showSummary, setShowSummary] = useState(false)

  // Auto-fill date and time
  useEffect(() => {
    const now = new Date()
    const currentDate = now.toISOString().split("T")[0]
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5)

    setFormData((prev) => ({
      ...prev,
      date: currentDate,
      time: currentTime,
    }))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSizeQuantityChange = (e) => {
    const { name, value } = e.target
    setSizeQuantity((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAdd = () => {
    if (sizeQuantity.size && sizeQuantity.quantity) {
      const newItem = {
        id: Date.now(),
        size: sizeQuantity.size,
        quantity: Number.parseInt(sizeQuantity.quantity),
      }
      setAddedItems((prev) => [...prev, newItem])
      setSizeQuantity({ size: "", quantity: "" })
      setShowSummary(true)
    }
  }

  const handleCancel = () => {
    setAddedItems([])
    setSizeQuantity({ size: "", quantity: "" })
    setShowSummary(false)
  }

  const handleSave = () => {
    console.log("Saving data:", { formData, addedItems })
    alert("Data saved successfully!")
  }

  const handlePrintPreview = () => {
    console.log("Print Preview:", { formData, addedItems })
    alert("Opening Print Preview...")
  }

  const handleClear = () => {
    setFormData({
      barcodeType: "",
      customer: "",
      poNo: "",
      saleNo: "",
      orderNo: "",
      color: "",
      artExg: "",
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(" ")[0].slice(0, 5),
    })
    setAddedItems([])
    setSizeQuantity({ size: "", quantity: "" })
    setShowSummary(false)
  }

  const removeItem = (id) => {
    setAddedItems((prev) => prev.filter((item) => item.id !== id))
    if (addedItems.length === 1) {
      setShowSummary(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Enter Package Details</h1>
                <p className="text-sm text-gray-500">
                  Enter your package information and select the appropriate barcode type
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>Date</span>
                <span className="font-medium">{formData.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Time</span>
                <span className="font-medium">{formData.time}</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                Admin
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-600">Create Barcode</h2>
              <button className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode Type</label>
                  <select
                    name="barcodeType"
                    value={formData.barcodeType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Type1">Type1</option>
                    <option value="Type2">Type2</option>
                    <option value="Type3">Type3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                  <input
                    type="text"
                    name="customer"
                    value={formData.customer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Po No</label>
                  <input
                    type="text"
                    name="poNo"
                    value={formData.poNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sale No</label>
                  <input
                    type="text"
                    name="saleNo"
                    value={formData.saleNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order No</label>
                  <input
                    type="text"
                    name="orderNo"
                    value={formData.orderNo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Color</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                  </select>
                </div>
              </div>

              {/* Right Column - Size/Quantity and Additional Fields */}
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <input
                      type="text"
                      name="size"
                      value={sizeQuantity.size}
                      onChange={handleSizeQuantityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={sizeQuantity.quantity}
                      onChange={handleSizeQuantityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleAdd}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Summary Section */}
                {showSummary && (
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-700">Added Items</h3>
                      <button onClick={handleCancel} className="text-red-500 hover:text-red-700 text-sm">
                        Cancel All
                      </button>
                    </div>
                    <div className="space-y-2">
                      {addedItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded border">
                          <span className="text-sm">
                            Size: {item.size}, Qty: {item.quantity}
                          </span>
                          <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ART EXG</label>
                  <select
                    name="artExg"
                    value={formData.artExg}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select ART EXG</option>
                    <option value="ART1">ART1</option>
                    <option value="ART2">ART2</option>
                    <option value="ART3">ART3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <div className="flex space-x-3">
                <button
                  onClick={handlePrintPreview}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Print Preview
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Clear
                </button>
              </div>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default EnterPackageDetails
