const { test, after, beforeEach } = require("node:test")
const supertest = require("supertest")
const assert = require("node:assert")
const app = require("../app")
const mongoose = require("mongoose")
const Users = require("../models/user")

const api = supertest(app)

test.only("invalid user is not created",async()=>{
    const usersAtStart = (await api.get("/api/users")).body

    await api.post("/api/users")
    .send({username:"rakshitha",name:"rakshitha"})
    .expect(400)

    const usersAtEnd = (await api.get("/api/users")).body

    assert.strictEqual(usersAtStart.length,usersAtEnd.length)
})

after(()=>{
    mongoose.connection.close()
})
