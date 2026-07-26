const jwt = require("jsonwebtoken");


function auth(req, res, next) {

  const token = req.headers.authorization;


  if (!token) {

    return res.status(401).json({
      message: "Access denied"
    });

  }


  try {

    const cleanToken = token.replace("Bearer ", "");


    const decoded = jwt.verify(
      cleanToken,
      process.env.JWT_SECRET
    );


    req.admin = decoded;


    next();


  } catch(error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

}


module.exports = auth;