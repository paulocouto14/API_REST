const jwt = require('jsonwebtoken');



const chktoken = (req, res, next) => {
  const jwtcookies = req.cookies.jwt
  if(!jwtcookies){
    res.redirect('/')
  }
  else if(jwtcookies){
    console.log('acertou o jwt')
    const decoded = jwt.verify(jwtcookies, process.env.SECRET_JWT);
    req.user = decoded;
    next();
  }
  
}


module.exports = chktoken