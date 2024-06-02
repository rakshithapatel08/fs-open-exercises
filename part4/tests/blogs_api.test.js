const { test, after } = require("node:test")
const supertest = require("supertest")
const assert = require("node:assert")
const app = require("../app")
const mongoose = require("mongoose")

const api = supertest(app)

test.only("blogs are returned as json",async()=>{
    await api.get("/api/blogs")
    .expect(200)
    .expect("Content-Type",/application\/json/)
})

test.only("there are two blogs",async()=>{
    const response = await api.get("/api/blogs")

    assert.strictEqual(response.body.length,2)
})

test.only('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('HTML is easy'), true)
  })

after(()=>{
    mongoose.connection.close()
})