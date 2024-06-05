const Router = require('express');
const router = new Router();
const ReportToSendINTheStoreController = require('../controllers/report-to-send-in-the-store-controller');

router.post('/post', ReportToSendINTheStoreController.createReport);
router.get('/get', ReportToSendINTheStoreController.getReports);
router.get('/:id', ReportToSendINTheStoreController.getReportById);
router.put('/:id', ReportToSendINTheStoreController.updateReportById);
router.delete('/:id', ReportToSendINTheStoreController.deleteReportById);

module.exports = router;
