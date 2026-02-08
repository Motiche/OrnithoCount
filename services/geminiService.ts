import { GoogleGenAI } from "@google/genai";
import { Session, Species } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSessionSummary = async (session: Session, speciesList: Species[]): Promise<string> => {
  try {
    const ai = getClient();
    const model = 'gemini-3-flash-preview';

    // Prepare data summary
    const speciesMap = new Map<string, { name: string; count: number; details: string[] }>();
    
    session.sightings.forEach(s => {
      const species = speciesList.find(sp => sp.id === s.speciesId);
      const name = species ? species.name : 'Unknown';
      const current = speciesMap.get(s.speciesId) || { name, count: 0, details: [] };
      current.count += s.count;
      
      // Collect notable details for migration counts
      if (session.type === 'counting' && (s.direction || s.age !== 'Unknown')) {
          const det = [];
          if(s.direction) det.push(s.direction);
          if(s.age && s.age !== 'Unknown') det.push(s.age);
          if(det.length > 0) current.details.push(det.join(' '));
      }
      
      speciesMap.set(s.speciesId, current);
    });

    let dataSummary = `Location: ${session.name}\nDate: ${session.date}\nType: ${session.type}\nObservers: ${session.observers}\n\nCounts:\n`;
    speciesMap.forEach((val) => {
      let detailStr = '';
      if (val.details.length > 0) {
          // Simplify details for prompt (e.g., "mostly S", "many Juv")
          const dirs = val.details.filter(d => d.length < 3); // Crude filter for direction
          const uniqDirs = [...new Set(dirs)];
          if (uniqDirs.length > 0) detailStr = ` (Dir: ${uniqDirs.join(', ')})`;
      }
      dataSummary += `- ${val.name}: ${val.count}${detailStr}\n`;
    });

    const prompt = `
      You are an expert ornithologist assistant. 
      Please analyze the following bird count session data (${session.type} mode) and generate a professional summary.
      
      Requirements:
      1. Highlight the most numerous species.
      2. Mention total species count.
      3. If migration data (Direction, Age) is present, mention significant movements (e.g. "Strong movement of Barn Swallows to the South").
      4. Keep it concise (under 200 words).

      Data:
      ${dataSummary}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "No summary generated.";

  } catch (error) {
    console.error("Error generating summary:", error);
    return "Unable to generate summary at this time. Please check your API key.";
  }
};
