const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {

  let privateURLS = [
    {url: '/api/auth/', method: 'POST'}
  ]

  let isPrivate = false;

  for(var i = 0; i < privateURLS.length; i++) {
    const {url, method} = privateURLS[i];
    if(req.url.includes(url) && req.method === method){
      isPrivate = true;
      break;
    }
  }

  if(isPrivate) {
    next();
    return;
  }

  const token = req.header('x-auth-token');
  if(!token) {
    res.status(401).json({ msg: "Invalid token. Access Denied"});
    return;
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    req.emailaddress = decoded.emailaddress;
    next();
  } catch (exception) {
    return res.status(400).json({msg: 'Token is not valid.'});
  }
}

module.exports = auth 