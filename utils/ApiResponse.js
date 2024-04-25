const fs = require('fs');

class ApiResponse {
    constructor(statusCode, data, message = "Success", headers = {}, res) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
        this.headers = headers;

        if (data instanceof fs.ReadStream) {
            this.sendFileResponse(res);
        } else {
            this.sendHttpResponse(res);
        }
    }

    generateHttpResponse() {
        return {
            statusCode: this.statusCode,
            headers: this.headers,
            body: JSON.stringify({
                statusCode: this.statusCode,
                data: this.data,
                message: this.message,
                success: this.success
            })
        };
    }

    sendHttpResponse(res) {
        const httpResponse = this.generateHttpResponse();
        res.writeHead(httpResponse.statusCode, httpResponse.headers);
        res.end(httpResponse.body);
    }

    sendFileResponse(res) {
        const fileStream = this.data;
        res.writeHead(this.statusCode, this.headers);
        fileStream.pipe(res);
    }
}

module.exports = { ApiResponse };
