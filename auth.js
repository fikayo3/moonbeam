const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    const token = req.header('x-auth-token');
  if(!token) {
    res.status(401).json({ msg: "Invalid token. Access Denied"});
    return;
  }

  try {
    const decoded = jwt.verify(JSON.parse(token), 'secret');
    req.emailaddress = decoded.emailaddress;
    next();
  } catch (exception) {
    return res.status(400).json({msg: 'Token is not valid.'});
  }
}

module.exports = auth