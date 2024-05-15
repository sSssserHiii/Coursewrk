const { request } = require('express');
const db =  require('../services/db')


class ProviderController{

    async postProvider(req, res){
        console.log(req);

        const { login_password, company,full_name_of_contact_face, email } = req.body;
        try {
          const newProvider = await db(req.body.role).query(
            `insert into provider( login_password, company,full_name_of_contact_face, e_mail) values ($1, $2, $3, $4) returning *`,
            [ login_password, company,full_name_of_contact_face, email]
          );
          res.status(201).json(newProvider);
        } catch (err) {
            console.error(err);
          if (err.code == 23505)
            return res.status(409).json({ error: `${err.detail}` });
          // duplicate
          else return res.status(400).json({ error: "bad request" }); // bad request
        }
    }


    async getProviders(req, res)
    {
        console.log(req);

        const allUsers = await db(req.body.role).query(`select * from provider`);
        res.json(allUsers);
        
    }


    async getProviderByID(req, res) {
        console.log(req);

        const singleProvider = await db(req.body.role).query(
          `select * from provider where provider.provider_id = $1`,
          [req.body.provider_id]
        );
        res.json(singleProvider);
      }

      async getProviderByUsername(req, res) {
        console.log(req);

        const singleProvider = await db(req.body.role).query(
          `select * from provider where provider.full_name_of_contact_face = $1`,
          [req.body.full_name]
        );
        res.json(singleProvider);
      }

      async deleteProviderByID(req, res) {
        const response = await db(req.body.role).query(
          `with deleted_providers as (
          delete from provider
          where provider_id = $1 returning *)
          select * from deleted_providers;
          `,
          [req.params.id]
        );
        res.json(response);
      }
 // update user by id (for admin)
 async updateProviderById(req, res) {
  const { new_password, company, new_full_name,email, user_id } = req.body; // Получаем данные из тела запроса
  try {
    const updated = await db(req.body.role).query(
      `UPDATE provider 
       SET login_password = $1,
       company = $2, 
       full_name_of_contact_face = $3, 
       e_mail = $4 
       WHERE provider_id = $5
       RETURNING *`,
      [new_password, company, new_full_name,email, user_id ]
    );
    res.json(updated.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


// {
//     "role": "administrator", 
//     "login_password": "GTYHT7tyetyrd",
//     "company": "EUdoks",
//     "full_name_of_contact_face" : "Thom Yorke",
//     "e_mail"  : "thomyorke@gmail.com",
//     "user_id" : 6
//   }
  

}

module.exports = new ProviderController();