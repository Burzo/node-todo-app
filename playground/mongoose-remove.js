const {ObjectID} = require("mongodb")

const {mongoose} = require("./../server/db/mongoose")
const {Todo} = require("./../server/models/todo")
const {User} = require("./../server/models/user")

Todo.findOneAndRemove("5bce7ddb65e49c20b80e0b98").then(todo => {
    console.log(todo)
}).catch(e => {console.log(e)})