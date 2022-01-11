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
                    "role": await db.getRole(userID),
                    "oauth": await db.getOauth(userID),
                }
            )
        }
    })

    fastify.route({
        method: 'POST',
        url: '/users/me/username',
        handler: async (request, reply) => {
            await request.jwtVerify()

            if (!request.body.username) {
                return reply.code(400).send({
                    "error": "Missing username"
                })
            }

            if (request.body.username.length > 20) {
                return reply.code(400).send({
                    "error": "Username too long"
                })
            }

            let userID = request.user.id;
            let username = request.body.username;

            let newUsername = await db.setUsername(userID, username);

            if (!newUsername) {
                return reply.code(400).send({
                    "error": "Username already taken"
                })
            }

            reply.type('application/json').code(200);
            reply.send(
                {
                    "id": userID,
                    "username": username,
                    "email": await db.getMail(userID),
                    "biography": await db.getBiography(userID),
                    "role": await db.getRole(userID),
                    "oauth": await db.getOauth(userID),
                }
            )
        }
    })

    fastify.route({
        method: 'POST',
        url: '/users/me/email',
        handler: async (request, reply) => {
            await request.jwtVerify()

            if (!request.body.email) {
                return reply.code(400).send({
                    "error": "Missing email"
                })
            }

            if (request.body.email.length > 30) {
                return reply.code(400).send({
                    "error": "Email too long"
                })
            }

            let userID = request.user.id;
            let email = request.body.email;

            let newMail = await db.setEmail(userID, email);

            if (!newMail) {
                return reply.code(400).send({
                    "error": "Email already in use"
                })
            }

            reply.type('application/json').code(200);
            reply.send(
                {
                    "id": userID,
                    "username": await db.getUsername(userID),
                    "email": email,
                    "biography": await db.getBiography(userID),
                    "role": await db.getRole(userID),
                    "oauth": await db.getOauth(userID),
                }
            )
        }
    })

    fastify.route({
        method: 'POST',
        url: '/users/me/password',
        handler: async (request, reply) => {
            await request.jwtVerify()

            if (!request.body.password || !request.body.passwordConfirm) {
                return reply.code(400).send({
                    "error": "Missing password"
                })
            }

            if (request.body.password !== request.body.passwordConfirm) {
                return reply.code(400).send({
                    "error": "Passwords don't match"
                })
            }

            let userID = request.user.id;
            let password = request.body.password;

            let oauth = await db.getOauth(userID);

            if (!oauth) {
                return reply.code(400).send({
                    "error": "You can't change your password if you're logged in with an OAuth provider"
                })
            }

            await db.setPassword(userID, password);

            reply.type('application/json').code(200);
            reply.send(
                {
                    "id": userID,
                    "username": await db.getUsername(userID),
                    "email": await db.getMail(userID),
                    "biography": await db.getBiography(userID),
                    "role": await db.getRole(userID),
                    "oauth": await db.getOauth(userID),
                }
            )
        }
    })

    fastify.route({
        method: 'POST',
        url: '/users/me/biography',
        handler: async (request, reply) => {
            await request.jwtVerify()

            if (!request.body.biography) {
                return reply.code(400).send({
                    error: "Missing biography"
                })
            }

            if (request.body.biography.length > 500) {
                return reply.code(400).send({
                    error: "Biography too long"
                })
            }

            let userID = request.user.id;
            let biography = request.body.biography;

            await db.setBiography(userID, biography);

            reply.type('application/json').code(200);
            reply.send(
                {
                    "id": userID,
                    "username": await db.getUsername(userID),
                    "email": await db.getMail(userID),
                    "biography": biography,
                    "role": await db.getRole(userID),
                    "oauth": await db.getOauth(userID),
                }
            )
        }
    })
}

module.exports = routes;