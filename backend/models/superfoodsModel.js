// Imports
const mongoose = require('mongoose');

// helps with mongoose deprecation
mongoose.set('strictQuery', false);

// Create database scheme for collection
const superfoodSchema = mongoose.Schema( {
   
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    benefits: {
        type: Array,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    character: {
        type: String,
        required: true,
    }
});

// Export model
module.exports = mongoose.model('Superfood', superfoodSchema);