const Router = require('express');
const router = new Router();
const WriteOffGoodsController = require('../controllers/write-off-goods-controller');

router.post('/post', WriteOffGoodsController.createWriteOffGoods);
router.get('/all', WriteOffGoodsController.getWriteOffGoods);
router.get('/:id', WriteOffGoodsController.getWriteOffGoodsById);
router.put('/:id', WriteOffGoodsController.updateWriteOffGoodsById);
router.delete('/:id', WriteOffGoodsController.deleteWriteOffGoodsById);

module.exports = router;
