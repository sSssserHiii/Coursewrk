const db = require('../services/db');

class InvoiceDeliverlyController {
  async createInvoiceDeliverly(req, res) {
    const { employee_id, provider_id_invoice, invoice_date, role } = req.body;
    try {
      const newInvoiceDeliverly = await db(role).query(
        `INSERT INTO InvoiceDeliverly (employee_id, provider_id_invoice, invoice_date) VALUES ($1, $2, $3) RETURNING *`,
        [employee_id, provider_id_invoice, invoice_date]
      );
      res.status(201).json(newInvoiceDeliverly.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getInvoiceDeliverlies(req, res) {
    const { role } = req.body;
    try {
      const invoiceDeliverlies = await db(role).query(`SELECT * FROM InvoiceDeliverly`);
      res.json(invoiceDeliverlies.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getInvoiceDeliverlyById(req, res) {
    const { role } = req.body;
    try {
      const invoiceDeliverly = await db(role).query(`SELECT * FROM InvoiceDeliverly WHERE deliverly_id = $1`, [req.params.id]);
      res.json(invoiceDeliverly.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateInvoiceDeliverlyById(req, res) {
    const { employee_id, provider_id_invoice, invoice_date, role } = req.body;
    try {
      const updatedInvoiceDeliverly = await db(role).query(
        `UPDATE InvoiceDeliverly SET employee_id = $1, provider_id_invoice = $2, invoice_date = $3 WHERE deliverly_id = $4 RETURNING *`,
        [employee_id, provider_id_invoice, invoice_date, req.params.id]
      );
      res.json(updatedInvoiceDeliverly.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteInvoiceDeliverlyById(req, res) {
    const { role } = req.body;
    try {
      const deletedInvoiceDeliverly = await db(role).query(
        `DELETE FROM InvoiceDeliverly WHERE deliverly_id = $1 RETURNING *`,
        [req.params.id]
      );
      res.json(deletedInvoiceDeliverly.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new InvoiceDeliverlyController();
