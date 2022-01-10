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

    async register(username, email, password) {
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
        })

        await newUser.save()

        return newUser
    }

    getUsername(id) {
        return User.findOne({
            _id: id
        }).then(user => {
            return user.username
        })
    }

    getMail(id) {
        return User.findOne({
            _id: id
        }).then(user => {
            return user.email
        })
    }

    getBiography(id) {
        return User.findOne({
            _id: id
        }).then(user => {
            return user.biography
        })
    }

    getRole(id) {
        return User.findOne({
            _id: id
        }).then(user => {
            return user.role
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

    setRole(id, role) {
        return User.findOne({
            _id: id
        }).then(user => {
            user.role = role
            return user.save()
        })
    }


}

module.exports = Database;
