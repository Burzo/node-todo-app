var env = process.env.NODE_ENV || "development"

if (env === "development") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://burzo:mihili123@ds139193.mlab.com:39193/node-todo-api"
} else if (env === "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://burzo:mihili123@ds139193.mlab.com:39193/node-todo-api-test"
} else if (env === "production") {
    process.env.MONGODB_URI = "mongodb://burzo:mihili123@ds139193.mlab.com:39193/node-todo-api"
}