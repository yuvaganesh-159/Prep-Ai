
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    submitFeedback
} = require("../controllers/feedbackController");

// Submit interview feedback
router.post("/", protect, submitFeedback);

module.exports = router;
