const config = require('../config.json');
const Database = require('./Database/Database');

const fastify = require('fastify')({ logger: false });
fastify.register(require('fastify-jwt'), {
    secret: config.jwt.secret
})

// CORS
fastify.register(require('fastify-cors'), {
    origin: config.client_uri,
    methods: ['GET', 'POST'],
    credentials: true
})

fastify.get('/', async (request, reply) => {
    await request.jwtVerify()
    reply.type('application/json').code(200)
    reply.send({ ...request.user })
})

fastify.register(require('./Routes/Auth'))

// Listening
fastify.listen(config.port, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})