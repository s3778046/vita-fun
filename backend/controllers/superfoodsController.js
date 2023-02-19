// Imports
const asyncHandler = require('express-async-handler');
const Superfoods = require('../models/superfoodsModel');


// Get request to '/api/superfoods'
const getSuperfoods = asyncHandler( async (req, res) => {

    const superfoods = await Superfoods.find();
    res.status(200).json(superfoods);
});

// Post request
const setSuperfoods = asyncHandler(async (req, res) => {

    // If no data is entered, display error message
    if((!req.body.name)) {
        res.status(400).json({message: "Please add a name"});  
    }

    // If no data is entered, display error message
    if((!req.body.description)) {
        res.status(400).json({message: "Please add a description"});  
    }

    // If no data is entered, display error message
    if((!req.body.benefits)) {
        res.status(400).json({message: "Please add benefits"}); 
    }

    // If no data is entered, display error message
    if((!req.body.image)) {
        res.status(400).json({message: "Please add image"}); 
    }

    // If no data is entered, display error message
    if((!req.body.character)) {
        res.status(400).json({message: "Please add character"}); 
    }

    // Create a superfood
    const goal = await Superfoods.create({
        name: req.body.name,
        description: req.body.description,
        benefits: req.body.benefits,
        image: req.body.image,
        character: req.body.character,
    });

    // Display a success message
    res.status(200).json({message: "Superfood successfully added to the database"});
});

// Export controllers
module.exports = {
    getSuperfoods,
    setSuperfoods,
}