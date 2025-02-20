const express = require('express');
const AdminController = require('../Controllers/AdminControllers');
const authMiddleware = require('../middleware/Authentication');

const router = express.Router();

router.post('/sign-up', AdminController.signUpUser);
router.post('/sign-in', AdminController.signInUser);
router.post('/refresh-token', AdminController.getToken);


router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user.id });
});

module.exports = router;
