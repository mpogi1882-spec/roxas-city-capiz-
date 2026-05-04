import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getTravelAdvise = async (prompt: string) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the 'Capiz Concierge', a local expert on Roxas City, Capiz. You are warm, helpful, and speak with pride about the Seafood Capital. Provide advice on food, travel times, historical sites like Panay Church, and beaches like Baybay. Keep responses concise and travel-oriented."
      }
    });

    return result.text || "I'm having a bit of a moment—even a concierge needs a siesta! How about we talk about seafood in a minute?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of a moment—even a concierge needs a siesta! How about we talk about seafood in a minute?";
  }
};
