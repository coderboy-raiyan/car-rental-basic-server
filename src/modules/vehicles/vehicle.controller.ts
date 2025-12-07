import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsyncError from '../../utils/catchAsyncError';
import sendResponse from '../../utils/sendResponse';
import VehicleServices from './vehicle.service';

const createVehicle = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await VehicleServices.createVehicle(req.body);
    return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Vehicle created successfully',
        data,
    });
});
const getVehicles = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await VehicleServices.getAllVehicles();
    if (!data?.rowCount) {
        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'No vehicles found',
            data: [],
        });
    }
    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Vehicles retrieved successfully',
        data: data?.rows[0],
    });
});
const getSingleVehicle = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await VehicleServices.getSingleVehicle(req?.params?.vehicleId);

    if (!data?.rowCount) {
        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            message: 'No vehicles found',
            data: {},
        });
    }
    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Vehicle retrieved successfully',
        data: data?.rows[0],
    });
});
const updateVehicle = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await VehicleServices.updateVehicle(req?.params?.vehicleId, req.body);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Vehicle updated successfully',
        data,
    });
});
const deleteVehicle = CatchAsyncError(async (req: Request, res: Response) => {
    await VehicleServices.deleteVehicle(req?.params?.vehicleId);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Vehicle deleted successfully',
    });
});

const VehicleControllers = {
    createVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};

export default VehicleControllers;
