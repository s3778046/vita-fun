// Imports
const express = require('express')
const router = express.Router()
const{
    getQuestions,
    setQuestions,
} = require('../controllers/questionsController')


router.get('/', getQuestions)
router.post('/', setQuestions)

module.exports = router
