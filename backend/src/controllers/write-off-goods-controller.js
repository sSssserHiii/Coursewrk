const db = require('../services/db');

class WriteOffGoodsController {
  async createWriteOffGoods(req, res) {
    const { employee_id, write_off_date, role } = req.body;
    try {
      const newWriteOffGoods = await db(role).query(
        `INSERT INTO WriteOffGoods (employee_id, write_off_date) VALUES ($1, $2) RETURNING *`,
        [employee_id, write_off_date]
      );
      res.status(201).json(newWriteOffGoods.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getWriteOffGoods(req, res) {
    const { role } = req.body;
    try {
      const writeOffGoods = await db(role).query(`SELECT * FROM WriteOffGoods`);
      res.json(writeOffGoods.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getWriteOffGoodsById(req, res) {
    const { role } = req.body;
    try {
      const writeOffGoods = await db(role).query(`SELECT * FROM WriteOffGoods WHERE write_off_id = $1`, [req.params.id]);
      res.json(writeOffGoods.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateWriteOffGoodsById(req, res) {
    const { employee_id, write_off_date, role } = req.body;
    try {
      const updatedWriteOffGoods = await db(role).query(
        `UPDATE WriteOffGoods SET employee_id = $1, write_off_date = $2 WHERE write_off_id = $3 RETURNING *`,
        [employee_id, write_off_date, req.params.id]
      );
      res.json(updatedWriteOffGoods.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteWriteOffGoodsById(req, res) {
    const { role } = req.body;
    try {
      const deletedWriteOffGoods = await db(role).query(
        `DELETE FROM WriteOffGoods WHERE write_off_id = $1 RETURNING *`,
        [req.params.id]
      );
      res.json(deletedWriteOffGoods.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new WriteOffGoodsController();
