const express = require("express")
require("dotenv").config()

const app = express()
const port = process.env.PORT || 9000

const cors = require('cors');

app.use(cors());

app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})

app.get("/",(req,res)=>{
    return res.status(200).json({service : "gh-facility-mgr"})
})

app.get("/api/v1/healthz",(req,res)=>{
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        res.status(200).json({status : "Ok"})
    } else if (acceptHeader.includes('plain')) {
        res.set('Content-Type', 'text/html')
        res.status(200).send("Health: Ok")
    } else {
        res.status(412).json({error : "Invalid Accept Header"})
    }
    return
})

// Api request to receive filtered events
app.get("/api/v1/facility", async (req,res) => {
    // const sport= req.query.sport
    // const location = req.query.location
    // const date = req.query.date
    // console.log(sport, location, date)
    // console.log("got db request - processing")
    // acceptHeader = req.header('Accept')
    // if (acceptHeader.includes('json')) {
    //     const response = await db_Handler(sport, location, date)
    //     if (response) {
    //         res.status(200).json(response)
    //     } else {
    //         res.status(500).send('Failed to get data.')
    //     }
    // } else if (acceptHeader.includes('plain')) {
    //     res.set('Content-Type', 'text/html')
    //     res.status(200).send(databaseSeeds)
    // } else {
    //     res.status(412).json({error : "Invalid Accept Header"})
    // }
// 
    res.status(501)
    return
})

const { Open, Close } = require('./docs/db/connection')
const { Read } = require('./docs/db/db')

async function db_Handler(sport, location, date){
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
        const response = await Read(pool, sport, location, date)
        console.log('response of query:', response)

        Close(pool)
        console.log("finished!")
        return response
    } catch (e) {
        return false
    }
}
