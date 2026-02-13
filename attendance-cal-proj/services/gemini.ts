import { GoogleGenAI, Type } from "@google/genai";
import { MemeResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMemeContent = async (attended: number, total: number): Promise<MemeResponse> => {
  const percentage = total === 0 ? 100 : (attended / total) * 100;
  const isSafe = percentage > 75; 
  
  const prompt = `
    Student stats: Attended ${attended}/${total} classes (${percentage.toFixed(2)}%).
    Target: > 75% to be safe.
    
    Current Status: ${isSafe ? "SAFE (Above 75%)" : "DANGER (75% or below)"}.
    
    Task: Generate a meme concept for this student.
    
    Select a templateId from this list:
    If SAFE (> 75%):
    - 'success' (Success Kid - for winning)
    - 'smart' (Roll Safe - for calculated risks)
    - 'drake' (Drake Approval - for skipping class)
    - 'pauper' (Winnie Pooh Tuxedo - for feeling superior)
    - 'cheers' (Leonardo DiCaprio Cheers - for celebrating)
    - 'buttons' (Two Buttons - hard choice between sleep and class)

    If DANGER (<= 75%):
    - 'fine' (This is Fine - burning room)
    - 'panik' (Panik Kalm Panik - high stress)
    - 'clown' (Clown makeup - for making bad choices)
    - 'disaster' (Disaster Girl - burning house)
    - 'sweating' (Jordan Peele Sweating - nervous)
    - 'grave' (Grant Gustin Grave - mourning grades)

    Return JSON with:
    - topText: Punchy top text (max 6 words).
    - bottomText: Punchy bottom text (max 6 words).
    - mood: 'chill' or 'panic'.
    - templateId: One of the string IDs listed above.
    - templateAdvice: Brief explanation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topText: { type: Type.STRING },
            bottomText: { type: Type.STRING },
            mood: { type: Type.STRING, enum: ['chill', 'panic'] },
            templateId: { type: Type.STRING, enum: ['success', 'smart', 'drake', 'fine', 'panik', 'clown', 'disaster', 'pauper', 'cheers', 'sweating', 'grave', 'buttons'] },
            templateAdvice: { type: Type.STRING }
          },
          required: ["topText", "bottomText", "mood", "templateId"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");
    
    return JSON.parse(text) as MemeResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback
    return {
      topText: isSafe ? "ATTENDANCE > 75%" : "MY ATTENDANCE",
      bottomText: isSafe ? "CALCULATED RISK" : "IT'S GONE",
      mood: isSafe ? 'chill' : 'panic',
      templateId: isSafe ? 'smart' : 'panik',
      templateAdvice: "Fallback"
    };
  }
};