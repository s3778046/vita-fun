// Imports
const mongoose = require('mongoose');

// helps with mongoose deprecation
mongoose.set('strictQuery', false);

// Create database scheme for collection
const recipeSchema = mongoose.Schema( {
   
    name: {
        type: String,
        required: true,
    },

    ingredients: {
        type: String,
        required: true,
    },

    method: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    }
});

// Export model
module.exports = mongoose.model('Recipe', recipeSchema);