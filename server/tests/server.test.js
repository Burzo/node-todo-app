const expect = require("expect")
const request = require("supertest")
const {ObjectID} = require("mongodb")

const {app} = require("./../server.js")
const {Todo} = require("./../models/todo")

const todos = [{
    _id: new ObjectID(),
    text: "First test todo"
}, {
    _id: new ObjectID(),
    text: "Second test todo"
}]

//Insert new Todos and delete old ones.
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
})

// describe("POST /todos", () => {
//     it("should create a new todo", (done) => {
//         var text = "Test todo text"

//         request(app)
//         .post("/todos")
//         .send({text})
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.text).toBe(text);
//         })
//         .end((err, res) => {
//             if (err) {
//                 return done(err)
//             }
//             Todo.find().then((todos) => {
//                 expect(todos.length).toBe(1)
//                 expect(todos[0].text).toBe(text)
//                 done()
//             }).catch((err) => done(err))
//         })
//     })
// })

describe("GET /todos/:id", () => {
    it("should return todo document", done => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    })
    it("should return a 404 if todo not found", (done) => {
        // make request with real object id with tohexstring
        //make sure status code is 404
        var ranID = new ObjectID()
        request(app)
        .get(`/todos/${ranID.toHexString()}`)
        .expect(404)
        .end(done)
    })
    it("should return 404 for non object ids", (done) => {
        // /todos/123
        // 404 code
        request(app)
        .get("/todos/2hr39") //just random query string for testing purpose
        .expect(404)
        .end(done)
    })
})

describe("DELETE /todos/:id", () => {
    it("should remove a todo", (done) => {
        var ranID = todos[1]._id.toHexString()

        request(app)
        .delete(`/todos/${ranID}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(ranID)
        })
        .end((err, res) => {
            if(err) {
                return done(err)
            }
            Todo.findOne(ranID).then(todo => {
                expect(todo).toNotExist()
                done()
            }).catch(e => done(err))
        })
    })
    it("should return 404 if todo not found", (done) => {
        var ranID = new ObjectID()
        request(app)
        .delete(`/todos/${ranID.toHexString()}`)
        .expect(404)
        .end(done)
    })
    it("should return 404 if object id is invalid", done => {
        var ranID = new ObjectID()
        request(app)
        .get(`/todos/${ranID.toHexString()}`)
        .expect(404)
        .end(done)
    })
})