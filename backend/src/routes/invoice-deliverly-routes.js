const Router = require('express');
const router = new Router();
const InvoiceDeliverlyController = require('../controllers/invoice-deliverly-controller');

router.post('/post', InvoiceDeliverlyController.createInvoiceDeliverly);
router.get('/all', InvoiceDeliverlyController.getInvoiceDeliverlies);
router.get('/:id', InvoiceDeliverlyController.getInvoiceDeliverlyById);
router.put('/:id', InvoiceDeliverlyController.updateInvoiceDeliverlyById);
router.delete('/:id', InvoiceDeliverlyController.deleteInvoiceDeliverlyById);

module.exports = router;
