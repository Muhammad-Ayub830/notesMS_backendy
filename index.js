const express = require("express")
const server = express();
const dotenv = require("dotenv")
const cors = require("cors")
const ConnectDataBase = require("./db/connectdb")
const authRouter = require("./routes/auth");
const AuthMiddleWare = require("./controllers/authmdiileware");
const UserRegister = require("./models/user.model");
dotenv.config()
server.use(cors({
    origin: 'https://notesmsbackendy-production.up.railway.app/',
    credentials:true
}))
const cookieParser = require("cookie-parser");
const noterouter = require("./routes/notesroutes");
server.use(cookieParser());

server.get('/home',AuthMiddleWare, async(req,res)=>{
    try {
         const user = await UserRegister.findById(req.user).select("-password")
    res.json(user)
    } catch (error) {
       res.send("server error") 
    }
   
})
server.use(express.json())
server.use(express.urlencoded({extended:true}))
ConnectDataBase(),
server.use('/user',authRouter)
server.use('/user',noterouter)
const PORT = process.env.PORT || 9000
server.listen(PORT,()=>{
    console.log(`the server is running on port http://localhost:${PORT}`)
})