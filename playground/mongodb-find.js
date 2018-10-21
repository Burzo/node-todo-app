//const MongoClient = require("mongodb").MongoClient
const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log("Unable to connect to MongoDB server")
    }
    console.log("Connected to mongoDB server")

    const db = client.db("TodoApp")

    db.collection("Todos").find({_id: ObjectID("5bcbb4178aaff621dc6fca43")}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2))
    }).catch((err) => {console.log(err)})

    db.collection("Todos").find().count().then(res => {
        console.log(`Todos count: ${res}`)
    }).catch(err => {
        console.log(err)
    })
    //client.close()
})