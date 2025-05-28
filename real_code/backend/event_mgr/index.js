const express = require("express")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 9002

console.log(`starting up on port ${port}`)

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

console.log(`defining endpoints for port ${port}`)

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})

app.get("/",(req,res)=>{
    console.log("got / request")
    return res.status(200).json({service : "gh-event-mgr"})
})

// Api request to get events
app.get("/api/v1/events", async (req,res) => {
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('read')
        
        if (response) {
            res.status(200).json(response)
        } else {
            res.status(400).json({ result: false })
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
})

// Api request to create an event
app.post("/api/v1/event", async (req,res) => {
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('create', req.body)
        console.log(response)
        
        if (response) {
            res.status(200).json({ result: true })
        } else {
            res.status(400).json({ result: false })
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
})

// Api request to request a users events
app.get("/api/v1/user/:id", async (req,res) => {
    const ids = {
        user: `${req.params.id}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('read', ids)
        
        if (response) {
            res.status(200).json(response)
        } else {
            res.status(400).json({ result: false })
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
})

// Api request to signup for events
app.post("/api/v1/add", async (req,res) => {
    const ids = {
        user: `${req.body.userId}`,
        event: `${req.body.eventId}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('add', ids)
        console.log(response)
        
        if (response.rowCount > 0) {
            res.status(200).json({ result: true })
        } else {
            res.status(400).json({ result: false })
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
})

// Api request to remove saved event
app.post("/api/v1/remove", async (req,res) => {
    const ids = {
        user: `${req.body.userId}`,
        event: `${req.body.eventId}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        const response = await db_Handler('remove', ids)
        console.log(response)

        if (response.rowCount > 0) {
            res.status(200).json({ result: true })
        } else {
            res.status(500).send({ result: false })
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
const { Create, Read, Delete } = require('./docs/db/db')

async function db_Handler(method, data){
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
        let response
        if (method == 'add') {
            response = await Create(pool, data)
        } else if (method == 'read') {
            response = await Read(pool)
        } else if (method == 'remove') {
            response = await Delete(pool, data)
        }

        Close(pool)
        console.log("finished!")
        return response
    } catch (e) {
        return false
    }
}

module.exports.app = app
