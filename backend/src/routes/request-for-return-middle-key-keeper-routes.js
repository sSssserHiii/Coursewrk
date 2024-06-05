const Router = require('express');
const router = new Router();
const RequestForReturnMiddleKeyKeeperController = require('../controllers/request-for-return-middle-key-keeper-controller');

router.post('/post', RequestForReturnMiddleKeyKeeperController.createRecord);
router.get('/all', RequestForReturnMiddleKeyKeeperController.getRecords);
router.get('/:request_from_employee_to_return_goods/:barcode', RequestForReturnMiddleKeyKeeperController.getRecordById);
router.put('/:request_from_employee_to_return_goods/:barcode', RequestForReturnMiddleKeyKeeperController.updateRecordById);
router.delete('/:request_from_employee_to_return_goods/:barcode', RequestForReturnMiddleKeyKeeperController.deleteRecordById);

module.exports = router;
