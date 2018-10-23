var express = require("express")
var bodyParser = require("body-parser")
const {ObjectID} = require("mongodb")

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo")
var {User} = require("./models/todo")

var app = express()

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
//WRONG ID 5bcd0a2e94f34532a0ca3563
//CORECT ID 5bcc8a12d79474249cffc0bb

app.listen(3000, () => {
    console.log("--------Started on port 3000--------")
})

module.exports = {app}