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
}

module.exports = new ProductController();
