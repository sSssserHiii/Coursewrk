const Router = require("express");
const router = new Router();
const AuthController = require("../controllers/auth-controller");

router.post("/sign_in", AuthController.signIn);

router.get("/sign_out", AuthController.signOutUser);


module.exports = router;