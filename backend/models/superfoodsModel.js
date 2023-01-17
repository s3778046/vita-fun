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

    benifits: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    }
});

// Export model
module.exports = mongoose.model('Superfood', superfoodSchema);