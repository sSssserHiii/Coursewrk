const Router = require('express');
const router = new Router();
const RequestForChangingGoodsController = require('../controllers/request-for-changing-goods-controller');

router.post('/post', RequestForChangingGoodsController.createRequest);
router.get('/all', RequestForChangingGoodsController.getRequests);
router.get('/:id', RequestForChangingGoodsController.getRequestById);
router.put('/:id', RequestForChangingGoodsController.updateRequestById);
router.delete('/:id', RequestForChangingGoodsController.deleteRequestById);

module.exports = router;
