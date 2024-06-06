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

async getProvidersWithSingleProduct(req, res) {
    const { role } = req.body;
    try {
        const providers = await db(role).query(
            `SELECT pp.provider_id, pp.login_password, pp.company, pp.full_name_of_contact_face, pp.e_mail 
            FROM provider pp 
            JOIN product pr ON pp.provider_id = pr.provider 
            GROUP BY pp.provider_id, pp.login_password, pp.company, pp.full_name_of_contact_face, pp.e_mail 
            HAVING COUNT(pr.provider) = 1`
        );
        res.json(providers.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
}

// Новый метод для получения информации о товарах одного и того же поставщика с одинаковым количеством
async getProductsByProviderWithSameAmount(req, res) {
    const { role, providerId } = req.body;
    try {
        const products = await db(role).query(
            `SELECT pp.amount, COUNT(*) AS cnt, pp.provider, pp.manufacturer 
            FROM product pp 
            WHERE pp.provider = $1 
            GROUP BY pp.amount, pp.provider, pp.manufacturer 
            HAVING COUNT(*) > 1 AND pp.amount >= 30`,
            [providerId]
        );
        res.json(products.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "internal server error" });
    }
  } 



}




module.exports = new ProviderController();