const db = require('../services/db');

class SharingReportMiddleKeyKeeperController {
  async createRecord(req, res) {
    const { report_to_send_in_the_store, barcode, amount, role } = req.body;
    try {
      const newRecord = await db(role).query(
        `INSERT INTO sharingreportmiddlekeykeeper (report_to_send_in_the_store, barcode, amount) VALUES ($1, $2, $3) RETURNING *`,
        [report_to_send_in_the_store, barcode, amount]
      );
      res.status(201).json(newRecord.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRecords(req, res) {
    const { role } = req.body;
    try {
      const records = await db(role).query(`SELECT * FROM sharingreportmiddlekeykeeper`);
      res.json(records.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRecordById(req, res) {
    const { role } = req.body;
    try {
      const record = await db(role).query(`SELECT * FROM sharingreportmiddlekeykeeper WHERE report_to_send_in_the_store = $1 AND barcode = $2`, [req.params.report_to_send_in_the_store, req.params.barcode]);
      res.json(record.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateRecordById(req, res) {
    const { report_to_send_in_the_store, barcode, amount, role } = req.body;
    try {
      const updatedRecord = await db(role).query(
        `UPDATE sharingreportmiddlekeykeeper SET amount = $1 WHERE report_to_send_in_the_store = $2 AND barcode = $3 RETURNING *`,
        [amount, report_to_send_in_the_store, barcode]
      );
      res.json(updatedRecord.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteRecordById(req, res) {
    const { role } = req.body;
    try {
      const deletedRecord = await db(role).query(
        `DELETE FROM sharingreportmiddlekeykeeper WHERE report_to_send_in_the_store = $1 AND barcode = $2 RETURNING *`,
        [req.params.report_to_send_in_the_store, req.params.barcode]
      );
      res.json(deletedRecord.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new SharingReportMiddleKeyKeeperController();
