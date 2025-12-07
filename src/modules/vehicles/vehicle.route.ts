import { Router } from 'express';
import VehicleControllers from './vehicle.controller';

const VehicleRouter = Router();

VehicleRouter.post('/', VehicleControllers.createVehicle);
VehicleRouter.get('/', VehicleControllers.getVehicles);
VehicleRouter.get('/:vehicleId', VehicleControllers.getSingleVehicle);
VehicleRouter.put('/:vehicleId', VehicleControllers.updateVehicle);
VehicleRouter.delete('/:vehicleId', VehicleControllers.deleteVehicle);

export default VehicleRouter;
