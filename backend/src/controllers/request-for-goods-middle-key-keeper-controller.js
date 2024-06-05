const db = require('../services/db');

class RequestForGoodsMiddleKeyKeeperController {
  async createRecord(req, res) {
    const { request_for_goods, barcode, amount, role } = req.body;
    try {
      const newRecord = await db(role).query(
        `INSERT INTO requestforgoodsmiddlekeykeeper (request_for_goods, barcode, amount) VALUES ($1, $2, $3) RETURNING *`,
        [request_for_goods, barcode, amount]
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
      const records = await db(role).query(`SELECT * FROM requestforgoodsmiddlekeykeeper`);
      res.json(records.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRecordById(req, res) {
    const { role } = req.body;
    try {
      const record = await db(role).query(`SELECT * FROM requestforgoodsmiddlekeykeeper WHERE request_for_goods = $1 AND barcode = $2`, [req.params.request_for_goods, req.params.barcode]);
      res.json(record.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateRecordById(req, res) {
    const { request_for_goods, barcode, amount, role } = req.body;
    try {
      const updatedRecord = await db(role).query(
        `UPDATE requestforgoodsmiddlekeykeeper SET amount = $1 WHERE request_for_goods = $2 AND barcode = $3 RETURNING *`,
        [amount, request_for_goods, barcode]
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
        `DELETE FROM requestforgoodsmiddlekeykeeper WHERE request_for_goods = $1 AND barcode = $2 RETURNING *`,
        [req.params.request_for_goods, req.params.barcode]
      );
      res.json(deletedRecord.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new RequestForGoodsMiddleKeyKeeperController();
