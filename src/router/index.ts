import { Router } from 'express';
import AuthRouter from '../modules/auth/auth.route';
import UserRouter from '../modules/user/user.route';
import VehicleRouter from '../modules/vehicles/vehicle.route';

const router = Router();

const routes = [
    {
        path: '/users',
        route: UserRouter,
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/vehicles',
        route: VehicleRouter,
    },
];

routes.forEach(({ path, route }) => {
    router.use(path, route);
});

export default router;
