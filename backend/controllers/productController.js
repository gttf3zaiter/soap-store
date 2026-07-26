const pool = require("../db");


const getProducts = async (req, res) => {

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM products
      ORDER BY id
      `
    );


    res.json(result.rows);


  } catch (error) {

    console.error("GET PRODUCTS ERROR:", error);


    res.status(500).json({
      message: "Could not load products"
    });

  }

};



module.exports = {
  getProducts
};