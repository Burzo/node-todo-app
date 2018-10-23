var mongoose = require("mongoose")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://burzo:mihili123@ds139193.mlab.com:39193/node-todo-api",{ useNewUrlParser: true })

module.exports = {mongoose};