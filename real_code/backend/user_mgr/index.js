const express = require("express")
require('dotenv').config()
const bcrypt = require('bcrypt')
const { signToken } = require('./utils/auth')

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
    const user = {
        name: `${req.body.name}`,
        email: `${req.body.email}`,
        password: `${await bcrypt.hash(req.body.password, 10)}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('signup', user)

        if (response) {
            const token = signToken(response)
            res.status(200).json({ data: token })
        } else {
            res.status(500).json({ data: null })
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
    const user = {
        email: `${req.body.email}`,
        password: `${req.body.password}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('login', user)

        // check if input password matches saved password
        if (response) {
            bcrypt.compare(user.password, response.password, (err, result) => {
                if (err) {
                    console.error(err)
                }

                if (result) {
                    const token = signToken(response)
                    res.json({success: true, message: token})
                } else {
                    res.json({success: false, message: 'passwords do not match'})
                }
            })
        } else if (acceptHeader.includes('plain')) {
            res.set('Content-Type', 'text/html')
            res.status(200).send(databaseSeeds)
        } else {
            res.status(412).json({error : "Invalid Accept Header"})
        }
    }
})

// Api request to request a users events
app.get("/api/v1/user/:id", async (req,res) => {
    const user = {
        id: `${req.params.id}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')

    if (acceptHeader.includes('json')) {
        const response = await db_Handler('read', user)
        
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

const { Open, Close } = require('./docs/db/connection')
const { Create, Read, Update, Delete } = require('./docs/db/db')

async function db_Handler(method, user){
    db_host = process.env.db_host
    db_name = process.env.db_name
    db_conn = process.env.db_conn
    db_user = process.env.db_user
    db_pwd = process.env.db_pwd

    const data = {
        user: user,
        method: method
    }

    console.log(`opening DB connection to ${db_name} under username ${db_user}`)
    try {
        //  connect to postgres DB here
        const pool = await Open(db_conn, db_host, db_name, db_user, db_pwd)

        console.log('sending query for user', user)

        let response
        if (data.method === 'login') {
            response = await Read(pool, data)
            console.log('login response', response)
            
            return response
        } else if (method === 'signup') {
            response = await Create(pool, user)
            console.log('signup response', response)
            
            return response
        } else if (data.method === 'read') {
            response = await Read(pool, data)
            console.log('read response', response)

            return response
        }

        Close(pool)
        console.log("finished!")
    } catch (e) {
        console.error(e)
        return e
    }
}

module.exports.app = app
