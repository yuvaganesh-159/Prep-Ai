
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        interviewType: {
            type: String,
            enum: ["technical", "hr"],
            required: true
        },

        questions: [
            {
                question: {
                    type: String,
                    required: true
                },

                answer: {
                    type: String,
                    default: ""
                },

                feedback: {
                    type: String,
                    default: ""
                }
            }
        ],

        score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        },

        duration: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Interview", interviewSchema);
