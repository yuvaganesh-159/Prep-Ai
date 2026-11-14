
const multer = require("multer");
const path = require("path");

// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

// Validate resume file
const fileFilter = (req, file, cb) => {
    const allowedExtensions = [".pdf", ".docx"];

    const extension = path.extname(file.originalname).toLowerCase();

    const allowedMimeTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (
        allowedExtensions.includes(extension) &&
        allowedMimeTypes.includes(file.mimetype)
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and DOCX resumes are allowed."));
    }
};

// Configure upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: fileFilter
});

module.exports = upload;
