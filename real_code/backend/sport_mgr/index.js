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
app.get("/api/v1/sport", (req,res) => {
    console.log("got db request - processing")
    acceptHeader = req.header('Accept')
    if (acceptHeader.includes('json')) {
        e = db_Handler()
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
// import pg from 'pg';
// import {Connector} from '@google-cloud/cloud-sql-connector';
function db_Handler(){
    console.log("opening DB connection")
    
    try {
        const {Pool} = pg;
     
        const connector = new Connector();
        const clientOpts = connector.getOptions({
            // instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
            instanceConnectionName: 'gamehunter-417801:us-central1:game-hunter-db-5d65',
            // authType: 'IAM'
            ipType: 'PUBLIC'
        });
        
        const pool = new Pool({
            ...clientOpts,
            // user: process.env.DB_USER,
            // database: process.env.DB_NAME
            user: 'postgres',
            // host: '10.87.0.3',
            password: 'postgres',
            user: 'game-hunter-run-sa@gamehunter-417801.iam',
            max: 5,
            database: 'postgres'
        });
        
        const {rows} = pool.query('SELECT test FROM test');
        console.table(rows); // prints the last 5 records
        pool.end();
        connector.close();
        return true
    } catch (e) {
        return false
    }
}

function db_Handler_spanner(){
    // let dbHandler = require ("./db/db")

    console.log("opening DB connection")
    // database = dbHandler.Open()
    const database = Open()

    console.log("Reading from DB")
    // dbHandler.Read(database)
    Read(database)

    console.log("closing DB")
    // dbHandler.Close(database)
    Close(database)
}

function Open() {

    const projectId = 'GameHunter';
    const instanceId = 'game-hunter-db-5d65';
    const databaseId = 'test';

    // Imports the Google Cloud client library
    const {Spanner} = require('@google-cloud/spanner');

    // Creates a client
    const spanner = new Spanner({
        projectId: projectId,
    });

    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    return database
}

async function Read(database) {
    const query = {
        sql: 'SELECT SingerId, AlbumId, AlbumTitle FROM Albums',
    };

    // Queries rows from the Albums table
    try {
        var numrows = 0
        const [rows] = await database.run(query);

        rows.forEach(row => {
            const json = row.toJSON();
            console.log(
            `test: ${json.test}`
            );
            numrows = numrows+1
        });

        console.log("read ${numrows} of data")
    } catch (err) {
        console.error('ERROR:', err);
    }
}

async function Close(database) {
    await database.close()
}
