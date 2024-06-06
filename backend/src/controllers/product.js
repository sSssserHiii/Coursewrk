const db = require('../services/db');

class ProductController {
    async createProduct(req, res) {
        const { provider, title, manufacturer, category, dimensions, amount, date_of_registration, role } = req.body;
        try {
            const newProduct = await db(role).query(
                `INSERT INTO product (provider, title, manufacturer, category, dimensions, amount, date_of_registration) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [provider, title, manufacturer, category, dimensions, amount, date_of_registration]
            );
            res.status(201).json(newProduct.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async getProducts(req, res) {
        const { role } = req.body;
        try {
            const products = await db(role).query(`SELECT * FROM product`);
            res.json(products.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async getProductById(req, res) {
        const { role } = req.body;
        const { id } = req.params;
        try {
            const product = await db(role).query(`SELECT * FROM product WHERE barcode = $1`, [id]);
            if (product.rows.length === 0) return res.status(404).json({ error: "Product not found" });
            res.json(product.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async updateProductById(req, res) {
        const { role } = req.body;
        const { id } = req.params;
        const { provider, title, manufacturer, category, dimensions, amount, date_of_registration } = req.body;
        try {
            const updatedProduct = await db(role).query(
                `UPDATE product SET provider = $1, title = $2, manufacturer = $3, category = $4, dimensions = $5, amount = $6, date_of_registration = $7 WHERE barcode = $8 RETURNING *`,
                [provider, title, manufacturer, category, dimensions, amount, date_of_registration, id]
            );
            if (updatedProduct.rows.length === 0) return res.status(404).json({ error: "Product not found" });
            res.json(updatedProduct.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async deleteProductById(req, res) {
        const { role } = req.body;
        const { id } = req.params;
        try {
            const deletedProduct = await db(role).query(`DELETE FROM product WHERE barcode = $1 RETURNING *`, [id]);
            if (deletedProduct.rows.length === 0) return res.status(404).json({ error: "Product not found" });
            res.json(deletedProduct.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    async getProductsByTypeLastWeek(req, res) {
        const { role, type } = req.body;
        try {
            const products = await db(role).query(
                `SELECT pp.*, cc.title 
                FROM product pp 
                JOIN category cc ON cc.category_id = pp.category 
                WHERE cc.title = $1 
                AND pp.date_of_registration >= (now() - interval '1 week')::date`,
                [type]
            );
            res.json(products.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    // Новый метод для получения суммарного количества товаров, завезенных на склад в прошлом месяце
    async getTotalProductsLastMonth(req, res) {
        const { role } = req.body;
        try {
            const result = await db(role).query(
                `SELECT sum(amount) as total 
                FROM product 
                WHERE date_of_registration >= (now() - interval '1 month')::date`
            );
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "internal server error" });
        }
    }

    // Новый метод для получения средней количества товаров каждого типа
    async getAverageProductAmount(req, res) {
        const { role } = req.body;
        try {
            const result = await db(role).query(
                `SELECT category, avg(amount) as average_amount 
                FROM product 
                GROUP BY category`
            );
            res.json(result.rows);
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

module.exports = new ProductController();
