const { router } = require('./router.js');
const { getUser, getUserName, getUserByID } = require('../controllers/userController.js');
const { middleware1, middleware2 } = require('../middlewares/userMiddleware.js');

router.get('/user', async (context) => {
    await getUser(context);
});

router.get('/user/name', async (context) => {
    await getUserName(context);
});

router.get('/user/details/:id', middleware1, middleware2, async (context) => {
    await getUserByID(context);
});

router.post('/user/details/:id', middleware1, middleware2, async (context) => {
    await getUserByID(context);
});

module.exports = { router };
