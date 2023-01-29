const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
  const token = req.header('auth-token')
  if(!token){
    return res.status(404).send('you cant access')
  }
  try{
      const decodetoken = jwt.verify(token , 'privateKey')
      req.user = decodetoken
      next()
  }catch(err){
    return res.status(404).send('wrong token...'+ err.message)
  }
}