const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/user', userController.postUser)
router.get('/test', userController.getTest)
router.get('/test-question/:testId',userController.getQuestion)
router.post('/result', userController.postResult)
router.get('/result/:userId', userController.getResult)

module.exports = router;
