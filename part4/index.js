const app = require("./app")
const config = require("./utils/config")
const logger = require("./utils/logger")

app.get("/",(req,res) => {
    res.send("blog application backend")
})

const PORT = config.PORT || 3003
app.listen(PORT,()=>{
    logger.info(`server running successfully at ${PORT}`)
})