const config = require('../config.json');
const Database =require('./Auth/Database');
const UserModel = require('./Auth/Models/User');

const fastify = require('fastify')({
  logger: true
})

let db = new Database(config.database.uri);


fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200)
    reply.send({ hello: 'world' })
})

fastify.listen(config.port, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})