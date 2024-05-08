// For more CORS information: https://stackabuse.com/handling-cors-with-node-js/ 
// 
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
    return res.status(200).json({service : "gh-sport-mgr"})
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

const pg = require("pg")
const {Connector} = require("@google-cloud/cloud-sql-connector")

async function db_Handler(){
    console.log("opening DB connection")

    try {
        //  connect to postgres DB here
        const {Pool} = pg;

        const connector = new Connector();
        const clientOpts = await connector.getOptions({
            instanceConnectionName: 'gamehunter-417801:us-central1:game-hunter-db-5d65',
            authType: 'IAM',
            ipType: 'PRIVATE'
        });

        const pool = new Pool({
            ...clientOpts,
            host: '10.87.0.3',
            database: 'postgres',
            user: 'game-hunter-run-sa@gamehunter-417801.iam',
            max: 5
        });
        
        console.log('sending query')
        const {rows} = await pool.query('SELECT * FROM test');
        console.table(rows);

        pool.end();
        connector.close();
        console.log("finished!")
        return true
    } catch (e) {
        return e
    }
}
