
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
 // update user by id (for admin)
//  async updateEmployeeById(req, res) {
//   const { new_full_name, new_password, user_id } = req.body; // Получаем данные из тела запроса
//   try {
//     const updated = await db(req.body.role).query(
//       `UPDATE employeeuser 
//        SET employee_full_name = $1, 
//            login_password = $2 
//        WHERE employee_id = $3
//        RETURNING *`,
//       [new_full_name, new_password, user_id]
//     );
//     res.json(updated.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

}


module.exports = new EmployeeController();