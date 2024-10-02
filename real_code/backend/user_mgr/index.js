const express = require("express")
require('dotenv').config()
const bcrypt = require('bcrypt')

const app = express()
const port = process.env.PORT || 9001

console.log(`starting up on port ${port}`)

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);

// const pgPool = () => db_Handler('session')

// app.use(session({
//     secret: process.env.sessionSecret,
//     cookie: {
//         maxAge: 300000,
//         sameSite: true,
//         secure: false
//     },
//     resave: false,
//     store: new pgSession({
//         pool: pgPool,
//         tableName: 'user_session',
//         createTableIfMissing: true
//     })
// }));

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
    console.log('request email', req.body.email)

    const user = {
        name: `${req.body.name}`,
        email: `${req.body.email}`,
        password: `${await bcrypt.hash(req.body.password, 10)}`
    }
    
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        const response = await db_Handler('signup', user)
        console.log(response)
        if (response) {
            res.status(200).json({ result: response })
        } else {
            res.status(500).json({ result: false })
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
            // query for user matching email
            response = await Read(pool, user)
            console.log('response of login query:', response)

            // check if input password matches saved password
            let validPassword
            if (response) {
                validPassword = checkPassword(user.password, response[0].password)
            }

            if (validPassword) {
                console.log('password is valid')

                // if valid login, save session
                // req.session.save(() => {
                //     req.session.user_id = response[0].id
                //     req.session.logged_in = true

                // })
                return true
            } else {
                return false
            }
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

function checkPassword(loginPassword, savedPassword) {
    return bcrypt.compareSync(loginPassword, savedPassword)
}

module.exports.app = app
