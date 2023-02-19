// Imports
const asyncHandler = require('express-async-handler');
const Characters = require('../models/charactersModel');


// Get request to '/api/characters'
const getCharacters = asyncHandler( async (req, res) => {

    const characters = await Characters.find();
    res.status(200).json(characters);
});

// Post request
const setCharacters = asyncHandler(async (req, res) => {

    // If no data is entered, display error message
    if((!req.body.name)) {
        res.status(400).json({message: "Please add a name"});
    }

    // If no data is entered, display error message
    if((!req.body.description)) {
        res.status(400).json({message: "Please add a description"});
    }

    // If no data is entered, display error message
    if((!req.body.image)) {
        res.status(400).json({message: "Please add an image"});
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

    // Create character
    const goal = await Characters.create({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        superfood: req.body.superfood,
        superfoodImg: req.body.superfoodImg,
        superfoodId: req.body.superfoodId,
    });

    // Display success message
    res.status(200).json({message: "Character successfully added to the database"});
})

// Export controllers
module.exports = {
    getCharacters,
    setCharacters,
}