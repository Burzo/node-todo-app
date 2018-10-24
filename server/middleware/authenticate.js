var {User} = require("./../models/user.js")

var authenticate = (req, res, next) => {
    var token = req.header("x-auth")

    User.findByToken(token).then(user => {
        if (!user) {
            return Promise.reject(); // lahko tut to namest res.status(401).send(), itak bo zagnal spodi catch()
        }
        req.user = user
        req.token = token
        next()
    }).catch((e) => {
        res.status(401).send()
    })
}

module.exports = {authenticate}