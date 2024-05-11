const express = require("express")

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

    config.pool.instance = 'gamehunter-417801:us-central1:game-hunter-db-5d65'
    config.pool.user = 'game-hunter-run-sa@gamehunter-417801.iam'
    config.pool.db = 'postgres'
    config.pool.host = '10.87.0.3'

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
