const { test, describe } = require("node:test")
const assert = require("node:assert")
const { totalLikes } = require("../utils/list_helper")

describe("totalLikes",()=>{
    const listWithOneBlog =  [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
      ]

    const listofBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 4,
            __v: 0
          },
          {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 3,
            __v: 0
          },
        
    ]
    test("of empty list is zero",()=>{
        const result = totalLikes([])
        assert.strictEqual(result,0)
    })

    test("of list with one blog equals to likes of that blog",()=>{
        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result,5)
    })

    test("of list with many blogs is calculated as expected",()=>{
        const result = totalLikes(listofBlogs)
        assert.strictEqual(result,12)
    })
})