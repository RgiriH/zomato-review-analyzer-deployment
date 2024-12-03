const getModelresponce = async (model, prompt) => {

     const result = await model.generateContent(prompt);
     const response = await result.response;
     let data = response.text();

     
   data = data.replace("```json", '').trim();
   data = data.replace("```",'').trim()
  
    //console.log(data) 
    return JSON.parse(data)
    
     
}

const getResultsInSlots = async (model, reviews, promptFunction , scorePromptFunction , improvementPromptFunction) => {
    
    const allSummaries = [];
    let currentIndex = 0;

    while (currentIndex + 50 < reviews.length) {
      const jsonSummary = await getModelresponce(
        model,
        promptFunction(reviews.slice(currentIndex, currentIndex + 50))
      );

      const scoreResponce = await getModelresponce(
        model,
        scorePromptFunction(
          reviews.slice(currentIndex, currentIndex + 50),
          jsonSummary
        )
      );

      const improvedJsonSummary = await getModelresponce(
        model,
        improvementPromptFunction(
          reviews.slice(currentIndex, currentIndex + 50),
          jsonSummary,
          scoreResponce
        )
      );
    
      currentIndex = currentIndex + 50;
      // console.log("Original summary : ", jsonSummary);
      // console.log("improvement suggested : ", scoreResponce);
      // console.log("After improvement summary : ", improvedJsonSummary);

      allSummaries.push(improvedJsonSummary);
    }

   
  
  return allSummaries
};

const improveTheMerge = async (model, allSummaries, mergePromptFunction , scoreTheMergePromptFunction, improveTheMergePromptFunction) => {
     
      const mergedSummary = await getModelresponce(model, mergePromptFunction(allSummaries));
     // console.log("main merge : " , mergedSummary)
      const improvementNeeded_1 = await getModelresponce(model,scoreTheMergePromptFunction(allSummaries,mergedSummary))
     // console.log("need for improvement : ", improvementNeeded_1);
      const improvedMerge_1 = await getModelresponce(model,improveTheMergePromptFunction(allSummaries, mergedSummary , improvementNeeded_1));
      //console.log("improved merge : ", improvedMerge_1);
      const improvementNeeded_2 = await getModelresponce(
        model,
        scoreTheMergePromptFunction(allSummaries, improvedMerge_1)
      );
     // console.log("need for improvement : ", improvementNeeded_2);
      const improvedMerge_2 = await getModelresponce(
        model,
        improveTheMergePromptFunction(
          allSummaries,
          improvedMerge_1,
          improvementNeeded_2
        )
      );
     // console.log("improved merge : ", improvedMerge_1);
      
      return improvedMerge_2;
      
}

module.exports = {
    getModelresponce,
    getResultsInSlots,
    improveTheMerge
}