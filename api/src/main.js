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

fastify.get('/', async function (req, rep) {
    rep.send({
        hello: 'world'
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