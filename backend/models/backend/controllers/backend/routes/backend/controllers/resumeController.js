
const { extractResumeText } = require("../services/resumeService");
const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            });
        }

        // Extract resume text
        const resumeText = await extractResumeText(req.file);

        // Analyze resume using AI
        const response = await openai.chat.completions.create({
            model: process.env.AI_MODEL || "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume reviewer. Analyze resumes and provide constructive feedback."
                },
                {
                    role: "user",
                    content: `Analyze this resume and provide:
                    1. Resume strengths
                    2. Weaknesses
                    3. Skills identified
                    4. Suggestions for improvement
                    5. Overall assessment

                    Resume:
                    ${resumeText.slice(0, 15000)}`
                }
            ],
            temperature: 0.5
        });

        const analysis = response.choices[0].message.content;

        res.status(200).json({
            success: true,
            message: "Resume analyzed successfully",
            analysis
        });

    } catch (error) {
        console.error("Resume analysis error:", error.message);

        res.status(500).json({
            success: false,
            message: "Resume analysis failed"
        });
    }
};

module.exports = { analyzeResume };
