const Database = require("../Database/Database");
const config = require("../../config.json");
let db = new Database(config.database.uri);
const axios = require("axios");

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

            let user = await db.register(req.body.username, req.body.email, req.body.password, false)

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

    fastify.route({
        method: 'GET',
        url: '/oauth2/discord',
        handler: async (req, rep) => {
            let discordCode = req.query.code

            const params = new URLSearchParams()
            params.append('client_id', config.oauth2.discord.client_id)
            params.append('client_secret', config.oauth2.discord.secret)
            params.append('grant_type', 'authorization_code')
            params.append('code', discordCode)
            params.append('redirect_uri', config.oauth2.discord.redirect_uri)

            const reqConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            let dio = await axios.post("https://discord.com/api/oauth2/token", params, reqConfig);

            let userResult = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${dio.data.token_type} ${dio.data.access_token}`,
                },
            });

            let user = await db.login(userResult.data.email, null, true)

            if (!user) {
                user = await db.register(userResult.data.username, userResult.data.email, genPassword(50), true, `https://cdn.discordapp.com/avatars/${userResult.data.id}/${userResult.data.avatar}.webp?size=256`)
            }

            if (!user) {
                rep.redirect(`${config.client_uri}/Login?error=Username+or+email+already+used!`)
            }

            let token = fastify.jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email
            })

            rep.redirect(`${config.client_uri}?token=${token}`)
        }
    })

    fastify.route({
        method: 'GET',
        url: '/oauth2/google',
        handler: async (req, rep) => {
            let googleCode = req.query.code

            const params = new URLSearchParams()
            params.append('client_id', config.oauth2.google.client_id)
            params.append('client_secret', config.oauth2.google.secret)
            params.append('grant_type', 'authorization_code')
            params.append('code', googleCode)
            params.append('redirect_uri', config.oauth2.google.redirect_uri)

            const reqConfig = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

            let dio = await axios.post("https://oauth2.googleapis.com/token", params, reqConfig);
            let userResult = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${dio.data.access_token}`);

            let user = await db.login(userResult.data.email, null, true)

            if (!user) {
                user = await db.register(userResult.data.given_name, userResult.data.email, genPassword(50), true, userResult.data.picture)
            }

            if (!user) {
                rep.redirect(`${config.client_uri}/Login?error=Username+or+email+already+used!`)
            }

            let token = fastify.jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email
            })

            rep.redirect(`${config.client_uri}?token=${token}`)
        }
    })
}

function genPassword(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$*£ù:/+=]|`"#-';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports = routes;
