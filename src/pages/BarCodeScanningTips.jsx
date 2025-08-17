import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

function BarCodeScanningTips() {
  const scanningTips = [
    {
      number: "01",
      title: "Position the Barcode Properly",
      description: "Hold the product so the barcode is clearly visible and centered under the scanner.",
    },
    {
      number: "02",
      title: "Maintain a Close Distance",
      description: "Keep the barcode close (but not touching) to the scanner for accurate detection.",
    },
    {
      number: "03",
      title: "Wait for the Beep Sound",
      description: "A beep sound indicates that the barcode has been successfully scanned.",
    },
    {
      number: "04",
      title: "Avoid Glare or Wrinkles",
      description: "Ensure the barcode is not bent, wrinkled, or covered by reflective surfaces.",
    },
    {
      number: "05",
      title: "Scan One Item at a Time",
      description: "Please wait for the beep before scanning the next item to avoid duplicates.",
    },
    {
      number: "06",
      title: "If Scan Fails",
      description: "Try adjusting the angle or distance. If the issue persists, contact the support team.",
    },
  ]

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Right column */}
      <div className="flex flex-col flex-1 overflow-hidden bg-gray-100">
        {/* Scrollable main area */}
        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Page Heading */}
          <nav className="w-full bg-white shadow-md p-4 flex items-center justify-between rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M12 8h4.01"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-lg leading-4">Scan Barcode</h2>
                <span className="text-xs text-gray-500">
                  Quickly scan and retrieve package information using your device's scanner.
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium">Date</div>
              <div className="text-xs text-gray-500">Time</div>
            </div>

            <div className="flex items-center space-x-2 bg-blue-100 py-2 px-3 rounded-md">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-sm font-medium text-blue-600">Admin</span>
            </div>
          </nav>

          {/* Main Content - Barcode Scanning Tips */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Barcode Scanning Tips</h3>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>

            {/* Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {scanningTips.map((tip) => (
                <div key={tip.number} className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {tip.number}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ready to Scan Section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <button
                onClick={() => alert("Scanning started!")}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition duration-200"
              >
              Ready to Scan!
              </button>
              <p className="text-green-700 text-sm">
                Following these tips will help you achieve fast, accurate scans and improve your overall scanning
                experience.
              </p>
            </div>
          </div>
        </main>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t shadow-sm">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default BarCodeScanningTips
