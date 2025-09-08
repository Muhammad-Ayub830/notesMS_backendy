const jwt = require("jsonwebtoken")
const AuthMiddleWare = (req,res,next)=>{
    const token =  req.cookies.token
    if(!token){
       return res.status(400).json({message:"login please"})
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user = decoded.id
        next()
    } catch (error) {
        res.send("error")
    }
}
module.exports = AuthMiddleWare