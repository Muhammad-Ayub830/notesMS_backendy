const express = require("express")
const UserRegister = require("../models/user.model")
const bcrypt  = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")
const AuthMiddleWare = require("../controllers/authmdiileware")
router.post("/register", async(req,res)=>{
    try {
        const  {name,email,password} = req.body
        const hashpassword = await bcrypt.hash(password,10)
        const checkUser = await UserRegister.findOne({email:email})
        if(!checkUser){
         const newuser = await UserRegister.create({
            username : name,
            email,
            password : hashpassword
        })
        const token = jwt.sign(
            {id:newuser._id,
                email: newuser.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "1d"
            }
        )
        res.cookie("token",token)
       res.status(200).json({message:"Signup Successfully!", redirect:"/home"})
        }
        if(checkUser){
             res.status(400).json({message:"user exists"})
        }
       

       
    } catch (error) {
        console.log(error)
        res.send("failed to register")
    }
})
router.post('/login',async (req,res)=>{
    try {
        const {email,password} = req.body
     const matchemail = await UserRegister.findOne({email:email})
     if(!matchemail){
       return res.status(400).json({ message: "Invalid email or password" })
     }
     const mathcpass = await bcrypt.compare(password,matchemail.password)
     if(!mathcpass){
         return res.status(400).json({ message: "Invalid email or password" })
     }else{
        
        const token = jwt.sign({
            id: matchemail._id,
            username : matchemail.username
        },process.env.SECRET_KEY,{
            expiresIn : "1d"
        })
        res.cookie("token",token)
        res.status(200).json({message:"logged in",redirect:'/home'})
     }

    } catch (error) {
        
    }
})
router.post('/logout',AuthMiddleWare,(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({message:"logged out"})
})
module.exports = router