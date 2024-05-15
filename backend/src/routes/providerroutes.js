const Router = require("express");
const router = new Router();
const ProviderController = require("../controllers/provider-controller");

router.post("/post", ProviderController.postProvider);


router.get("/getall", ProviderController.getProviders);
router.get("/id/:id", ProviderController.getProviderByID);
router.get("/username", ProviderController.getProviderByUsername);


router.delete("/id/:id", ProviderController.deleteProviderByID);


// router.put("/id/:id", ProviderController.updateProviderById);


module.exports = router;