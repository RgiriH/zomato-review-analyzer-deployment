const scorePrompt = (reviews, summary) => {
  return `
      Please evaluate the provided summary based on its effectiveness in retrieving relevant information from the restaurant reviews provided in Reviews input and minimizing redundant content. Your score should be based on the following criteria:
      Make sure to provide a parsable json as stated below , just out put the pure json without any additional quotes in begining or ending which invalidates the JSON.
      Dont add prefix like """json{}""" or \`\`\` json{ }\`\`\ in the begining which makes it invalid json to parse focus on this point as its a crutial step.
      Make sure to return a parsable JSON object.

      Criteria for Scoring:
        1. Information Retrieval (5 points):
         - How well does the summary capture the main points from the reviews provided to you in Reviews input?
         - Does the summary highlight all major positive and negative aspects, as well as actionable suggestions from the reviews provided to you in Reviews input?
         - Are all negative aspects are covered  from the reviews provided to you in  Reviews input?

        2. Redundancy and Conciseness (5 points):
         - How effectively does the summary avoid repeating information from the reviews?
         - Is the summary concise, avoiding unnecessary repetition or irrelevant details?
         - Does it condense the reviews without losing important context?
        
       Analyse the given Review input and Summary input care fully for making the decision 
      
        Output Format:
        {
          "score": "your score here out of 10",
          "Redundencies" : " put your points in arry form here about the information which is redundent multible times in the summary genrated provided in Summary input while analysing the provided Review input",
          "Important_points_missing" : " put your points in arry form here about the some importent points which are missing in the summary genrated provided in Summary input while analysing the provided Review input "
        }

        Input:
         - Reviews: \n ${reviews.map(
           (review, index) => (index + 1).toString() + " " + review + "\n"
         )}
         - Summary: \n
           - positive points extracted : \n
           ${summary.analysis.positivePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - negative points extracted : \n
           ${summary.analysis.negativePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - suggestion's made : \n
           ${summary.analysis.suggestions.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}

        Example Output:
        {
          "score": 8,
          "Redundencies" : [" put your points in arry form here about the information which is redundent multible times in the summary genrated provided in Summary input which can be summarized in single point."],
          "Important_points_missing " : [" put your points in arry form here about the some importent topics which are missing in the summary genrated provided in Summary input while analysing the provided Review input "]
        }
        NOTE:
         - make sure to provide a parsable json as stated above , just out put the json without any additional quotes in begining or ending which invalidates the JSON dont add a "," symbol in the last point of the arry.
         - make sure to provide major topics which are missing which effect the user experience
`;
};

const mainPrompt = (reviews) => {
    
return `
    Please provide a comprehensive analysis of the restaurant reviews for the owner. Your response should be structured in JSON format as outlined below.
    Make sure to provide a parsable json as stated below , just out put the pure json without any additional quotes in begining or ending which invalidates the JSON.
    Dont add prefix like """json{}""" or \`\`\` json{ }\`\`\ in the begining which makes it invalid json to parse.
    Make sure to return a parsable JSON object.

Instructions
1. Review Input: Use the provided array of reviews to craft your analysis.  
   REVIEW: ${reviews.map(
     (review, index) => (index + 1).toString() + " " + review + "\n"
   )}

2. Feedback Structure:
   - Your analysis must be written in indirect speech, ensuring a polite tone that reflects the customers' experiences without directly quoting the reviews.
   - PositivePoints: Summarize up to 4 or 5 positive aspects highlighted by customers. Each point should not merely repeat the review content.If less then four or no positive points found , Keep this section empty.
   - NegativePoints: Summarize up to 4  or 5 negative points or areas for improvement, again ensuring each point is phrased politely.If less then four or no negative points found , Keep this section empty.
   - Suggestions: Provide up to 4 or 5 constructive suggestions based on the reviews, focusing on actionable improvements that can enhance customer satisfaction.If less then four or no suggestion's can be provided then , Keep this section empty.
   
3. Formatting:
   - Ensure your response is a valid JSON format without trailing commas in the arrays.
   - If no reviews are provided, return an empty JSON structure with the expected fields left blank.
   
4. Examples:
   PositivePoints Example:  
   "Customers frequently complimented the attentive service and the pleasant atmosphere, noting how it greatly enhanced their dining experience."
   
   NegativePoints Example:  
   "Several patrons mentioned that the portion sizes could be larger to match the expectations set by the pricing."
   
   Suggestions Example:  
   "It may be beneficial to review portion sizes and adjust them to align with customer expectations, especially considering the restaurant’s price point."
   
5. Output Format:
   {
      "analysis": {
         "positivePoints": [
            "Include up to 4 or 5 positive aspects here."
         ],
         "negativePoints": [
            "Include up to 4 or 5 negative aspects here."
         ],
         "suggestions": [
            "Include up to 4 to 5 suggestions for improvement here."
         ]
      }
   }
NOTE : 
 - Please ensure your response is clear, polite, and free from formatting errors and in a valid json formate which can be directly processed using JSON.parse function, hence make sure not to have any quotes in the starting of the json object.
 - Make sure to provide a parsable json as stated above , just out put the json without any additional quotes in begining or ending which invalidates the JSON and dont add  "," symbol in the last point of the arry.
`; 
}; 

const mergePrompt = (allSummaries) => {
  return `
  
    Please merge the provided 4 summaries into one comprehensive analysis,  The merged review should be structured in the same format as the input, with categories for "positivePoints", "negativePoints", and "suggestions."
    Make sure to provide a parsable json as stated below , just out put the pure json without any additional quotes in begining or ending which invalidates the JSON.
    Dont add prefix like """json{ your responce here }""" or \`\`\` json{ your responce here }\`\`\ in the begining which makes it invalid json to parse.

    Instructions:
    1. Consider Ever Point :
     - Extract all  positive, negative, and suggestion-based feedback from each of the provided summaries Input data in Input Summaries section.
     - Retain as many distinct and valuable insights as possible, but avoid repeating similar points multiple times.
     - Go through the summaries provided to check any missing in major issue not being covered in the ,merged summary genrated by you now.

    2. Minimize Redundancy:
     - Merge similar points across the reviews into single, well-phrased statements.
     - Ensure that the summary avoids duplication of feedback.
     -  Make sure to return a parsable JSON object
     - If a point is already covered dont repeat it.
     
    3. Structure:
     - Positive points should be grouped in the "positivePoints" section.
     - Negative feedback should be grouped in the "negativePoints" section.
     - Suggestions for improvement should be placed in the "suggestions" section.
     - Make sure that the final output contains no more than 5 points in each category, but adequately covers all key aspects from the reviews.

    Output Format:
   {
   "analysis": {
      "positivePoints": [
         "Include up to 5 positive feedback points here."
      ],
      "negativePoints": [
         "Include up to 5 negative feedback points here."
      ],
      "suggestions": [
         "Include up to 5 suggestions for improvement here."
      ]
    }
   }

   Example:
   If one review mentions "good service" and another mentions "attentive staff", they should be merged into a single statement like:
   "Customers appreciated the friendly and attentive service provided by the staff."

   Input :
   ${allSummaries.map(
     (summary, index) =>
       `###################################### Input summary ${
         index + 1
       } starts ########################################### \n
           - positive points extracted : \n
           ${summary.analysis.positivePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - negative points extracted : \n
           ${summary.analysis.negativePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - suggestion's made : \n
           ${summary.analysis.suggestions.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
        ###################################### Input summary ${
          index + 1
        } ends ########################################### \n
         `
   )}
   

   Notes:
   - You should cover all the points provided in ever review as they all carried some important points.
   - Elabarate the points as much as  possible with the avaiable information in the Input summaries section to form a well discriptive statement explaining your thoughts.
   - Ensure all sections are filled, and the output is free of redundant information.
   - Make sure to provide a parsable json as stated above , just out put the json without any additional quotes in begining or ending which invalidates the JSON.
   
 `;
};

const improvementPrompt = (reviews, summary, feedBack) => {
   return `
       You are provided with restaurant reviews, an initial summary of those reviews, and some advice for improving the summary. Your task is to revise the summary based on the feedback while ensuring that it accurately reflects the reviews and incorporates the suggestions.
       Make sure to provide a parsable json as stated below , just out put the pure json without any additional quotes in begining or ending which invalidates the JSON.
       Dont add prefix like """json{ your responce here }""" in the begining which makes it invalid json to parse.

Instructions:
1. Focus on Suggestions made:
   - Ensure the improved summary retains all the major points from the reviews, while addressing the areas highlighted for improvement in the  " - Advice for some Important points missing " section.
   - Adjust the summary to incorporate any missing feedback or suggestions.try to summaries upto 5 points only.
   - You have to include the suggested points in such a way that the overall summary should still have upto 5 points in each section,but elaborate the points using the suggestions made to provide a more comprehensive points,only Add new points only if its completely diffrent point.
   - To summaries with in 5 points , you can improvements suggested in already existing points if the topic is releated to or the extention any already present point.  
   

2. Minimize Redundancy & Improve Clarity:
   - Ensure that it accurately reflects the reviews in a clear and organized manner.
   - Avoid mentioning the same points multiple times.

3. Structure:
   - Maintain the same structure of "positivePoints," "negativePoints," and "suggestions."
   - Ensure that each section is improved based on the advice, and that no section exceeds 5 points.

Output Format:
{
   "analysis": {
      "positivePoints": [
         "Provide the revised positive feedback here. summaries up to 5 points"
      ],
      "negativePoints": [
         "Provide the revised negative feedback here. summaries up to 5 points"
      ],
      "suggestions": [
         "Provide the revised suggestions here. summaries up to 5 points"
      ]
   }
}

 Input: \n
 -  suggestions for some Important points missing in the innitial summary which can be incorporated : \n
   ${feedBack.Important_points_missing?.map(
     (review, index) => (index + 1).toString() + " " + review + "\n"
   )}
 - Reviews: \n ${reviews.map(
   (review, index) => (index + 1).toString() + " " + review + "\n"
 )}
- Innitial summary Summary: \n
   - positive points extracted : \n
      ${summary.analysis.positivePoints.map(
        (review, index) => (index + 1).toString() + " " + review + "\n"
      )}
   - negative points extracted : \n
           ${summary.analysis.negativePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
   - suggestion's made in the innitail summary : \n
   ${summary.analysis.suggestions.map(
     (review, index) => (index + 1).toString() + " " + review + "\n"
   )}
- Innitial summary ends here


 
Example Output:
{
   "analysis": {
      "positivePoints": [
         "Revised positive feedback based on suggestions and reviews."
      ],
      "negativePoints": [
         "Revised negative feedback based on suggestions and reviews."
      ],
      "suggestions": [
         "Revised suggestions based on feedback."
      ]
   }
}

Notes:
- Ensure the improved summary captures the key points from the reviews.
- The revised summary should reflect the feedback and improve on the original, while maintaining clarity and avoiding redundancy.
- Make sure to provide a parsable json as stated above , just out put the json without any additional quotes in begining or ending which invalidates the JSON and dont add  "," symbol in the last point of the arry.
`;
};

const scoreTheMergePrompt = (allSummaries,mergedSummary) => {
   return `
      You are given individual summaries of reviews and a merged summary that combines the key points from those reviews. Your task is to evaluate the merged summary by comparing it to the individual summaries and provide a score along with suggestions for any important points that were missed.

Instructions:
1. Compare Individual Summaries and Merged Summary:
   - Carefully review the individual summaries and the merged summary to provde major points in individual summaries not being cover in the merged summary.
   - Identify all the  crucial points from the individual summaries have been missed or inadequately addressed in the merged summary.

2. Scoring:
   - Score the merged summary on a scale of 1 to 10, based on the following criteria:
   - How well it retains key information from the individual summaries.
   - The clarity and conciseness of the merged summary.
   - How effectively it minimizes redundancy without losing important feedback.

4. Structure:
   - Start with the score (out of 10).
   - List any missing points from the individual summaries.
   - Make sure to provide a parsable json as stated above , just out put the json without any additional quotes in begining or ending which invalidates the JSON.

Output Format:
{
   "score": 9,
   "missedPoints": [
      "List all missed points from the Input of Induvidual summaries which are missed in Input of merged summary with explaination here , in arry form"
   ],
  
}

-Input of Induvidual summaries : \n
   ${allSummaries.map(
     (summary, index) =>
       `###################################### Input summary ${index + 1} starts ########################################### \n
           - positive points extracted : \n
           ${summary.analysis.positivePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - negative points extracted : \n
           ${summary.analysis.negativePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - suggestion's made : \n
           ${summary.analysis.suggestions.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
        ###################################### Input summary ${ index + 1 } ends ########################################### \n
         `
   )}
   -Input of Merged summary : \n
      - positive points extracted : \n
           ${mergedSummary.analysis.positivePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
      - negative points extracted : \n
           ${mergedSummary.analysis.negativePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
      - suggestion's made : \n
           ${mergedSummary.analysis.suggestions.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
  
    NOTE : 
    - Make sure to provide a parsable json as stated above , just out put the json without any additional quotes in begining or ending which invalidates the JSON dont add a "," symbol in the last point of the arry.
   `;
}

const improveTheMergePrompt = (allSummaries, mergedSummary, suggestions) => {
   return `
      You are given a merged summary and suggestions for improving it. Your goal is to revise the merged summary by incorporating the feedback provided in the suggestions. Ensure that the revised summary accurately captures all key points from the individual summaries, avoids redundancy, and maintains clarity.
      Make sure to provide a parsable json as stated below , just out put the pure json without any additional quotes in begining or ending which invalidates the JSON.
      Dont add prefix like """json{}""" in the begining which makes it invalid json to parse.
       Make sure to return a parsable JSON object

Instructions:
1. Focus on Suggestions made :
   - Ensure the improved summary retains all the major points from the reviews, while addressing the areas highlighted for improvement in the  " Suggestions for some Important points missing in the provided  Merged summary " section.
   - Adjust the summary to incorporate any missing feedback or suggestions.try to summaries upto 5 points only.
   - You have to include the suggested points in such a way that the overall summary should still have upto 5 points in each section,but elaborate the points using the suggestions made to provide a more comprehensive points,only Add new points only if its completely diffrent point.
   - To summaries with in 5 points , you can improvements suggested in already existing points if the topic is releated to or the extention any already present point.  
   - But you are not alowed to miss out even a single topic present in the individual summary , So find a way to some how add all the topics in 5 points but no repeatation of same topics is allowed , if a topic is already covered then no need to repeat the same thing again.
   - You are allowed to eleboarate the current points useing the missing points to make the points more impact full  , there by covering all the points.

2. Revise the Merged Summary:
   - Incorporate any missing feedback from the individual summaries into the revised summary.
   - Ensure that the revised summary reflects all major positive, negative, and suggestion points without introducing redundancy.

3. Final Structure:
   - Retain the original structure of the merged summary with sections for "positivePoints," "negativePoints," and "suggestions."
   - Make sure each section reflects the complete range of feedback from the individual summaries and suggestions for improvement.

Output Format:
{
   "analysis": {
      "positivePoints": [
         "Provide the improved positive feedback here."
      ],
      "negativePoints": [
         "Provide the improved negative feedback here."
      ],
      "suggestions": [
         "Provide the improved suggestions here."
      ]
   }
}

-Input of Induvidual summaries : \n
   ${allSummaries.map(
     (summary, index) =>
       `###################################### Input summary ${
         index + 1
       } starts ########################################### \n
           - positive points extracted : \n
           ${summary.analysis.positivePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - negative points extracted : \n
           ${summary.analysis.negativePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
           - suggestion's made : \n
           ${summary.analysis.suggestions.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
        ###################################### Input summary ${
          index + 1
        } ends ########################################### \n
         `
   )}

 -Input of Merged summary : \n
      - positive points extracted : \n
           ${mergedSummary.analysis.positivePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
      - negative points extracted : \n
           ${mergedSummary.analysis?.negativePoints.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
      - suggestion's made : \n
           ${mergedSummary.analysis?.suggestions.map(
             (review, index) => (index + 1).toString() + " " + review + "\n"
           )}
 -  Suggestions for some Important points missing in the provided  Merged summary: \n
    ${suggestions.missedPoints?.map(
      (review, index) => (index + 1).toString() + " " + review + "\n"
    )}         


Example Output:
{
   "analysis": {
      "positivePoints": [
         "Revised positive feedback based on the suggestions."
      ],
      "negativePoints": [
         "Revised negative feedback based on the suggestions."
      ],
      "suggestions": [
         "Revised suggestions based on the feedback."
      ]
   }
}

Notes:
- Ensure the revised summary addresses all the suggestions and improve the current points by including the suggestion to provide a detailed summary points.
- The final output should accurately represent the combined feedback from all individual summaries without introducing redundancy.
- Make sure to provide a parsable json as stated above , just out put the json without any additional quotes in begining or ending which invalidates the JSON dont add a "," symbol in the last point of the arry.
`;
}

module.exports = {
  scorePrompt,
  mainPrompt,
  mergePrompt,
  improvementPrompt,
   scoreTheMergePrompt,
  improveTheMergePrompt
};
