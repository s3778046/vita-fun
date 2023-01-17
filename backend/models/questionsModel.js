// Imports
const mongoose = require('mongoose');

// helps with mongoose deprecation
mongoose.set('strictQuery', false);

// Create database scheme for collection
const questionSchema = mongoose.Schema( {
   
    question: {
        type: String,
        required: true,
    },

    answer1: {
        type: String,
        required: true,
    },

    answer2: {
        type: String,
        required: true,
    }
});

// Export model
module.exports = mongoose.model('Question', questionSchema);