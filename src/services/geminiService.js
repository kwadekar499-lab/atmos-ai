import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
});

/**
 * Sends a message to Gemini along with the user's weather context.
 * @param {string} userMessage The question typed by the user
 * @param {object} weatherData Core weather telemetry
 * @param {Array} chatHistory Previous dialogue messages formatted for Gemini
 * @returns {Promise<string>} The parsed AI text response
 */
export const chatWithWeather = async (userMessage, weatherData, chatHistory = []) => {
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("Gemini API Key Missing: Please configure VITE_GEMINI_API_KEY in your .env file.");
  }

  if (!userMessage || !userMessage.trim()) {
    throw new Error("Query is empty. Please enter a valid message.");
  }

  // Build the essential weather context as approved (City, Temp, Condition, Humidity, Wind speed)
  let weatherContext = "No real-time weather telemetry is currently loaded. If the user asks about weather conditions, politely request them to search for a city first on the dashboard.";
  
  if (weatherData && weatherData.location && weatherData.current) {
    weatherContext = `
Active real-time weather sensors:
- City: ${weatherData.location.name}, ${weatherData.location.country}
- Current Temperature: ${weatherData.current.temp}°C (Feels like: ${weatherData.current.feelsLike}°C)
- Weather Condition: ${weatherData.current.conditionText}
- Humidity: ${weatherData.current.humidity}%
- Wind Speed: ${weatherData.current.windSpeed} km/h from ${weatherData.current.windDir}
`;
  }

  const systemInstruction = `
You are the Atmos AI Meteorological Assistant, an elite AI weather advisor.
Your goal is to provide intelligent, professional, and friendly weather guidance based ONLY on the provided telemetry context.

Context:
${weatherContext}

Guidelines:
1. Speak in a helpful, friendly, and knowledgeable tone.
2. Answer questions accurately using the provided context (e.g., recommend clothing, specify if an umbrella is needed, or give advice on outdoor activities based on temperature, wind, and humidity).
3. If the user asks about a city or condition not currently loaded in the telemetry context, answer using general knowledge but remind them they can search for that city on the main dashboard to feed its real-time sensors into your intelligence matrix.
4. Keep your responses concise, clean, and well-structured using markdown.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...chatHistory,
        { role: "user", parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction
      }
    });

    const reply = response.text;
    if (!reply || !reply.trim()) {
      throw new Error("Empty Response: The AI assistant did not return any content. Please try rephrasing your question.");
    }

    return reply;
  } catch (error) {
    console.error("Gemini service call failed:", error);
    
    const errMsg = error.message || "";
    
    if (errMsg.includes("quota") || errMsg.includes("429") || errMsg.includes("QuotaExceeded")) {
      throw new Error("API Quota Exceeded: The system has reached its Gemini API request limit. Please try again later.", { cause: error });
    }
    if (errMsg.includes("Failed to fetch") || errMsg.includes("NetworkError") || errMsg.includes("network")) {
      throw new Error("Connection Issue: Unable to connect to Gemini AI services. Please verify your network connection and try again.", { cause: error });
    }
    if (errMsg.includes("Empty Response")) {
      throw error;
    }
    
    throw new Error(error.message || "Asynchronous Telemetry Fault: An error occurred while communicating with Gemini AI.", { cause: error });
  }
};

export default ai;