
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

// Extract text from PDF and DOCX resumes
const extractResumeText = async (file) => {
    try {
        if (!file || !file.buffer) {
            throw new Error("Resume file is missing");
        }

        const extension = path.extname(
            file.originalname
        ).toLowerCase();

        let extractedText = "";

        if (extension === ".pdf") {
            const pdfData = await pdfParse(file.buffer);
            extractedText = pdfData.text;
        } 
        else if (extension === ".docx") {
            const result = await mammoth.extractRawText({
                buffer: file.buffer
            });

            extractedText = result.value;
        } 
        else {
            throw new Error("Unsupported resume format");
        }

        if (!extractedText.trim()) {
            throw new Error("No readable text found in resume");
        }

        return extractedText.trim();

    } catch (error) {
        console.error("Resume extraction error:", error.message);
        throw new Error("Unable to extract resume text");
    }
};

module.exports = {
    extractResumeText
};
