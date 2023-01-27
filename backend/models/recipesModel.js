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

    description: {
        type: String,
        required: true,
    },

    ingredients: {
        type: Array,
        required: true,
    },

    method: {
        type: Array,
        required: true,
    },

    backgroundImg: {
        type: String,
        required: true,
    },

    recipeImg: {
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

    character: {
        type: String,
        required: true,
    },

    characterImg: {
        type: String,
        required: true,
    }
});

// Export model
module.exports = mongoose.model('Recipe', recipeSchema);