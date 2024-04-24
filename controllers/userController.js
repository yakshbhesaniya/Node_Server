const { ApiError } = require('../utils/ApiError.js');
const { ApiResponse } = require('../utils/ApiResponse.js');

async function getUser(context) {
    try {
        const { res } = context;
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
    try {
        const { res } = context;
        const data = 'Yaksh Bhesaniya';
        console.log(data);
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
    try {
        const { res, params, queryParams } = context;
        const data = params;
        console.log(data);
        console.log(queryParams);
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
