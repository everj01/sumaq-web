export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center bg-white rounded-lg shadow-lg p-8">
        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-gray-300 mb-2">404</h1>
          <div className="w-16 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Página no encontrada</h2>
          <p className="text-gray-600 leading-relaxed">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoHome}
             className="bg-emerald-700 w-full text-white  font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
          >
          
            Volver al inicio
          </button>

          <button
            onClick={handleGoBack}
           className="bg-white w-full text-emerald-800 font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer"
          >
            
            Página anterior
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            ¿Necesitas ayuda?{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
