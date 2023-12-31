const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middlleware');
const { authController } = require('../controllers');
const uploadCloud = require('../middlewares/uploader.middleware');

const authRouter = express.Router();

authRouter.route('/register').post(authController.register);

authRouter.route('/login').post(authController.login);

authRouter.route('/forgot-password').post(authController.forgotPassword);

authRouter.route('/reset-password').post(authController.resetPassword);

authRouter.use(authMiddleware);
authRouter.use(roleMiddleware(['user', 'admin']));

authRouter.route('/me').get(authController.getProfile);
authRouter
    .route('/profile')
    .put(uploadCloud.single('avatar'), authController.updateProfile);

module.exports = authRouter;
