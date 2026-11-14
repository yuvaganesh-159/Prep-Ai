
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createInterview,
    getMyInterviews
} = require("../controllers/interviewController");

// Create a new interview
router.post("/", protect, createInterview);

// Get logged-in user's interviews
router.get("/my-interviews", protect, getMyInterviews);

module.exports = router;
