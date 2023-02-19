// Imports
const asyncHandler = require('express-async-handler');
const Questions = require('../models/questionsModel');


// Get request to '/api/questions'
const getQuestions = asyncHandler( async (req, res) => {

    const questions = await Questions.find();
    res.status(200).json(questions);
});

// Post request
const setQuestions = asyncHandler(async (req, res) => {

    // If no data is entered, display error message
    if((!req.body.question)) {
        res.status(400).json({message: "Please add a question"}); 
    }

    // If no data is entered, display error message
    if((!req.body.answer1)) {
        res.status(400).json({message: "Please add first answer option"});  
    }

    // If no data is entered, display error message
    if((!req.body.answer2)) {
        res.status(400).json({message: "Please add second answer option"});  
    }

    // Create question
    const goal = await Questions.create({
        question: req.body.question,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
    });

    // Display success message
    res.status(200).json({message: "Question successfully added to the database"});
});

// Export controllers
module.exports = {
    getQuestions,
    setQuestions,
}