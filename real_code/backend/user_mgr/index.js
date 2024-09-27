const express = require("express")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 9001

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

// Api request to signup
app.post("/api/v1/signup", async (req,res) => {
    console.log('request', req)
    console.log('request body', req.body)
    console.log('request email', req.body.email)

    const user = {
        name: `${req.body.name}`,
        email: `${req.body.email}`,
        password: `${req.body.password}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        const response = await db_Handler('signup', user)
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
app.post("/api/v1/login", async (req,res) => {
    console.log('request email', req.body.email)

    const user = {
        email: `${req.body.email}`,
        password: `${req.body.password}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('login', user)
        console.log(response)

        if (response) {
            res.status(200).json({response})
        } else {
            res.status(500).send('Failed to get data.')
        }
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send(databaseSeeds)
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
    // return
})

const { Open, Close } = require('./docs/db/connection')
const { Create, Read, Update, Delete } = require('./docs/db/db')

async function db_Handler(method, user){
    db_host = process.env.db_host
    db_name = process.env.db_name
    db_conn = process.env.db_conn
    db_user = process.env.db_user
    db_pwd = process.env.db_pwd

    console.log(`opening DB connection to ${db_name} under username ${db_user}`)
    try {
        //  connect to postgres DB here
        const pool = await Open(db_conn, db_host, db_name, db_user, db_pwd)
        
        console.log('incoming user', user)
        console.log('sending query')
        let response
        if (method == 'login') {
            response = await Read(pool, user)
            console.log('response of login query:', response)
        } else if (method == 'signup') {
            response = await Create(pool, user)
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
