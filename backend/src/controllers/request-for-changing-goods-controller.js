const db = require('../services/db');

class RequestForChangingGoodsController {
  async createRequest(req, res) {
    const { employee_id, provider_id, request_date, role } = req.body;
    try {
      const newRequest = await db(role).query(
        `INSERT INTO RequestForChangingGoods (employee_id, provider_id, request_date) VALUES ($1, $2, $3) RETURNING *`,
        [employee_id, provider_id, request_date]
      );
      res.status(201).json(newRequest.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRequests(req, res) {
    const { role } = req.body;
    try {
      const requests = await db(role).query(`SELECT * FROM RequestForChangingGoods`);
      res.json(requests.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRequestById(req, res) {
    const { role } = req.body;
    try {
      const request = await db(role).query(`SELECT * FROM RequestForChangingGoods WHERE request_for_changing_goods_id = $1`, [req.params.id]);
      res.json(request.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateRequestById(req, res) {
    const { employee_id, provider_id, request_date, role } = req.body;
    try {
      const updatedRequest = await db(role).query(
        `UPDATE RequestForChangingGoods SET employee_id = $1, provider_id = $2, request_date = $3 WHERE request_for_changing_goods_id = $4 RETURNING *`,
        [employee_id, provider_id, request_date, req.params.id]
      );
      res.json(updatedRequest.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteRequestById(req, res) {
    const { role } = req.body;
    try {
      const deletedRequest = await db(role).query(
        `DELETE FROM RequestForChangingGoods WHERE request_for_changing_goods_id = $1 RETURNING *`,
        [req.params.id]
      );
      res.json(deletedRequest.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new RequestForChangingGoodsController();
