import { useRef, useState, useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { useAppStore } from "../stores/useAppStore";

export default function GenerateAI() {

  const isGenerating = useAppStore((state) => state.isGenerating);
  const generateAnswer = useAppStore((state) => state.generateAnswer);
  const chatAnswer = useAppStore((state) => state.chat);
  const [error, setError] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = new FormData(e.currentTarget)
    const prompt = form.get("prompt") as string

    if (prompt.trim() === "") {
      setError("La consulta no Puede ir Vacía")
      return; 
    }

    setError("")
    await generateAnswer(prompt)

    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
    }
  }

    const handleInput = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
  }

   useEffect(() => {
    handleInput();
  }, []);

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
        Generar Receta con AI
      </h2>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <form
        onSubmit={handleSubmit}
        className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-3xl mx-auto w-full"
      >
        <div className="w-full bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-slate-400 p-2 relative flex items-center">
          <textarea
            ref={textareaRef}
            name="prompt"
            id="prompt"
            rows={1}
            onInput={handleInput}
            placeholder="¿Qué bebida te gustaría preparar?"
            className="w-full min-h-[44px] py-2.5 px-3 sm:py-3 sm:px-4 text-sm sm:text-base md:text-lg font-normal placeholder-gray-400 resize-none overflow-hidden focus:outline-none bg-transparent pr-12 sm:pr-14 md:pr-16"
          />
          <button
            type="submit"
            aria-label="Enviar"
            className={`absolute right-2.5 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 md:p-2.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:cursor-pointer transition-all duration-200 shadow-lg flex items-center justify-center ${
              isGenerating ? "cursor-not-allowed opacity-30" : ""
            }`}
            disabled={isGenerating}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>

        {isGenerating && (
          <p className="m-6 sm:m-8 md:m-10 font-semibold text-slate-800 flex justify-center items-center text-sm sm:text-base">
            Generando...
          </p>
        )}

        {chatAnswer && (
          <div className="my-6 sm:my-8 md:my-10 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-4 sm:p-5 md:p-6 shadow-lg border border-slate-300">
            <div className="prose prose-sm sm:prose md:prose-lg prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-800 font-medium sm:text-lg leading-relaxed">
                {chatAnswer}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
