const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/userRoutes")
const { taskRouter } = require("./routes/taskRoute")
require("dotenv").config()
const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use("/task",taskRouter)

app.get("/",(req,res)=>{
    res.send({
        message:"Hooray😀😀!!, The Server has been Started"
    })
})

app.listen(port,async()=>{
    try {
        await connection
        console.log('Database Is Connected')
    } catch (error) {
        console.log(error)
    }

    console.log(`Server is running on Port Number ${port}`)
})