const router = require('express').Router();
const Controller = require('./controller');

router.post('/get/data', Controller.getData);

module.exports = router;