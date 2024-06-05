const Router = require('express');
const router = new Router();
const SharingReportMiddleKeyKeeperController = require('../controllers/sharing-report-middle-key-keeper-controller');

router.post('/post', SharingReportMiddleKeyKeeperController.createRecord);
router.get('/all', SharingReportMiddleKeyKeeperController.getRecords);
router.get('/:report_to_send_in_the_store/:barcode', SharingReportMiddleKeyKeeperController.getRecordById);
router.put('/:report_to_send_in_the_store/:barcode', SharingReportMiddleKeyKeeperController.updateRecordById);
router.delete('/:report_to_send_in_the_store/:barcode', SharingReportMiddleKeyKeeperController.deleteRecordById);

module.exports = router;
