const Router = require('express');
const router = new Router();
const WriteOffMiddleValueController = require('../controllers/write-off-middle-value-controller');

router.post('/post', WriteOffMiddleValueController.createRecord);
router.get('/all', WriteOffMiddleValueController.getRecords);
router.get('/:write_off/:barcode', WriteOffMiddleValueController.getRecordById);
router.put('/:write_off/:barcode', WriteOffMiddleValueController.updateRecordById);
router.delete('/:write_off/:barcode', WriteOffMiddleValueController.deleteRecordById);

router.get('/items_to_write_off', WriteOffMiddleValueController.getItemsToWriteOff);
router.get('/items_written_off_more_than_twice', WriteOffMiddleValueController.getItemsWrittenOffMoreThanTwice);


module.exports = router;
