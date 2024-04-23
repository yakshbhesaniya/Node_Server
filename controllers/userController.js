const { ApiError } = require('../utils/ApiError.js');
const { ApiResponse } = require('../utils/ApiResponse.js');

async function getUser(req, res) {
    try {
        const data = {
            name: 'Yaksh',
            age: 21
        };
        const apiResponse = new ApiResponse(200, data, 'User Profile');
        res.writeHead(apiResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiResponse));
    } catch (error) {
        const apiError = new ApiError(500, 'Internal Server Error');
        res.writeHead(apiError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiError));
    }
}

async function getUserName(req, res) {
    try {
        const data = 'Yaksh Bhesaniya';
        const apiResponse = new ApiResponse(200, data, 'User Name');
        res.writeHead(apiResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiResponse));
    } catch (error) {
        const apiError = new ApiError(500, 'Internal Server Error');
        res.writeHead(apiError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiError));
    }
}

async function getUserByID(req, res, params) {
    try {
        const data = params;
        const apiResponse = new ApiResponse(200, data, 'User By Id');
        res.writeHead(apiResponse.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiResponse));
    } catch (error) {
        const apiError = new ApiError(500, 'Internal Server Error');
        res.writeHead(apiError.statusCode, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(apiError));
    }
}

module.exports = { getUser, getUserName, getUserByID };
