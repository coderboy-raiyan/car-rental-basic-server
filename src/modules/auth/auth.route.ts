import { Router } from 'express';
import AuthControllers from './auth.controller';

const AuthRouter = Router();

AuthRouter.post('/signup', AuthControllers.signUp);
AuthRouter.post('/signin', AuthControllers.signIn);

export default AuthRouter;
