export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Main Content */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Animated 404 Header */}
          <div className="relative bg-gradient-to-br from-red-900/50 to-red-800/30 p-12 text-center border-b border-gray-700">
            <div className="relative">
              {/* Número 404 grande */}
              <div className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 leading-none select-none">
                404
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-red-500/20 rounded-full animate-ping"></div>
            <div
              className="absolute bottom-10 right-10 w-16 h-16 border-4 border-red-500/20 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¡Ups! Página no encontrada
              </h2>
              <p className="text-lg text-gray-400 mb-2">
                Lo sentimos, la página que estás buscando no existe o ha sido
                movida.
              </p>
              <p className="text-sm text-gray-500">
                Puede que hayas escrito mal la URL o la página ya no esté
                disponible.
              </p>
            </div>

            {/* Contacto con el equipo de soporte */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Si crees que esto es un error, por favor contacta al{" "}
                <a
                  href="https://chat.whatsapp.com/GRPKiFkcujb7yOfqfW8dTD?mode=hqrt2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 underline"
                >
                  equipo de soporte
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2025 Tienda de abarrotes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
