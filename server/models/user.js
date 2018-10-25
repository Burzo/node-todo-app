const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const _ = require("lodash")
const bcryptjs = require("bcryptjs")

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "{VALUE} is not a valid email."
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.toJSON = function () {
    //var user = this
    var userObject = this.toObject()

    return _.pick(userObject, ["_id", "email"])
}

UserSchema.methods.generateAuthToken = function () {
    //var user = this
    var access = "auth"
    var token = jwt.sign({_id: this._id.toHexString(), access}, process.env.JWT_SECRET).toString()

    this.tokens.push({access, token})
    console.log(token)
    return (this.save().then(() => {
        return token
    }))
}

UserSchema.statics.findByToken = function (token) {
    //var User = this
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // })
        return Promise.reject() // lahko daš argument not pa se pojavi kot error
    }
    return this.findOne({
        "_id": decoded._id,
        "tokens.token": token,
        "tokens.access": "auth"
    })
}

UserSchema.statics.findByCredentials = function (email, password) {
    return this.findOne({email}).then(user => {
        if (!user) {
            return Promise.reject("Baje ni userja")
        }
        //bcryptjs.compare(password, user.password).then(res => console.log(res)).catch(e => console.log(e))
        return new Promise((resolve, reject) => {
            bcryptjs.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                } else {
                    reject("ocitno se ne ujema") 
                }
            })
        })
    })
}

UserSchema.methods.removeToken = function (token) {
    return this.update({
        $pull: {
            tokens: {token}
        }
    })
}

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(this.password, salt, (err, hash) => {
                this.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

var User = mongoose.model("User", UserSchema)

module.exports = {User}