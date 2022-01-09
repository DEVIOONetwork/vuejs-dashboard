const Database = require("../Database/Database");
const config = require("../../config.json");
let db = new Database(config.database.uri);

async function routes (fastify, options) {

    fastify.route({
        method: 'POST',
        url: '/users',
        handler: async (request, reply) => {
            await request.jwtVerify()
            reply.type('application/json').code(200);
            reply.send(
                {
                    "users": "list ..."
                }
            )
        }
    })
    fastify.route({
        method: 'POST',
        url: '/users/me',
        handler: async (request, reply) => {
            await request.jwtVerify()
            reply.send(
                {
                    ...request.user
                }
            )
        }
    })

}

module.exports = routes;