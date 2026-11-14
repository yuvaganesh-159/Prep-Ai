
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { analyzeResume } = require("../controllers/resumeController");

// Resume analysis route
router.post("/analyze", protect, analyzeResume);

module.exports = router;
