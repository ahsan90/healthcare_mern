const express = require('express');
const router = express.Router();

// @route GET /rofiles
// @desc Test profile
// @access Public
router.get('/', (req, res) => res.send('Profiles route'));

module.exports = router;