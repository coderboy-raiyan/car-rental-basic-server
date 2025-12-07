import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import { UserConstants } from '../user/user.constant';
import VehicleControllers from './vehicle.controller';

const VehicleRouter = Router();

VehicleRouter.post('/', verifyAuth(UserConstants.Roles.admin), VehicleControllers.createVehicle);
VehicleRouter.get('/', VehicleControllers.getVehicles);
VehicleRouter.get('/:vehicleId', VehicleControllers.getSingleVehicle);
VehicleRouter.put(
    '/:vehicleId',
    verifyAuth(UserConstants.Roles.admin),
    VehicleControllers.updateVehicle
);
VehicleRouter.delete(
    '/:vehicleId',
    verifyAuth(UserConstants.Roles.admin),
    VehicleControllers.deleteVehicle
);

export default VehicleRouter;
