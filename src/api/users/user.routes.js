const express = require('express');
const { isAuth } = require('../../utils/auth/middlewares/authMiddlewares');
const controller = require('./user.controller');

const router = express.Router();

router.post('/register', controller.registerPost);
router.post('/login', controller.loginPost);
router.post('/logout', isAuth, controller.logoutPost);
router.get("/check-session", controller.checkSessionGet);

module.exports = router;