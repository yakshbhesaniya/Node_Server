const { parse: parseUrlEncoded } = require('querystring');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const { ApiError } = require('../utils/ApiError.js');

class Router {
  constructor() {
    this.routes = {};
    // structure of this.routes:
    // this.routes = {
    //   GET: [],
    //   POST: [],
    //   PUT: [],
    //   PATCH: [],
    //   DELETE: []
    // };
  }

  addRoute(method, path, ...middlewaresAndHandler) {
    let handler;
    let middlewares = [];

    if (typeof middlewaresAndHandler[middlewaresAndHandler.length - 1] === 'function') {
      handler = middlewaresAndHandler.pop();
    }

    middlewares = middlewaresAndHandler;

    const route = { method, path: this.parsePath(path), middlewares, handler };
    
    if (!this.routes[method]) {
      this.routes[method] = [];
    }
    
    this.routes[method].push(route);
  }

  get(path, ...middlewaresAndHandler) {
    this.addRoute('GET', path, ...middlewaresAndHandler);
  }

  post(path, ...middlewaresAndHandler) {
    this.addRoute('POST', path, ...middlewaresAndHandler);
  }

  put(path, ...middlewaresAndHandler) {
    this.addRoute('PUT', path, ...middlewaresAndHandler);
  }

  patch(path, ...middlewaresAndHandler) {
    this.addRoute('PATCH', path, ...middlewaresAndHandler);
  }

  delete(path, ...middlewaresAndHandler) {
    this.addRoute('DELETE', path, ...middlewaresAndHandler);
  }

  async handle(req, res) {
    const { method, url } = req;
    const host = req.headers['host'];
    const { pathname, searchParams } = new URL(url, `http://${host}`);
    const route = this.findRoute(method, pathname);

    if (route) {
      const params = this.extractParams(route.path, pathname);
      const queryParams = Object.fromEntries(searchParams.entries());
      const context = { req, res, params, queryParams };
      const contentType = req.headers['Content-Type'] || req.headers['content-type'];

      let body;
      if (contentType) {
        if (contentType.includes('application/json')) {
          body = await this.parseJsonBody(req);
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          body = await this.parseUrlEncodedBody(req);
        } else if (contentType.includes('multipart/form-data')) {
          body = await this.parseFormDataBody(req);
          const transformedFields = {};
          Object.keys(body.fields).forEach(key => {
            transformedFields[key] = body.fields[key][0];
          });
          body.fields = transformedFields;
          body = { ...body.fields, files: body.files };
        } else if (contentType.includes('text/plain')) {
          body = await this.parsePlainTextBody(req);
        } else {
          body = null;
          this.sendNotFoundError(res);
        }
      }
      context.req.body = body;

      await this.processMiddlewareAndHandler(context, route.middlewares, route.handler);
    } else {
      this.sendNotFoundError(res);
    }
  }

  findRoute(method, pathname) {
    return this.routes[method].find(route => {
      const pathMatch = route.path.exec(pathname);
      return pathMatch !== null;
    });
  }

  async processMiddlewareAndHandler(context, middlewares, handler) {
    let index = 0;
    const next = async () => {
      if (index < middlewares.length) {
        const middleware = middlewares[index++];
        await middleware(context, next);
      } else if (handler) {
        await handler(context);
      }
    };
    await next();
  }

  sendNotFoundError(res) {
    return new ApiError(404, 'Route Not Found', res);
  }

  parsePath(path) {
    return new RegExp(`^${path.replace(/\/:[^/]+/g, '/([^/]+)')}$`);
  }

  extractParams(regex, pathname) {
    const match = regex.exec(pathname);
    return match ? match.slice(1) : [];
  }

  async parseJsonBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async parseUrlEncodedBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(parseUrlEncoded(body));
      });
    });
  }

  async parseFormDataBody(req) {
    return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
  
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });
  }

  async parsePlainTextBody(req) {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    });
  }
}

const router = new Router();

module.exports = { router };
