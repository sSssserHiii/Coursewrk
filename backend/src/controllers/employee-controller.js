
const { request } = require('express');
const db =  require('../services/db')

class EmployeeController{

   
    async postEmployee(req, res){
        console.log(req);

        const { employee_full_name, login_password } = req.body;
        try {
          const newEmployee = await db(req.body.role).query(
            `insert into employeeuser( employee_full_name, login_password) values ($1, $2) returning *`,
            [ employee_full_name, login_password]
          );
          res.status(201).json(newEmployee);
        } catch (err) {
            console.error(err);
          if (err.code == 23505)
            return res.status(409).json({ error: `${err.detail}` });
          // duplicate
          else return res.status(400).json({ error: "bad request" }); // bad request
        }
    }
   


    async getEmployes(req, res)
    {
        console.log(req);

        const allUsers = await db(req.body.role).query(`select * from employeeuser`);
        res.json(allUsers);
        
    }

    async getEmployeeByID(req, res) {
        console.log(req);

        const singleEmployee = await db(req.body.role).query(
          `select * from employeeuser where employeeuser.employee_id = $1`,
          [req.body.employee_id]
        );
        res.json(singleEmployee);
      }

      async getEmployeeByUsername(req, res) {
        console.log(req);

        const singleEmployee = await db(req.body.role).query(
          `select * from employeeuser where employeeuser.employee_full_name = $1`,
          [req.body.employee_full_name]
        );
        res.json(singleEmployee);
      }

      async deleteEmployeeByID(req, res) {
        const response = await db(req.body.role).query(
          `with deleted_users as (
          delete from employeeuser
          where employee_id = $1 returning *)
          select * from deleted_users;
          `,
          [req.params.id]
        );
        res.json(response);
      }
      async getEmployeeRankings(req, res) {
        const { role } = req.body;
        try {
            const result = await db(role).query(
                `SELECT DISTINCT e.employee_id, e.employee_name, e.surname,
                COUNT(w.employee_id) AS wcount, 
                DENSE_RANK() OVER (ORDER BY COUNT(w.employee_id) DESC) AS "totalwriteoffrank",
                SUM(wm.amount) AS isum2, 
                RANK() OVER (ORDER BY SUM(wm.amount) DESC) AS "totalreturnrank"
                FROM employeeuser AS e
                INNER JOIN writeoffgoods AS w ON w.employee_id = e.employee_id
                INNER JOIN writeoffmiddlevalue AS wm ON wm.write_off = w.write_off_id 
                WHERE 2022 = EXTRACT(YEAR FROM CURRENT_DATE)
                GROUP BY e.employee_id`
            );
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }
    async getProductsNotReceivedThisMonth(req, res) {
      const { role } = req.body;
      try {
          const products = await db(role).query(
              `SELECT DISTINCT p.title, p.manufacturer, p.date_of_registration
              FROM product p
              WHERE p.manufacturer IN (
                  SELECT DISTINCT p.manufacturer
                  FROM product p
                  WHERE EXTRACT(MONTH FROM p.date_of_registration) != EXTRACT(MONTH FROM CURRENT_DATE)
                  AND p.date_of_registration >= (NOW() - INTERVAL '2 MONTH')::DATE
              )`
          );
          res.json(products.rows);
      } catch (err) {
          console.error(err);
          res.status(500).json({ error: "internal server error" });
      }
  }
}


module.exports = new EmployeeController();