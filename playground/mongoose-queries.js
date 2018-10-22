const {ObjectID} = require("mongodb")

const {mongoose} = require("./../server/db/mongoose")
const {Todo} = require("./../server/models/todo")
const {User} = require("./../server/models/user")

var id = "5bcc8a12d79474249cffc0bb"

if(!ObjectID.isValid(id)) {
    console.log("ID is not valid.")
} else {
    User.findById(id)
    .then((todo) => {
        if(!todo) {
            return console.log("User does not exist.")    
        }
        console.log(todo)
    })
    .catch((e) => console.log(e))
}






// var id = "5bcd0a2e94f34532a0ca3563"
// 5bcc8a12d79474249cffc0bb
// if (!ObjectID.isValid(id)) {
//     console.log("ID not valid")
// }


// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log("Todos", todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log("Todo", todo)
// })

// Todo.findById(id).then((todo) => {
//     console.log("Todo by id", todo)
// }).catch((e) => console.log(e))