const tokenExtractor = (req,res,next)=>{
    //authentication function to get the token
    const authorization = req.get("authorization")
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        req.token = token
    }
    else{
        req.token = null
    }     

    next()
}

module.exports = {tokenExtractor}