const Database = require("../Database/Database");
const config = require("../../config.json");
let db = new Database(config.database.uri);

const CryptoJS = require("crypto-js")

async function routes (fastify, options) {

    fastify.route({
        method: 'POST',
        url: '/login',
        handler: async (req, rep) => {
            let user = await db.login(req.body.username, req.body.password)

            if (!user) {
                return rep.send({
                    error: 'Invalid username or password'
                });
            }

            let token = fastify.jwt.sign({
                username: req.body.username,
                password: CryptoJS.SHA256(req.body.password).toString()
            })

            rep.send({
                token: token
            })
        }
    })

    fastify.route({
        method: 'POST',
        url: '/signup',
        handler: async (req, rep) => {
            let user = await db.register(req.body.username, req.body.email, req.body.password)

            if (!user) {
                return rep.send({
                    error: 'Username or email already used!'
                });
            }

            let token = fastify.jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                password: CryptoJS.SHA256(req.body.password).toString()
            })

            rep.send({
                token: token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        }

    })
}

module.exports = routes;