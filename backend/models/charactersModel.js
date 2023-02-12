// Imports
const mongoose = require('mongoose');

// helps with mongoose deprecation
mongoose.set('strictQuery', false);

// Create database scheme for collection
const characterSchema = mongoose.Schema( {
   
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    superfood: {
        type: String,
        required: true,
    },

    superfoodImg: {
        type: String,
        required: true,
    },

    superfoodId: {
        type: String,
        required: true,
    }
});

// Export model
module.exports = mongoose.model('Character', characterSchema);