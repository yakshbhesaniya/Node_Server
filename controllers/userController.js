const path = require('path');
const { ApiError } = require('../utils/ApiError.js');
const { ApiResponse } = require('../utils/ApiResponse.js');

async function getUser(context) {
    const { req, res, params, queryParams } = context;
    try {
        const data = {
            name: 'Yaksh',
            age: 21
        };
        console.log(data);
        const apiResponse = new ApiResponse(200, data, 'User Profile');
        res.writeHead(apiResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiResponse));
    } catch (error) {
        const apiError = new ApiError(500, 'Internal Server Error');
        res.writeHead(apiError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiError));
    }
}

async function getUserName(context) {
    const { req, res, params, queryParams } = context;
    try {
        const data = 'Yaksh Bhesaniya';
        console.log(data);
        console.log(req.method, "Hello");
        const apiResponse = new ApiResponse(200, data, 'User Name');
        res.writeHead(apiResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiResponse));
    } catch (error) {
        const apiError = new ApiError(500, 'Internal Server Error');
        res.writeHead(apiError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiError));
    }
}

async function getUserByID(context) {
    const { req, res, params, queryParams } = context;
    try {
        const data = params;
        console.log(req.method, "Hello");
        console.log(req.body, "Hello");
        const apiResponse = new ApiResponse(200, data, 'User By Id');
        res.writeHead(apiResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiResponse));
    } catch (error) {
        const apiError = new ApiError(500, 'Internal Server Error');
        res.writeHead(apiError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiError));
    }
}

async function getImage(context) {
    const { req, res, params, queryParams } = context;
    try {
        const filePath = path.join(__dirname, '1.png');
        const fileStream = fs.createReadStream(filePath);
        res.writeHead(200, {
            'Content-Type': 'image/png', 
            'Content-Disposition': 'inline; filename=1.png' 
        });
        fileStream.pipe(res);
    } catch (error) {
        const apiError = new ApiError(500, 'Internal Server Error');
        res.writeHead(apiError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiError));
    }
}

module.exports = { getUser, getUserName, getUserByID, getImage };
