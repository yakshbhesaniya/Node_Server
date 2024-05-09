class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", res) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        if (this.shouldRedirect(statusCode)) {
            this.redirectResponse(res);
        } else {
            this.sendErrorResponse(res);
        }; 
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

    shouldRedirect(statusCode) {
        return statusCode >= 300 && statusCode < 400;
    }

    redirectResponse(res) {
        const errorResponse = this.generateErrorResponse();
        res.writeHead(errorResponse.statusCode, { 'Location': this.message });
        res.end();
    }

    sendErrorResponse(res) {
        const errorResponse = this.generateErrorResponse();
        res.writeHead(errorResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(errorResponse.body);
    }
}

module.exports = { ApiError };
