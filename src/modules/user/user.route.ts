import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import { UserConstants } from './user.constant';
import UserControllers from './user.controller';
import UserMiddleWares from './user.middleware';

const UserRouter = Router();

UserRouter.get('/', verifyAuth(UserConstants.Roles.admin), UserControllers.getUsers);
UserRouter.put(
    '/:userId',
    verifyAuth(UserConstants.Roles.admin, UserConstants.Roles.customer),
    UserMiddleWares.verifyIdentity,
    UserControllers.updateUser
);

export default UserRouter;
