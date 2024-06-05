const db = require('../services/db');

class WriteOffMiddleValueController {
  async createRecord(req, res) {
    const { write_off, barcode, amount, reason, role } = req.body;
    try {
      const newRecord = await db(role).query(
        `INSERT INTO writeoffmiddlevalue (write_off, barcode, amount, reason) VALUES ($1, $2, $3, $4) RETURNING *`,
        [write_off, barcode, amount, reason]
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
      const records = await db(role).query(`SELECT * FROM writeoffmiddlevalue`);
      res.json(records.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRecordById(req, res) {
    const { role } = req.body;
    try {
      const record = await db(role).query(`SELECT * FROM writeoffmiddlevalue WHERE write_off = $1 AND barcode = $2`, [req.params.write_off, req.params.barcode]);
      res.json(record.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateRecordById(req, res) {
    const { write_off, barcode, amount, reason, role } = req.body;
    try {
      const updatedRecord = await db(role).query(
        `UPDATE writeoffmiddlevalue SET amount = $1, reason = $2 WHERE write_off = $3 AND barcode = $4 RETURNING *`,
        [amount, reason, write_off, barcode]
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
        `DELETE FROM writeoffmiddlevalue WHERE write_off = $1 AND barcode = $2 RETURNING *`,
        [req.params.write_off, req.params.barcode]
      );
      res.json(deletedRecord.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new WriteOffMiddleValueController();
