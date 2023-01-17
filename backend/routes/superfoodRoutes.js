// Imports
const express = require('express');
const router = express.Router();

// Access controller
const{
    getSuperfoods,
    setSuperfoods,
} = require('../controllers/superfoodsController');

router.get('/', getSuperfoods);
router.post('/', setSuperfoods);

// Export router
module.exports = router;
