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




  async getProductCountByEmployeeAndDate(req, res) {
    const { role, employeeFullName, employeeSurname, endDate } = req.body;
    try {
        const productCount = await db(role).query(
            `SELECT SUM(iv.amount) 
            FROM invoice AS iv
            INNER JOIN invoicedeliverly AS ivd ON ivd.deliverly_id = iv.deliverly
            INNER JOIN employeeuser AS em ON ivd.employee_id = em.employee_id
            WHERE em.employee_full_name = $1 AND em.surname = $2 AND ivd.invoice_date <= $3`,
            [employeeFullName, employeeSurname, endDate]
        );
        res.json(productCount.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }

  }
    async getInvoiceDetailsByDateRange(req, res) {
      const { role, startDate, endDate } = req.body;
      try {
          const invoiceDetails = await db(role).query(
              `SELECT ivd.*, iv.barcode, iv.amount, em.employee_full_name, em.surname
              FROM invoicedeliverly AS ivd
              INNER JOIN invoice AS iv ON ivd.deliverly_id = iv.deliverly
              INNER JOIN employeeuser AS em ON ivd.employee_id = em.employee_id
              WHERE ivd.invoice_date BETWEEN $1 AND $2`,
              [startDate, endDate]
          );
          res.json(invoiceDetails.rows);
      } catch (err) {
          console.error(err);
          res.status(500).json({ error: "internal server error" });
      }
  }


  async getAverageAmountPerInvoice(req, res) {
    const { role } = req.body;
    try {
        const result = await db(role).query(
            `SELECT *, (SELECT ROUND(AVG(amount)) FROM invoice) AS average_amount FROM invoice`
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}


}



module.exports = new InvoiceController();
