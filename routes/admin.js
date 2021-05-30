const express = require('express')

const adminController = require('../controllers/admin')
const authController = require('../controllers/auth')

const router = express.Router()

router.post('/signup', authController.signupAdmin)
router.post('/test', adminController.postTest)
router.get('/test', adminController.getTest)
router.post('/test-question', adminController.postTestQuestion)
router.get('/report', adminController.getReport)

module.exports = router
