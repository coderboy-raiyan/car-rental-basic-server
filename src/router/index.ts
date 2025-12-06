import { Router } from 'express';
import UserRouter from '../modules/user/user.route';

const router = Router();

const routes = [
    {
        path: '/user',
        route: UserRouter,
    },
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
