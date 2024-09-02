const express = require("express")
require('dotenv').config()

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

let pool

app.use(async (req, res, next) => {
    if (pool) {
        return next()
    }
})

// Api request to signup
app.get("/signup", async (req,res) => {    
    console.log("signup request")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        const response = await db_Handler(name, email, password)
        if (response) {
            res.status(200).json(response)
        } else {
            res.status(500).send('Failed to get data.')
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }

    return
})

// Api request to login
app.get("/login", async (req,res) => {    
    console.log("login request")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        const response = await db_Handler(name, email, password)
        if (response) {
            res.status(200).json(response)
        } else {
            res.status(500).send('Failed to get data.')
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
    
    return
})

const { Open, Close } = require('./docs/db/connection')
const { Create, Read, Update, Delete } = require('./docs/db/db')

async function db_Handler(name, email, password){
    db_host = process.env.db_host
    db_name = process.env.db_name
    db_conn = process.env.db_conn
    db_user = process.env.db_user
    db_pwd = process.env.db_pwd

    console.log(`opening DB connection to ${db_name} under username ${db_user}`)
    try {
        //  connect to postgres DB here
        const pool = await Open(db_conn, db_host, db_name, db_user, db_pwd)
        
        console.log('sending query')
        const response = await Create(pool, name, email, password)

        Close(pool)
        console.log("finished!")
        return response
    } catch (e) {
        return false
    }
}

app.get("/", httpGet)

module.exports.app = app
