const Database = require("../Database/Database");
const config = require("../../config.json");
let db = new Database(config.database.uri);

async function routes (fastify, options) {

    fastify.route({
        method: 'POST',
        url: '/users/me',
        handler: async (request, reply) => {
            await request.jwtVerify()
            let userID = request.user.id;

            reply.type('application/json').code(200);
            reply.send(
                {
                    "id": userID,
                    "username": await db.getUsername(userID),
                    "email": await db.getMail(userID),
                    "biography": await db.getBiography(userID),
                    "role": await db.getRole(userID)
                }
            )
        }
    })

    fastify.route({
        method: 'POST',
        url: '/users/me/username',
        handler: async (request, reply) => {
            await request.jwtVerify()

            if (!req.body.username) {
                return reply.code(400).send({
                    "error": "Missing username"
                })
            }

            if (req.body.username.length > 20) {
                return reply.code(400).send({
                    "error": "Username too long"
                })
            }

            let userID = request.user.id;
            let username = request.body.username;

            await db.setUsername(userID, username);

            reply.type('application/json').code(200);
            reply.send(
                {
                    "id": userID,
                    "username": username,
                    "email": await db.getMail(userID),
                    "biography": await db.getBiography(userID),
                    "role": await db.getRole(userID)
                }
            )
        }
    })

    fastify.route({
        method: 'POST',
        url: '/users/me/email',
        handler: async (request, reply) => {
            await request.jwtVerify()

            if (!req.body.email) {
                return reply.code(400).send({
                    "error": "Missing email"
                })
            }

            if (req.body.email.length > 30) {
                return reply.code(400).send({
                    "error": "Email too long"
                })
            }

            let userID = request.user.id;
            let email = request.body.email;

            await db.setEmail(userID, email);

            reply.type('application/json').code(200);
            reply.send(
                {
                    "id": userID,
                    "username": await db.getUsername(userID),
                    "email": email,
                    "biography": await db.getBiography(userID),
                    "role": await db.getRole(userID)
                }
            )
        }
    })
}

module.exports = routes;