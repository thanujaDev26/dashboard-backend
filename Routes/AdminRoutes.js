const AdminController = require('../Controllers/AdminControllers')
const express = require('express');
const router = express.Router();


router.route('/sign-up')
    .post(AdminController.signUpUser)

router.route('/sign-in')
    .post(AdminController.signInUser)

module.exports = router;