const Router = require('express');
const router = new Router();
const StoreController = require('../controllers/store-controller');

router.post('/post', StoreController.createStore);
router.get('/all', StoreController.getStores);
router.get('/:id', StoreController.getStoreById);
router.put('/:id', StoreController.updateStoreById);
router.delete('/:id', StoreController.deleteStoreById);

module.exports = router;
