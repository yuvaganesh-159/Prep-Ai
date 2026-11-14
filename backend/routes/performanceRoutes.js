
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getPerformance
} = require("../controllers/performanceController");

// Get logged-in user's performance
router.get("/", protect, getPerformance);

module.exports = router;
