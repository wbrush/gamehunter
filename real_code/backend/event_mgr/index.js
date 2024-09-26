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
    return res.status(200).json({service : "gh-sport-mgr"})
})

// Api request to save event
app.post("/api/v1/saveEvent", async (req,res) => {
    const event = {}
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        const response = await db_Handler('save', event)
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

// Api request to remove saved event
app.post("/api/v1/removeEvent", async (req,res) => {
    const event = {}
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        const response = await db_Handler('remove', event)
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

async function db_Handler(method, event){
    db_host = process.env.db_host
    db_name = process.env.db_name
    db_conn = process.env.db_conn
    db_user = process.env.db_user
    db_pwd = process.env.db_pwd

    console.log(`opening DB connection to ${db_name} under username ${db_user}`)
    try {
        //  connect to postgres DB here
        const pool = await Open(db_conn, db_host, db_name, db_user, db_pwd)
        
        console.log('incoming event', event)
        console.log('sending query')
        let response
        if (method == 'save') {
            response = await Create(pool, event)
            console.log('response of login query:', response)
        } else if (method == 'remove') {
            response = await Delete(pool, event)
            console.log('response of signup query:', response)
        }

        Close(pool)
        console.log("finished!")
        return response
    } catch (e) {
        return false
    }
}

module.exports.app = app
