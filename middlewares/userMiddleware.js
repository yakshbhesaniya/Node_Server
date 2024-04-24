const middleware1 = async (context, next) => {
    console.log('Middleware 1');
    next();
};

const middleware2 = async (context, next) => {
    console.log('Middleware 2');
    next();
};

module.exports = { middleware1, middleware2 }