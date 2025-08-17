import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

function BarCodeWelcomePage() {
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

          {/* Main Content - Permission Denied */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center min-h-96">
            {/* Robot Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="text-center max-w-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dear Dhanushka,</h3>
              <p className="text-gray-600 mb-4">
                Currently, You do not have permission to perform the 'Scan Barcode' action.
              </p>
              <p className="text-gray-600">
                Please contact the administrator via email or phone to request access. Thank you for your understanding.
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

export default BarCodeWelcomePage
