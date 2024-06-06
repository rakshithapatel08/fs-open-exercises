const express = require("express")
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./middlewares/tokenExtractor")

const app = express()

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use("/api/blogs",blogRouter)
app.use("/api/users",userRouter)
app.use("/api/login",loginRouter)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
      return response.status(400).json({ error: 'expected `username` to be unique' })
  
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid' })
    }
  
    next(error)
  }

app.use(errorHandler)

module.exports = app;