const express = require('express')

const adminController = require('../controllers/admin')
const authController = require('../controllers/auth')
const isAuth = require('../middleware/is-auth');

const router = express.Router()

router.post('/signup', authController.signupAdmin)
router.post('/signin', authController.signinAdmin)
router.post('/test', isAuth, adminController.postTest)
router.get('/test', isAuth, adminController.getTest)
router.post('/test-question', isAuth, adminController.postTestQuestion)
router.get('/report', isAuth, adminController.getReport)

module.exports = router
