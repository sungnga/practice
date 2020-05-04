const generateMessage = (text) => {
    return {
        text,
        createdAt: new Date().getTime()
    }
}

// Exporting functions
module.exports = { generateMessage }