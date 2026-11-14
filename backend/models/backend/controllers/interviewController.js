
const Interview = require("../models/Interview");

// Create a new interview
const createInterview = async (req, res) => {
    try {
        const { interviewType, questions } = req.body;

        if (!["technical", "hr"].includes(interviewType)) {
            return res.status(400).json({
                message: "Invalid interview type"
            });
        }

        const interview = await Interview.create({
            user: req.user.id,
            interviewType,
            questions: questions || []
        });

        res.status(201).json({
            success: true,
            message: "Interview created successfully",
            interview
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get logged-in user's interviews
const getMyInterviews = async (req, res) => {
    try {
        const interviews = await Interview.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: interviews.length,
            interviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createInterview,
    getMyInterviews
};
