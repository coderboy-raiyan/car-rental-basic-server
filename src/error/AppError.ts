class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public stack: any = ''
    ) {
        super(message);

        this.statusCode = statusCode;

        if (stack) {
            this.stack = stack;
        } else {
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;
