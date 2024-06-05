const db = require('../services/db');

class ReportToSendINTheStoreController {
  async createReport(req, res) {
    const { store_id, employee_id, report_date, report_status, role } = req.body;
    try {
      const newReport = await db(role).query(
        `INSERT INTO reporttosendinthestore (store_id, employee_id, report_date, report_status) VALUES ($1, $2, $3, $4) RETURNING *`,
        [store_id, employee_id, report_date, report_status]
      );
      res.status(201).json(newReport.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getReports(req, res) {
    const { role } = req.body;
    try {
      const reports = await db(role).query(`SELECT * FROM reporttosendinthestore`);
      res.json(reports.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getReportById(req, res) {
    const { role } = req.body;
    const { id } = req.params;
    try {
      const report = await db(role).query(
        `SELECT * FROM reporttosendinthestore WHERE report_to_send_in_the_store_id = $1`,
        [id]
      );
      res.json(report.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateReportById(req, res) {
    const { store_id, employee_id, report_date, report_status, role } = req.body;
    const { id } = req.params;
    try {
      const updatedReport = await db(role).query(
        `UPDATE reporttosendinthestore SET store_id = $1, employee_id = $2, report_date = $3, report_status = $4 WHERE report_to_send_in_the_store_id = $5 RETURNING *`,
        [store_id, employee_id, report_date, report_status, id]
      );
      res.json(updatedReport.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteReportById(req, res) {
    const { role } = req.body;
    const { id } = req.params;
    try {
      const deletedReport = await db(role).query(
        `DELETE FROM reporttosendinthestore WHERE report_to_send_in_the_store_id = $1 RETURNING *`,
        [id]
      );
      res.json(deletedReport.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new ReportToSendINTheStoreController();
