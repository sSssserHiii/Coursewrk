const Router = require("express");
const router = new Router();
const EmployeeController = require("../controllers/employee-controller");

router.post("/post", EmployeeController.postEmployee);


router.get("/get", EmployeeController.getEmployes);
router.get("/id/:id", EmployeeController.getEmployeeByID);
router.get("/username", EmployeeController.getEmployeeByUsername);


router.delete("/id/:id", EmployeeController.deleteEmployeeByID);

router.post("/employee_rankings", EmployeeController.getEmployeeRankings);
router.post("/products_not_received_this_month", ProductController.getProductsNotReceivedThisMonth);

// router.delete("/deleteusername", EmployeeController.deleteEmployeeByUsername);

//router.put("/id/:id", EmployeeController.updateEmployeeById);

  // "employee_full_name": "Jane Davies",
  // "passwort" : "dgeg4eghg34g783"

module.exports = router;