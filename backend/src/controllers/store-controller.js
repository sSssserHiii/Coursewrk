const db = require('../services/db');

class StoreController {
  async createStore(req, res) {
    const { adress, full_name_of_contact_face, contact_number, role } = req.body;
    try {
      const newStore = await db(role).query(
        `INSERT INTO store (adress, full_name_of_contact_face, contact_number) VALUES ($1, $2, $3) RETURNING *`,
        [adress, full_name_of_contact_face, contact_number]
      );
      res.status(201).json(newStore.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getStores(req, res) {
    const { role } = req.body;
    try {
      const stores = await db(role).query(`SELECT * FROM store`);
      res.json(stores.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async getStoreById(req, res) {
    const { role } = req.body;
    try {
      const store = await db(role).query(`SELECT * FROM store WHERE store_id = $1`, [req.params.id]);
      res.json(store.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async updateStoreById(req, res) {
    const { adress, full_name_of_contact_face, contact_number, role } = req.body;
    try {
      const updatedStore = await db(role).query(
        `UPDATE store SET adress = $1, full_name_of_contact_face = $2, contact_number = $3 WHERE store_id = $4 RETURNING *`,
        [adress, full_name_of_contact_face, contact_number, req.params.id]
      );
      res.json(updatedStore.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }

  async deleteStoreById(req, res) {
    const { role } = req.body;
    try {
      const deletedStore = await db(role).query(
        `DELETE FROM store WHERE store_id = $1 RETURNING *`,
        [req.params.id]
      );
      res.json(deletedStore.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new StoreController();
