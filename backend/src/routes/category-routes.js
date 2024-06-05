const Router = require('express');
const router = new Router();
const CategoryController = require('../controllers/category-controller');

router.post("/post", CategoryController.createCategory);
router.get("/get", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", CategoryController.updateCategoryById);
router.delete("/:id", CategoryController.deleteCategoryById);

module.exports = router;
