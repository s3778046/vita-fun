// Imports
const asyncHandler = require('express-async-handler');
const Recipes = require('../models/recipesModel');


// Get request to '/api/recipes'
const getRecipes = asyncHandler( async (req, res) => {

    const recipes = await Recipes.find();
    res.status(200).json(recipes);
});

// Post request
const setRecipes = asyncHandler(async (req, res) => {

    // If no data is entered, display error message
    if((!req.body.name)) {
        res.status(400).json({message: "Please add a name"});
    }

    // If no data is entered, display error message
    if((!req.body.ingredients)) {
        res.status(400).json({message: "Please add ingredients"}); 
    }

    // If no data is entered, display error message
    if((!req.body.method)) {
        res.status(400).json({message: "Please add a method"});  
    }

    // If no data is entered, display error message
    if((!req.body.image)) {
        res.status(400).json({message: "Please add an image"}); 
    }

    const goal = await Recipes.create({
        name: req.body.name,
        ingredients: req.body.ingredients,
        method: req.body.method,
        image: req.body.image,
    });

    // Display success message
    res.status(200).json({message: "Recipe successfully added to the database"});
});

// Export controllers
module.exports = {
    getRecipes,
    setRecipes,
}