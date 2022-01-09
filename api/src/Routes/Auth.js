const Database = require("../Database/Database");
const config = require("../../config.json");
let db = new Database(config.database.uri);

async function routes (fastify, options) {

    fastify.route({
        method: 'POST',
        url: '/login',
        handler: async (req, rep) => {
            if (!req.body.username || !req.body.password) {
                return rep.code(400).send({
                    error: "Missing username or password"
                });
            }
            let user = await db.login(req.body.username, req.body.password)

            if (!user) {
                return rep.send({
                    error: 'Invalid username or password'
                });
            }

            let token = fastify.jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email
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
            if (!req.body.username || !req.body.password || !req.body.email) {
                return rep.send({
                    error: 'Missing username, password or email'
                });
            }
            if (req.body.username.length > 20) {
                return rep.send({
                    error: 'Username must be less than 20 characters'
                });
            }
            if (req.body.email > 30) {
                return rep.send({
                    error: 'Email must be less than 30 characters'
                });
            }
            if (!req.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return rep.send({
                    error: 'Invalid email'
                });
            }

            let user = await db.register(req.body.username, req.body.email, req.body.password)

            if (!user) {
                return rep.send({
                    error: 'Username or email already used!'
                });
            }

            let token = fastify.jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email
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