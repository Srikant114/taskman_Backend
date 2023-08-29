const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authUser } = require("../middlewares/authUser");
const {TaskModel} = require("../models/taksModel")
const jwtSecret = process.env.JWT_SECRET;

const taskRouter = express.Router();
taskRouter.use(authUser)

// Getting all Task

taskRouter.get("/",async(req,res)=>{
    let token= req.headers.authorization
   jwt.verify(token,jwtSecret,async(err,decode)=>{
        try {
            let data = await TaskModel.find({ user:decode.userId })
            res.send({
                data:data,
                message:"Success",
                status:1
            })
        } catch (error) {
            res.send({
                message:error.message,
                status:0
            })
        }
    })
})

// Adding a new Task

taskRouter.post("/create",async(req,res)=>{
    try {
        let task = new TaskModel(req.body)
        await task.save()
        res.send({
            message:"Task Added",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})

// Updating a task

taskRouter.patch("/",async(req,res)=>{
    let {id}=req.headers
    try {
        await TaskModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message:"Task Updated",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
    
})

// Deleting A Task

taskRouter.delete("/",async(req,res)=>{
    let {id}=req.headers
    try {
        await TaskModel.findByIdAndDelete({_id:id})
        res.send({
            message:"Task Deleted",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
    
})


module.exports={
    taskRouter
}
