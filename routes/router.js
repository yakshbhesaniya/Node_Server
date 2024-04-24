class Router {
  constructor() {
    this.routes = {};
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

  async handle(req, res) {
    const { method, url } = req;
    const host = req.headers['host'];
    const { pathname, searchParams } = new URL(url, `http://${host}`);
    const route = this.findRoute(method, pathname);

    if (route) {
      const params = this.extractParams(route.path, pathname);
      const queryParams = Object.fromEntries(searchParams.entries());
      const context = { req, res, params, queryParams };

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
    const apiError = new ApiError(404, '404 Not Found');
    res.writeHead(apiError.statusCode, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(apiError));
  }

  parsePath(path) {
    return new RegExp(`^${path.replace(/\/:[^/]+/g, '/([^/]+)')}$`);
  }

  extractParams(regex, pathname) {
    const match = regex.exec(pathname);
    return match ? match.slice(1) : [];
  }
}

const router = new Router();

module.exports = { router };
