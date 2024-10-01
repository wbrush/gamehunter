const { Connector } = require("@google-cloud/cloud-sql-connector")
const { Pool } = require('pg')
const connector = new Connector()

async function Open(instance, hostName, databaseName, userName, dbPassword) {
    //  connect to postgres DB here
    const clientOpts = await connector.getOptions({
        instanceConnectionName: instance,
        ipType: 'PRIVATE',
        authType: 'IAM'
    })

    const pool = new Pool({
        ...clientOpts,
        host: hostName,
        database: databaseName,
        user: userName,
        password: dbPassword,
        max: 5
    })

    return pool
}

async function Close(database) {
    database.end()
}

module.exports = { Open, Close }
