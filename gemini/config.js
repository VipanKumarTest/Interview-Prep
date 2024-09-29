const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiAI {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async run(user, interviewScriptData, question) {
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("User Data from Props =>>>>>>>>>>>>>", JSON.stringify(user) + interviewScriptData + question);
        const prompt = JSON.stringify(user) + interviewScriptData + question;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return text;
    }
}

// Sangeeta's G-Mail API
const apiKey = 'AIzaSyALx6jqdm7WAi5PJ7FgWG81g2ZnZofRlqQ';
const geminiAI = new GeminiAI(apiKey);
export default geminiAI;
