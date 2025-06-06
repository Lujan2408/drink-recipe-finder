export default function GenerateAI() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Redireccionando ...')
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">Generar Receta con AI</h2>

      <form onSubmit={handleSubmit} className="mt-8 sm:mt-12 max-w-3xl mx-auto w-full">
        <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-400 p-1 relative">
          <textarea
            name="prompt"
            id="prompt"
            rows={1}
            placeholder="¿Qué bebida te gustaría preparar?"
            className="w-full p-3 text-base sm:text-lg font-normal placeholder-gray-400 resize-none overflow-hidden focus:outline-none bg-transparent pr-14"
          />
          <button
            type="submit"
            className="absolute right-2 sm:right-4 bottom-2 sm:bottom-3.5 p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:cursor-pointer transition-all duration-200 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
