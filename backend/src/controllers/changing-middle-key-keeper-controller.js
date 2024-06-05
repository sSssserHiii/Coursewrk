const db = require('../services/db');

class ChangingMiddleKeyKeeperController {
  async createRecord(req, res) {
    const { request_for_changing_goods, barcode, amount, reason, role } = req.body;
    try {
      const newRecord = await db(role).query(
        `INSERT INTO changingmiddlekeykeeper (request_for_changing_goods, barcode, amount, reason) VALUES ($1, $2, $3, $4) RETURNING *`,
        [request_for_changing_goods, barcode, amount, reason]
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
      const records = await db(role).query(`SELECT * FROM changingmiddlekeykeeper`);
      res.json(records.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRecordById(req, res) {
    const { role } = req.body;
    try {
      const record = await db(role).query(`SELECT * FROM changingmiddlekeykeeper WHERE request_for_changing_goods = $1 AND barcode = $2`, [req.params.request_for_changing_goods, req.params.barcode]);
      res.json(record.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateRecordById(req, res) {
    const { request_for_changing_goods, barcode, amount, reason, role } = req.body;
    try {
      const updatedRecord = await db(role).query(
        `UPDATE changingmiddlekeykeeper SET amount = $1, reason = $2 WHERE request_for_changing_goods = $3 AND barcode = $4 RETURNING *`,
        [amount, reason, request_for_changing_goods, barcode]
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
        `DELETE FROM changingmiddlekeykeeper WHERE request_for_changing_goods = $1 AND barcode = $2 RETURNING *`,
        [req.params.request_for_changing_goods, req.params.barcode]
      );
      res.json(deletedRecord.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new ChangingMiddleKeyKeeperController();
