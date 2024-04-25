const fs = require('fs');
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
        return new ApiResponse(200, data, 'User Profile', { 'Content-Type': 'application/json' }, res);
    } catch (error) {
        return new ApiError(500, 'Internal Server Error', res);
    }
}

async function getUserName(context) {
    const { req, res, params, queryParams } = context;
    try {
        const data = 'Yaksh Bhesaniya';
        console.log(data);
        return new ApiResponse(200, data, 'User Name', { 'Content-Type': 'application/json' }, res);
    } catch (error) {
        return new ApiError(500, 'Internal Server Error', res);
    }
}

async function getUserByID(context) {
    const { req, res, params, queryParams } = context;
    try {
        const data = paramse;
        console.log(data);
        return new ApiResponse(200, data, 'User By Id', { 'Content-Type': 'application/json' }, res);
    } catch (error) {
        return new ApiError(500, 'Internal Server Error', res);
    }
}

async function getImage(context) {
    const { req, res, params, queryParams } = context;
    try {
        const cwd = process.cwd();
        const filePath = path.join(cwd, 'public', '1.png');
        const fileStream = fs.createReadStream(filePath);

        return new ApiResponse(200, fileStream, 'Image', {
            'Content-Type': 'image/png',
            'Content-Disposition': 'inline; filename=1.png'
        }, res);
    } catch (error) {
        return new ApiError(500, 'Internal Server Error', res);
    }
}

module.exports = { getUser, getUserName, getUserByID, getImage };
