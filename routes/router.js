class Router {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({ method: 'GET', path: this.parsePath(path), handler });
  }

  async handle(req, res) {
    const { method, url } = req;
    const { pathname } = new URL(url, req.headers.host);
    const route = this.routes.find(r => {
      const pathMatch = r.path.exec(pathname);
      return pathMatch && r.method === method;
    });

    if (route) {
      const params = this.extractParams(route.path, pathname);
      await route.handler(req, res, params);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }

  parsePath(path) {
    return new RegExp(`^${path.replace(/\/:[^/]+/g, '/([^/]+)')}$`);
  }

  extractParams(regex, pathname) {
    const match = regex.exec(pathname);
    if (match) {
      return match.slice(1);
    }
    return [];
  }

}

const router = new Router();

module.exports = { router };
