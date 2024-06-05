const db = require('../services/db');

class InvoiceController {
  async createInvoice(req, res) {
    const { deliverly, barcode, amount, role } = req.body;
    try {
      const newInvoice = await db(role).query(
        `INSERT INTO invoice (deliverly, barcode, amount) VALUES ($1, $2, $3) RETURNING *`,
        [deliverly, barcode, amount]
      );
      res.status(201).json(newInvoice.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getInvoices(req, res) {
    const { role } = req.body;
    try {
      const invoices = await db(role).query(`SELECT * FROM invoice`);
      res.json(invoices.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getInvoiceById(req, res) {
    const { role } = req.body;
    try {
      const invoice = await db(role).query(`SELECT * FROM invoice WHERE deliverly = $1 AND barcode = $2`, [req.params.deliverly, req.params.barcode]);
      res.json(invoice.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateInvoiceById(req, res) {
    const { deliverly, barcode, amount, role } = req.body;
    try {
      const updatedInvoice = await db(role).query(
        `UPDATE invoice SET amount = $1 WHERE deliverly = $2 AND barcode = $3 RETURNING *`,
        [amount, deliverly, barcode]
      );
      res.json(updatedInvoice.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteInvoiceById(req, res) {
    const { role } = req.body;
    try {
      const deletedInvoice = await db(role).query(
        `DELETE FROM invoice WHERE deliverly = $1 AND barcode = $2 RETURNING *`,
        [req.params.deliverly, req.params.barcode]
      );
      res.json(deletedInvoice.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new InvoiceController();
