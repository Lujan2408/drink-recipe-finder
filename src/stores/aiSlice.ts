import type { StateCreator } from 'zustand'
import ai from '../lib/aiConnection'
import extractTextFromResponse from '../helpers/extractTextFromResponse'

export type AISlice = {
  chat: string
  isGenerating: boolean,
  generateAnswer: (prompt: string) => Promise <void>
}

export const createAISlice : StateCreator<AISlice> = (set) => ({
  chat: "",
  isGenerating: false,
  
  generateAnswer: async (prompt) => {
    set({
      isGenerating: true,
      chat: ""
    })

    const response = await ai.models.generateContentStream({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres bartender experto en toda clase de bebidas. Amigable con los clientes pero consiso en tus respuestas",
        temperature: 1.0
      }
    })
  
    for await (const textPart of response) {
      const text = extractTextFromResponse(textPart)
      set((state) => ({
        chat: state.chat + text
      }))
    }
    set({
      isGenerating: false
    })
  }
})