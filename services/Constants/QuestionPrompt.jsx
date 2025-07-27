export const QuestionPrompt = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depending on interview duration.
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

Format your response in JSON format with array list of questions.
format: interviewQuestions=[
  {
    question: "",
    type: "Technical/Behavioral/Experience/Problem Solving/Leadership"
  },
  ...
]

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;