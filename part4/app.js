const express = require("express")
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")

const app = express()

app.use(express.json())
app.use("/api/blogs",blogRouter)
app.use("/api/users",userRouter)

module.exports = app;