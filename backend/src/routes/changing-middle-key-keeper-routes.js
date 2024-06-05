const Router = require('express');
const router = new Router();
const ChangingMiddleKeyKeeperController = require('../controllers/changing-middle-key-keeper-controller');

router.post('/post', ChangingMiddleKeyKeeperController.createRecord);
router.get('/all', ChangingMiddleKeyKeeperController.getRecords);
router.get('/:request_for_changing_goods/:barcode', ChangingMiddleKeyKeeperController.getRecordById);
router.put('/:request_for_changing_goods/:barcode', ChangingMiddleKeyKeeperController.updateRecordById);
router.delete('/:request_for_changing_goods/:barcode', ChangingMiddleKeyKeeperController.deleteRecordById);

module.exports = router;
