const stories = [];

module.exports = {
    getAllStories() {
        return stories;
    },
    addStory(story) {
        stories.push(story);
    },
};
