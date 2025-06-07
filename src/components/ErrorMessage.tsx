export default function ErrorMessage({ children } : {children : React.ReactNode}) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 animate-fadeIn mt-8">
      <div className="relative transform transition-all">
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm sm:text-base text-red-700 font-medium">
                  {children}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
