import { Router } from 'express';
import VehicleControllers from './vehicle.controller';

const VehicleRouter = Router();

VehicleRouter.get('/', VehicleControllers.getVehicles);
VehicleRouter.get('/:vehicleId', VehicleControllers.getSingleVehicle);
VehicleRouter.post('/', VehicleControllers.createVehicle);

export default VehicleRouter;
