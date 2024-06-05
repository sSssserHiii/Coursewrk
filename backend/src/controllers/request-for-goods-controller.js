const db = require('../services/db');

class RequestForGoodsController {
  async createRequest(req, res) {
    const { employee_id, provider_id, request_date, role } = req.body;
    try {
      const newRequest = await db(role).query(
        `INSERT INTO requestforgoods (employee_id, provider_id, request_date) VALUES ($1, $2, $3) RETURNING *`,
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
      const requests = await db(role).query(`SELECT * FROM requestforgoods`);
      res.json(requests.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRequestById(req, res) {
    const { role } = req.body;
    const { id } = req.params;
    try {
      const request = await db(role).query(
        `SELECT * FROM requestforgoods WHERE request_for_goods_id = $1`,
        [id]
      );
      res.json(request.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateRequestById(req, res) {
    const { employee_id, provider_id, request_date, role } = req.body;
    const { id } = req.params;
    try {
      const updatedRequest = await db(role).query(
        `UPDATE requestforgoods SET employee_id = $1, provider_id = $2, request_date = $3 WHERE request_for_goods_id = $4 RETURNING *`,
        [employee_id, provider_id, request_date, id]
      );
      res.json(updatedRequest.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteRequestById(req, res) {
    const { role } = req.body;
    const { id } = req.params;
    try {
      const deletedRequest = await db(role).query(
        `DELETE FROM requestforgoods WHERE request_for_goods_id = $1 RETURNING *`,
        [id]
      );
      res.json(deletedRequest.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new RequestForGoodsController();
