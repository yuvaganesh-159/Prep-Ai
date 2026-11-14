
const Interview = require("../models/Interview");
const Performance = require("../models/Performance");

// Get user performance statistics
const getPerformance = async (req, res) => {
    try {
        const userId = req.user.id;

        const interviews = await Interview.find({
            user: userId,
            status: "completed"
        });

        const totalInterviews = await Interview.countDocuments({
            user: userId
        });

        const completedInterviews = interviews.length;

        const scores = interviews.map(
            interview => interview.score
        );

        const averageScore = completedInterviews > 0
            ? scores.reduce((total, score) => total + score, 0)
                / completedInterviews
            : 0;

        const bestScore = completedInterviews > 0
            ? Math.max(...scores)
            : 0;

        const performance = await Performance.findOneAndUpdate(
            { user: userId },
            {
                totalInterviews,
                completedInterviews,
                averageScore: Number(averageScore.toFixed(2)),
                bestScore
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Performance retrieved successfully",
            performance
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve performance"
        });
    }
};

module.exports = { getPerformance };
