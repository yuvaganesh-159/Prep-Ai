
const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        totalInterviews: {
            type: Number,
            default: 0
        },

        completedInterviews: {
            type: Number,
            default: 0
        },

        averageScore: {
            type: Number,
            default: 0
        },

        bestScore: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Performance", performanceSchema);
