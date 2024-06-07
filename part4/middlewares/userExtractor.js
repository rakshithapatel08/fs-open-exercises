const middleware = require("./tokenExtractor")
const jwt = require("jsonwebtoken")

const userExtractor = (req,res,next)=>{
    middleware.tokenExtractor()
    if(!req.token){
        req.user = null
    }
    else{
        const decodedToken = jwt.verify(req.token,process.env.SECRET)
        req.user = decodedToken
    }
    next()
}

module.exports = {userExtractor}