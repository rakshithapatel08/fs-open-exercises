const { test, after, beforeEach } = require("node:test")
const supertest = require("supertest")
const assert = require("node:assert")
const app = require("../app")
const mongoose = require("mongoose")
const BlogTest = require("../testdb")

const api = supertest(app)

const initialBlogs = [
    {
        title:"HTML is easy",
        author:"ABC",
        url:"hduwhdajsnxsjansa",
        likes:3
    },
    {
        title:"Testing with supertest is cool",
        author:"DEF",
        url:"hjdwujdiajxoaskxla",
        likes:5
    },
  ]
  
  beforeEach(async () => {
    await BlogTest.deleteMany({})
    let blogObject = new BlogTest(initialBlogs[0])
    await blogObject.save()
    blogObject = new BlogTest(initialBlogs[1])
    await blogObject.save()
  })

test("blogs are returned as json",async()=>{
    await api.get("/api/blogs")
    .expect(200)
    .expect("Content-Type",/application\/json/)
})

test("there are two blogs",async()=>{
    const response = await api.get("/api/blogs")

    assert.strictEqual(response.body.length,2)
})

test('the first note is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(e => e.title)
    assert.strictEqual(contents.includes('HTML is easy'), true)
  })

test("format of the unique identifier is checked",async ()=>{
    const response = await api.get("/api/blogs")
     .expect(200)
     .expect("Content-Type",/application\/json/)
     
     assert(response.body[0].id)
})

test("post request is creating a new blog",async()=>{
    let newBlog = {
        title:"React is popular JS library",
        author:"GHI",
        url:"wadwaqdxnajsxnas",
        likes:4
    }

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"

   await api.post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: token })
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get("/api/blogs")

    const title = response.body.map((t)=>t.title)

    assert.strictEqual(response.body.length,initialBlogs.length+1)

    assert(title.includes("React is popular JS library"))
})

test("blog without likes is treated as zero likes",async()=>{
    let newBlog = {
        title:"Web development is crazy",
        author:"GHI",
        url:"wadwaqdxnajsxnas",
    }

     const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"
   await api.post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: token })
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get("/api/blogs")

    assert.strictEqual(response.body.length,initialBlogs.length+1)

    assert.strictEqual(response.body[response.body.length-1].likes,0)
})

test("blog without title or url is not added",async()=>{
    let newBlog = {
        author:"GHI",
        url:"wadwaqdxnajsxnas",
    }
   const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"
   await api.post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: token })
    .expect(400)

    const response = await api.get("/api/blogs")

    assert.strictEqual(response.body.length,initialBlogs.length)
})

test("a blog can be deleted",async()=>{
    const blogsAtStart = await api.get("/api/blogs")
    const blogToDelete = blogsAtStart.body[0]

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ"
    await
    api.delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: token })
    .expect(204)

    const blogsAtEnd = await api.get("/api/blogs")

    const titles = blogsAtEnd.body.map((t)=>t.title)
    assert.strictEqual(blogsAtStart.body.length-1,blogsAtEnd.body.length)
    assert(!titles.includes(blogToDelete.title))
})

test("the likes of the blogs are updated",async()=>{
    const blogsAtStart = await api.get("/api/blogs")
    const blogToUpdate = blogsAtStart.body[0]

    const updatedBlog = {
        ...blogToUpdate,likes:10
    }

    await
    api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

    const blogsAtEnd = await api.get("/api/blogs")
    
    assert.strictEqual(blogsAtStart.body.length,blogsAtEnd.body.length)
    assert.deepStrictEqual(blogsAtEnd.body[0],updatedBlog)
})

test.only("post request is creating a new blog fails without a token",async()=>{
    let newBlog = {
        title:"React is popular JS library",
        author:"GHI",
        url:"wadwaqdxnajsxnas",
        likes:4
    }   

   await api.post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

    const response = await api.get("/api/blogs")

    const title = response.body.map((t)=>t.title)

    assert.strictEqual(response.body.length,initialBlogs.length)

    assert(!title.includes("React is popular JS library"))
})

after(()=>{
    mongoose.connection.close()
})