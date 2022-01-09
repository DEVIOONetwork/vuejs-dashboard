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

    async login(username, password) {
        let user = await User.findOne({
            username: username
        })

        if (!user) return false

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

    getUsers() {
        return User.find({})
    }
}

module.exports = Database;