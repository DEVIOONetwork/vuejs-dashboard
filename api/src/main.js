const config = require('../config.json');

const fastify = require('fastify')({ logger: false });
fastify.register(require('fastify-jwt'), {
    secret: config.jwt.secret,
    sign: {
        expiresIn: config.jwt.expiresIn,
    },
})

// CORS
fastify.register(require('fastify-cors'), {
    origin: config.client_uri,
    methods: ['GET', 'POST'],
    credentials: true
})

fastify.post('/', async (request, reply) => {
    await request.jwtVerify()
    reply.type('application/json').code(200)
    reply.send({
        "status": "ok",
        "message": "Welcome to the API",
        "version": "1.0.0"
    })
})

fastify.register(require('./Routes/Auth'))
fastify.register(require('./Routes/Users'))

// Listening
fastify.listen(config.port, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})