const { Connector } = require("@google-cloud/cloud-sql-connector")
const Knex = require('knex')

<<<<<<< HEAD
const connectWithIAM = async config => {
    const connector = new Connector()
=======
const pg = require("pg")
const {Connector} = require("@google-cloud/cloud-sql-connector")
const {Pool} = pg;
const connector = new Connector();

async function Open(instance, hostName, databaseName, userName, dbPassword) {

    //  connect to postgres DB here
>>>>>>> acae8a7067b0d6563acb956108b0155346128fad
    const clientOpts = await connector.getOptions({
        instanceConnectionName: config.pool.instance,
        ipType: 'PRIVATE',
        authType: 'IAM'
    })

<<<<<<< HEAD
    const dbConfig = {
        client: 'pg',
        connection: {
            ...clientOpts,
            user: config.pool.user,
            database: config.pool.db
        }
    }
=======
    const pool = new Pool({
        ...clientOpts,
        host: hostName,
        database: databaseName,
        user: userName,
        password: dbPassword,
        max: 5
    });
>>>>>>> acae8a7067b0d6563acb956108b0155346128fad

    return Knex(dbConfig)
}

module.exports = connectWithIAM
