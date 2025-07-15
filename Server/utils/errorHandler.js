
class errorHandler extends Error {
    constructor(message, statusCode) {
        super.message(message);

        this.statusCode = statusCode;

    }
};

export default errorHandler;