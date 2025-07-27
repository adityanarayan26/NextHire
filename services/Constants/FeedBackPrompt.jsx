export const FeedBack = `

{{conversation}}

Depends on this Interview Conversation between assistant and user,  
Give me feedback for user interview. Give me rating out of 10 for Technical Skills, Communication, Problem Solving, Experience.  
Also give me summary in 3 lines about the interview and one line to let me know whether the candidate is recommended for hire or not with a message.  
Give me response in JSON format:

{
  feedback: {
    rating: {
      technicalSkills: 5,
      communication: 6,
      problemSolving: 4,
      experience: 7
    },
    summary: "<in 3 Lines>",
    Recommendation: "<yes/no>",
    RecommendationMsg: "<message>"
  }
}`