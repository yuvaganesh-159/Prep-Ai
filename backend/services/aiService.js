
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Generate interview questions
const generateInterviewQuestions = async (
    interviewType,
    topic,
    numberOfQuestions = 5
) => {
    try {
        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert interview coach."
                },
                {
                    role: "user",
                    content: `Generate ${numberOfQuestions} 
                    ${interviewType} interview questions 
                    about ${topic}. Return only a numbered list.`
                }
            ],
            temperature: 0.7
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("AI question generation error:", error.message);
        throw new Error("Unable to generate interview questions");
    }
};

// Generate interview feedback
const generateInterviewFeedback = async (question, answer) => {
    try {
        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an experienced technical and HR interview evaluator. Give constructive and helpful feedback."
                },
                {
                    role: "user",
                    content: `Interview Question: ${question}
                    Candidate Answer: ${answer}

                    Evaluate the answer and provide:
                    1. Strengths
                    2. Weaknesses
                    3. Suggestions for improvement
                    4. Overall feedback`
                }
            ],
            temperature: 0.5
        });

        return response.choices[0].message.content;

    } catch (error) {
        console.error("AI feedback error:", error.message);
        throw new Error("Unable to generate interview feedback");
    }
};

module.exports = {
    generateInterviewQuestions,
    generateInterviewFeedback
};
