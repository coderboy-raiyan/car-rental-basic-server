import { NextFunction, Request, RequestHandler, Response } from 'express';

function CatchAsyncError(fn: RequestHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    };
}

// function CatchAsyncError(fn: RequestHandler) {
//     return async function (req: Request, res: Response, next: NextFunction) {
//         try {
//             await fn(req, res, next);
//         } catch (error) {
//             next(error);
//         }
//     };
// }

export default CatchAsyncError;
