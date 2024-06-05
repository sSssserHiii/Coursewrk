const Router = require('express');
const router = new Router();
const InvoiceController = require('../controllers/invoice-controller');

router.post('/post', InvoiceController.createInvoice);
router.get('/all', InvoiceController.getInvoices);
router.get('/:deliverly/:barcode', InvoiceController.getInvoiceById);
router.put('/:deliverly/:barcode', InvoiceController.updateInvoiceById);
router.delete('/:deliverly/:barcode', InvoiceController.deleteInvoiceById);

module.exports = router;
