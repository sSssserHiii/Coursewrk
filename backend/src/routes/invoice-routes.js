const Router = require('express');
const router = new Router();
const InvoiceController = require('../controllers/invoice-controller');

router.post('/post', InvoiceController.createInvoice);
router.get('/all', InvoiceController.getInvoices);
router.get('/:deliverly/:barcode', InvoiceController.getInvoiceById);
router.put('/:deliverly/:barcode', InvoiceController.updateInvoiceById);
router.delete('/:deliverly/:barcode', InvoiceController.deleteInvoiceById);


router.post("/product_count_by_employee_date", InvoiceController.getProductCountByEmployeeAndDate);
router.post("/invoice_details_by_date_range", InvoiceController.getInvoiceDetailsByDateRange);
router.post("/average_amount_per_invoice", InvoiceController.getAverageAmountPerInvoice);


module.exports = router;
