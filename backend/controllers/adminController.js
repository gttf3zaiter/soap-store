const jwt = require("jsonwebtoken");


const loginAdmin = (req, res) => {

  try {

    const { password } = req.body;


    const passwordMatch =
      password === process.env.ADMIN_PASSWORD;


    if (!passwordMatch) {

      return res.status(401).json({
        message: "Wrong password"
      });

    }


    const token = jwt.sign(
      {
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );


    res.json({

      message: "Login successful",

      token

    });


  } catch(error) {

    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );


    res.status(500).json({

      message: "Login failed"

    });

  }

};



module.exports = {
  loginAdmin
};