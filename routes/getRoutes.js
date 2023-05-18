const express = require('express');
const router = express.Router();

const routerController = require('../controllers/routerController');

router.post('/indeed', routerController.getRouterController);

module.exports = router;