const moodModel = require("../models/moodModel");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("API key is missing. Ensure GEMINI_API_KEY is set in your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
});

module.exports = {
    renderHomePage(req, res) {
        res.render("tracking_index", {
            currentSuggestion: "Start tracking your mood to receive helpful suggestions!",
            weeklySuggestion: "",
            data: JSON.stringify([]),
            mood_data: JSON.stringify(moodModel.getMoodData())
        });
    },

    async processMoodData(req, res) {
        const { happy, calm, sad, angry, stressed } = req.body;

        let currentSuggestion = "Start tracking your mood to receive helpful suggestions!";
        let weeklySuggestion = "";
        let scores = {
            happy: 3, calm: 3, sad: 3, angry: 3, stressed: 3
        };

        try {
            scores = {
                happy: Math.min(5, Math.max(1, parseInt(happy))),
                calm: Math.min(6, Math.max(1, parseInt(calm))),
                sad: Math.min(5, Math.max(1, parseInt(sad))),
                angry: Math.min(5, Math.max(1, parseInt(angry))),
                stressed: Math.min(5, Math.max(1, parseInt(stressed)))
            };

            const currentPrompt = `Generate mental health suggestions based on:
            Happy: ${scores.happy}/5, Calm: ${scores.calm}/6, 
            Sad: ${scores.sad}/5, Angry: ${scores.angry}/5, 
            Stressed: ${scores.stressed}/5. Provide 2-3 actionable tips.`;

            const currentResult = await model.generateContent(currentPrompt);
            currentSuggestion = currentResult.response.text();

            const moodHistory = moodModel.getMoodHistory();
            if (moodHistory.length > 1) {
                const weeklyPrompt = `Analyze this 7-day mood trend (higher=better): ${moodHistory.join(', ')}.
                Suggest: 
                1. For declining trends: Recommend therapist search
                2. For low moods: Journaling prompt
                3. Appropriate feature based on pattern
                Format as bullet points.`;

                const weeklyResult = await model.generateContent(weeklyPrompt);
                weeklySuggestion = "Weekly Trend Analysis:\n" + weeklyResult.response.text();
            }

        } catch (error) {
            console.error('API Error:', error.message);
            currentSuggestion = "Quick tip: Try our breathing exercise feature!";
        }

        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        const data = [
            { label: "Happy", value: (scores.happy / total) * 100 },
            { label: "Calm", value: (scores.calm / total) * 100 },
            { label: "Sad", value: (scores.sad / total) * 100 },
            { label: "Angry", value: (scores.angry / total) * 100 },
            { label: "Stressed", value: (scores.stressed / total) * 100 },
        ];

        const moodScore = scores.happy + scores.calm;
        moodModel.addMoodEntry({ mood: moodScore });

        res.render("tracking_index", {
            currentSuggestion: currentSuggestion,
            weeklySuggestion: weeklySuggestion,
            data: JSON.stringify(data),
            mood_data: JSON.stringify(moodModel.getMoodData())
        });
    }
};
