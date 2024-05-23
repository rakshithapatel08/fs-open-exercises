const { test, describe } = require("node:test")
const assert = require("node:assert")
const { dummy }= require("../utils/list_helper")
// or list_helper.dummy()

describe("testing dummy function",()=>{
    test("dummy returns one",()=>{
        const blogs = []
        const result = dummy(blogs)

        assert.strictEqual(result,1)
    })
})