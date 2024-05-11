const express = require("express")
require('dotenv').config()

const connectWithIAM = require("./docs/db/connection")

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

let pool

app.use(async (req, res, next) => {
    if (pool) {
        return next()
    }

    try {
        pool = await createPoolAndEnsureSchema()
        next()
    } catch (err) {
        console.error(err)
        return next(err)
    }
})

const createPool = async () => {
    const config = {pool: {}}

    config.pool.instance = process.env.db_conn
    config.pool.user = process.env.db_user
    config.pool.password = process.env.db_pwd
    config.pool.db = process.env.db_name
    config.pool.host = process.env.db_host

    return connectWithIAM(config)
}

const ensureSchema = async pool => {
    const hasTable = await pool.schema.hasTable('test')
    if (!hasTable) {
        console.log('No table found, creating...')
        return pool.schema.createTable('test', table => {
            table.timestamp('created_at', 30).primary()
        })
    }
    console.log('Table has been ensured')
}

const createPoolAndEnsureSchema = async () => {
    await createPool()
        .then(async pool => {
            await ensureSchema(pool)
            return pool
        })
        .catch(err => console.log(err))
}

const getData = async pool => {
    return await pool.select('*').from('test')
}

const httpGet = async (req, res) => {
    pool = pool || (await createPoolAndEnsureSchema())

    try {
        const data = await getData(pool)

        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).send('Unable to get data').end()
    }
}

app.get("/", httpGet)

module.exports.app = app
