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

}

module.exports = routes;