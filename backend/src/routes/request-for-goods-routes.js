const Router = require('express');
const router = new Router();
const RequestForGoodsController = require('../controllers/request-for-goods-controller');

router.post('/post', RequestForGoodsController.createRequest);
router.get('/get', RequestForGoodsController.getRequests);
router.get('/:id', RequestForGoodsController.getRequestById);
router.put('/:id', RequestForGoodsController.updateRequestById);
router.delete('/:id', RequestForGoodsController.deleteRequestById);

module.exports = router;
