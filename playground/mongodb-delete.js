//const MongoClient = require("mongodb").MongoClient
const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server")
    }
    console.log("Connected to mongoDB server")

    const db = client.db("TodoApp")

    db.collection("Todos").deleteMany({text: "Something to do"}).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })

    // db.collection("Todos").deleteOne({text: "eat lunch"}).then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.log(err)
    // })

    db.collection("Todos").findOneAndDelete({_id: ObjectID("5bcbb3efffeb2a18a8f47e79")}).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })

    //client.close()
})