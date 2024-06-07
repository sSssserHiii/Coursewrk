const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/product-controller');

router.post("/post", ProductController.createProduct);
router.get("/get", ProductController.getProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProductById);
router.delete("/:id", ProductController.deleteProductById);


router.get("/type/last_week", ProductController.getProductsByTypeLastWeek);
router.get("/total/last_month", ProductController.getTotalProductsLastMonth);
router.get("/average_amount", ProductController.getAverageProductAmount);
router.get("/provider_same_amount", ProductController.getProductsByProviderWithSameAmount);
router.post("/products_not_received_this_month", ProductController.getProductsNotReceivedThisMonth);


module.exports = router;
