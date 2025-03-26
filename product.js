const express = require("express");
const fetchProduct = require("../amazonAPI");
const router = express.Router();

router.get("/amazon/:asin", async (req, res) => {
    const { asin } = req.params;
    const productData = await fetchProduct(asin);

    if (productData) {
        res.json(productData);
    } else {
        res.status(500).json({ error: "Failed to fetch product data" });
    }
});

module.exports = router;