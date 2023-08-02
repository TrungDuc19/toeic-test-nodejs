const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middlleware');
const uploadCloud = require('../middlewares/uploader.middleware');
const { userController } = require('../controllers');

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.use(roleMiddleware(['admin']));

userRouter
    .route('/')
    .get(userController.getUsers)
    .post(uploadCloud.single('avatar'), userController.createUser);

userRouter
    .route('/:userId')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = userRouter;
