
const Interview = require("../models/Interview");

// Submit interview feedback
const submitFeedback = async (req, res) => {
    try {
        const { interviewId, questionFeedback, score } = req.body;

        if (!interviewId || !Array.isArray(questionFeedback)) {
            return res.status(400).json({
                success: false,
                message: "Interview ID and feedback are required"
            });
        }

        if (
            typeof score !== "number" ||
            !Number.isFinite(score) ||
            score < 0 ||
            score > 100
        ) {
            return res.status(400).json({
                success: false,
                message: "Score must be between 0 and 100"
            });
        }

        const interview = await Interview.findOne({
            _id: interviewId,
            user: req.user.id
        });

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: "Interview not found"
            });
        }

        if (questionFeedback.length !== interview.questions.length) {
            return res.status(400).json({
                success: false,
                message: "Feedback must match the interview questions"
            });
        }

        interview.questions.forEach((question, index) => {
            question.feedback = questionFeedback[index];
        });

        interview.score = score;
        interview.status = "completed";

        await interview.save();

        res.status(200).json({
            success: true,
            message: "Interview feedback saved successfully",
            score: interview.score,
            interview
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to save feedback"
        });
    }
};

module.exports = { submitFeedback };
  
