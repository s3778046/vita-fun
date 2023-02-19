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
    if((!req.body.description)) {
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
    if((!req.body.backgroundImg)) {
        res.status(400).json({message: "Please add a background image"}); 
    }

    // If no data is entered, display error message
    if((!req.body.recipeImg)) {
        res.status(400).json({message: "Please add a recipe image"}); 
    }

    // If no data is entered, display error message
    if((!req.body.superfood)) {
        res.status(400).json({message: "Please add a superfood"}); 
    }

    // If no data is entered, display error message
    if((!req.body.superfoodImg)) {
        res.status(400).json({message: "Please add a superfood image"}); 
    }

    // If no data is entered, display error message
    if((!req.body.superfoodId)) {
        res.status(400).json({message: "Please add a superfood id"}); 
    }

    // If no data is entered, display error message
    if((!req.body.character)) {
        res.status(400).json({message: "Please add a character"}); 
    }

    // If no data is entered, display error message
    if((!req.body.characterImg)) {
        res.status(400).json({message: "Please add a character image"}); 
    }

    // Craete a recipe 
    const goal = await Recipes.create({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        method: req.body.method,
        backgroundImg: req.body.backgroundImg,
        recipeImg: req.body.recipeImg,
        superfood: req.body.superfood,
        superfoodImg: req.body.superfoodImg,
        superfoodId: req.body.superfoodId,
        character: req.body.character,
        characterImg: req.body.characterImg,
    });

    // Display success message
    res.status(200).json({message: "Recipe successfully added to the database"});
});

// Export controllers
module.exports = {
    getRecipes,
    setRecipes,
}