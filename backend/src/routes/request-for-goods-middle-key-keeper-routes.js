const Router = require('express');
const router = new Router();
const RequestForGoodsMiddleKeyKeeperController = require('../controllers/request-for-goods-middle-key-keeper-controller');

router.post('/post', RequestForGoodsMiddleKeyKeeperController.createRecord);
router.get('/all', RequestForGoodsMiddleKeyKeeperController.getRecords);
router.get('/:request_for_goods/:barcode', RequestForGoodsMiddleKeyKeeperController.getRecordById);
router.put('/:request_for_goods/:barcode', RequestForGoodsMiddleKeyKeeperController.updateRecordById);
router.delete('/:request_for_goods/:barcode', RequestForGoodsMiddleKeyKeeperController.deleteRecordById);

module.exports = router;
