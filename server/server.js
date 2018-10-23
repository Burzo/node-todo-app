var express = require("express")
var bodyParser = require("body-parser")
const {ObjectID} = require("mongodb")

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo")
var {User} = require("./models/todo")

var app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save()
    .then(
        (doc) => {res.send(doc)},
        (e) => {res.status(400).send(e)}
        )
})

app.get("/todos", (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get("/todos/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }
    Todo.findById(req.params.id)
    .then(todo => {
        if (!todo) {
            return res.status(404).send("ni usera, id je prou") 
        }
        res.send({todo})
    })
    .catch(e => {res.status(400).send()})
})

app.delete("/todos/:id", (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send()
    }
    Todo.findByIdAndDelete(req.params.id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        return res.send(todo)
    }).catch(e => {res.status(400).send()})
})

app.listen(port, () => {
    console.log(`--------Started on port ${port}--------`)
})

module.exports = {app}