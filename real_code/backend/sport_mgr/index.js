const express = require("express")
require("dotenv").config()
const cors = require('cors');

const createConnectorIAMAuthPool = require('./docs/db/connection');
const connectWithIAM = require("./docs/db/connection");

const app = express()

// app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const databaseSeeds = [
    {
        sport: 'Volleyball',
        location: 'CMRC'
    },
    {
        sport: 'Basketball',
        location: 'CRMC'
    },
    {
        sport: 'Soccer',
        location: 'YMCA'
    }
]

// Api request to receive all events
app.get("/api/v1/db", async (req,res) => {
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        e = await db_Handler()
        if (e) {
            res.status(200).json(databaseSeeds)
        } else {
            res.status(500).json(e)
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
    return
})

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
    if(!hasTable) {
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
