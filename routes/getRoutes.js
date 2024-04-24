const { router } = require('./router.js');
const { getUser, getUserName, getUserByID, getImage } = require('../controllers/userController.js');
const { middleware1, middleware2 } = require('../middlewares/userMiddleware.js');

router.get('/user', getUser);
router.get('/user/name', getUserName);
router.get('/user/details/:id', middleware1, middleware2, getUserByID);
router.get('/user/image', getImage);

router.post('/user/details/:id', middleware1, middleware2, getUserByID);

router.put('/user/details/:id', middleware1, middleware2, getUserByID);

router.patch('/user/details/:id', middleware1, middleware2, getUserByID);

router.delete('/user/name', middleware1, middleware2, getUserByID);

module.exports = { router };
