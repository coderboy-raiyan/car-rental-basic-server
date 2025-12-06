import { Router } from 'express';
import AuthRouter from '../modules/auth/auth.route';
import UserRouter from '../modules/user/user.route';

const router = Router();

const routes = [
    {
        path: '/user',
        route: UserRouter,
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
