const { GoogleGenerativeAI } = require("@google/generative-ai");
const { scorePrompt, mainPrompt , improvementPrompt, mergePrompt , scoreTheMergePrompt , improveTheMergePrompt} = require("./prompts")
const { getModelresponce, getResultsInSlots, improveTheMerge } = require('./modules')
const dotenv = require("dotenv");
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const KEY = process.env.API_KEY

const genAI = new GoogleGenerativeAI(KEY);

const run = async(reviews) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

  try {
  
    const allSummaries = await getResultsInSlots(model,reviews , mainPrompt, scorePrompt, improvementPrompt)
    
    const bestSummary = await improveTheMerge(
      model,
      allSummaries,
      mergePrompt,
      scoreTheMergePrompt,
      improveTheMergePrompt
    );

    
    
  
    return bestSummary;

   

  } catch (error) {
   console.log("IN GEMINI : ", error)
  
    throw new error
 }   
  
}

module.exports = {
  run
}
