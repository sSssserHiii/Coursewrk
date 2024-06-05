const db = require('../services/db');

class RequestFromEmployeeToReturnGoodsController {
  async createRequest(req, res) {
    const { employee_id, request_date, role } = req.body;
    try {
      const newRequest = await db(role).query(
        `INSERT INTO RequestFromEmployeeToReturnGoods (employee_id, request_date) VALUES ($1, $2) RETURNING *`,
        [employee_id, request_date]
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
      const requests = await db(role).query(`SELECT * FROM RequestFromEmployeeToReturnGoods`);
      res.json(requests.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getRequestById(req, res) {
    const { role } = req.body;
    try {
      const request = await db(role).query(`SELECT * FROM RequestFromEmployeeToReturnGoods WHERE request_from_employee_to_return_goods_id = $1`, [req.params.id]);
      res.json(request.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateRequestById(req, res) {
    const { employee_id, request_date, role } = req.body;
    try {
      const updatedRequest = await db(role).query(
        `UPDATE RequestFromEmployeeToReturnGoods SET employee_id = $1, request_date = $2 WHERE request_from_employee_to_return_goods_id = $3 RETURNING *`,
        [employee_id, request_date, req.params.id]
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
        `DELETE FROM RequestFromEmployeeToReturnGoods WHERE request_from_employee_to_return_goods_id = $1 RETURNING *`,
        [req.params.id]
      );
      res.json(deletedRequest.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new RequestFromEmployeeToReturnGoodsController();
