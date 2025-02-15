import axios from "axios";


const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getGeminiResponse = async (userInput) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: userInput }] }],
      }
    );
    return response.data.candidates[0]?.content?.parts[0]?.text || "No response";
  } catch (error) {
    console.error("Error fetching Gemini AI response:", error);
    return "Error fetching response.";
  }
};
