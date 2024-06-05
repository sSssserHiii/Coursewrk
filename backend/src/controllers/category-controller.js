const db = require('../services/db');

class CategoryController {
    async createCategory(req, res) {
        const { title } = req.body;
        try {
            const newCategory = await db(req.body.role).query(
                `INSERT INTO category (title) VALUES ($1) RETURNING *`,
                [title]
            );
            res.status(201).json(newCategory.rows[0]);
        } catch (err) {
            console.error(err);
            if (err.code == 23505) // duplicate key error
                return res.status(409).json({ error: `${err.detail}` });
            else return res.status(400).json({ error: "bad request" });
        }
    }

    async getCategories(req, res) {
        try {
            const categories = await db(req.body.role).query(`SELECT * FROM category`);
            res.json(categories.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async getCategoryById(req, res) {
        try {
            const { id } = req.params;
            const category = await db(req.body.role).query(`SELECT * FROM category WHERE category_id = $1`, [id]);
            if (category.rows.length === 0) return res.status(404).json({ error: "Category not found" });
            res.json(category.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async updateCategoryById(req, res) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const updatedCategory = await db(req.body.role).query(
                `UPDATE category SET title = $1 WHERE category_id = $2 RETURNING *`,
                [title, id]
            );
            if (updatedCategory.rows.length === 0) return res.status(404).json({ error: "Category not found" });
            res.json(updatedCategory.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async deleteCategoryById(req, res) {
        try {
            const { id } = req.params;
            const deletedCategory = await db(req.body.role).query(`DELETE FROM category WHERE category_id = $1 RETURNING *`, [id]);
            if (deletedCategory.rows.length === 0) return res.status(404).json({ error: "Category not found" });
            res.json(deletedCategory.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }
}

module.exports = new CategoryController();
