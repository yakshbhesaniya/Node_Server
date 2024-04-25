class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", res) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.sendErrorResponse(res); 
    }

    generateErrorResponse() {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                statusCode: this.statusCode,
                message: this.message,
                errors: this.errors,
                success: this.success
            })
        };
    }

    sendErrorResponse(res) {
        const errorResponse = this.generateErrorResponse();
        res.writeHead(errorResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(errorResponse.body);
    }
}

module.exports = { ApiError };
