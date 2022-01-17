const mongoose = require('mongoose');
const User = require('./Models/User');
const CryptoJS = require("crypto-js")

class Database {

    constructor(url) {
        this.url = url;

        mongoose.connect(this.url, {
            useNewUrlParser: true
        });
    }

    async login(username, password, oauth2) {
        let user = await User.findOne({
            username: username
        })

        if (!user) {
            user = await User.findOne({
                email: username
            })

            if (!user) return false
        }

        if (oauth2) return user

        let pass = CryptoJS.SHA256(password).toString()

        return user.password === pass ? user : false
    }

    async register(username, email, password, oauth) {
        let nv = await User.findOne({
            username: username
        })

        let ev = await User.findOne({
            email: email
        })

        if ((ev || nv)) return false

        let newUser = new User({
            username: username,
            email: email,
            password: CryptoJS.SHA256(password).toString(),
            oauth: oauth
        })

        await newUser.save()

        return newUser
    }

    getUser(id) {
        return User.findOne({
            _id: id
        }).then(user => {
            return {
                _id: user._id,
                username: user.username,
                email: user.email,
                biography: user.biography,
                role: user.role,
                oauth: user.oauth
            }
        })
    }

    async setUsername(id, username) {
        let nv = await User.findOne({
            username: username
        })

        if (nv) return false

        return User.findOne({
            _id: id
        }).then(user => {
            user.username = username
            return user.save()
        })
    }

    setPassword(id, password) {
        return User.findOne({
            _id: id
        }).then(user => {
            user.password = CryptoJS.SHA256(password).toString()
            return user.save()
        })
    }

    async setEmail(id, email) {
        let ev = await User.findOne({
            email: email
        })

        if (ev) return false

        return User.findOne({
            _id: id
        }).then(user => {
            user.email = email
            return user.save()
        })
    }

    setBiography(id, biography) {
        return User.findOne({
            _id: id
        }).then(user => {
            user.biography = biography
            return user.save()
        })
    }


}

module.exports = Database;
