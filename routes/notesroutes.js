const express = require("express")
const AuthMiddleWare = require("../controllers/authmdiileware")
const createnote = require("../models/notes.model")
const router = express.Router()
router.post('/createnote',AuthMiddleWare,async(req,res)=>{
    const {title,detail} = req.body
    try {
        const newnote = await createnote.create({
            title,
            detail,
            creator: req.user
        })
        console.log(newnote)
        res.status(200).json({message:"new note is added"})
    } catch (error) {
        res.status(400).json({error})
    }
})
router.get('/all-notes',AuthMiddleWare, async(req,res)=>{
    try {
        const notes = await createnote.find({creator: req.user})
        res.json(notes)
    } catch (error) {
        console.log(error)
    }
})
router.post('/delete-note',AuthMiddleWare,async (req,res)=>{
    try {
        const {id} = req.body
        const resutl = await createnote.findByIdAndDelete(id)
        res.status(200).json({message:"deleted"})
    } catch (error) {
        res.status(404).json({message:error})
    }
})
router.post('/edit-note',AuthMiddleWare,async(req,res)=>{
    try {
        const {title,detail,edit_note} = req.body
        const updatedNote= await createnote.findByIdAndUpdate(
            edit_note,{title,detail},{new:true}
        )
        
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
})
const noterouter = router
module.exports = noterouter