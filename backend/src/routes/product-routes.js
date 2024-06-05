const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/product-controller');

router.post("/post", ProductController.createProduct);
router.get("/get", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProductById);
router.delete("/:id", ProductController.deleteProductById);

module.exports = router;
