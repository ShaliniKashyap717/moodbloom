const moodData = [];

module.exports = {
    getMoodData() {
        return moodData;
    },

    addMoodEntry(entry) {
        moodData.push(entry);
        if (moodData.length > 7) {
            moodData.shift();
        }
    },

    getMoodHistory() {
        return moodData.map(entry => entry.mood);
    }
};
