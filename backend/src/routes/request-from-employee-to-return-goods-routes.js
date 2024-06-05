const Router = require('express');
const router = new Router();
const RequestFromEmployeeToReturnGoodsController = require('../controllers/request-from-employee-to-return-goods-controller');

router.post('/post', RequestFromEmployeeToReturnGoodsController.createRequest);
router.get('/all', RequestFromEmployeeToReturnGoodsController.getRequests);
router.get('/:id', RequestFromEmployeeToReturnGoodsController.getRequestById);
router.put('/:id', RequestFromEmployeeToReturnGoodsController.updateRequestById);
router.delete('/:id', RequestFromEmployeeToReturnGoodsController.deleteRequestById);

module.exports = router;
