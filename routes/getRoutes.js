const { router } = require('./router.js');
const { getUser, getUserName, getUserByID } = require('../controllers/userController.js');

router.get('/user', async (req, res) => {
    await getUser(req, res);
});

router.get('/user/name', async (req, res) => {
    await getUserName(req, res);
});

router.get('/user/details/:id', async (req, res, params) => {
    await getUserByID(req, res, params);
});

module.exports = { router };
