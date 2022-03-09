// routes.js

const express = require('express');
const {home } = require('../controllers/controller');
const router = express.Router();
router.get('/', home);

module.exports = router;