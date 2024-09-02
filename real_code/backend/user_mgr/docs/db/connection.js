const pg = require("pg")
const { Connector } = require("@google-cloud/cloud-sql-connector")
const { Pool } = pg;
const connector = new Connector();

async function Open(instance, hostName, databaseName, userName, dbPassword) {

    //  connect to postgres DB here
    const clientOpts = await connector.getOptions({
        instanceConnectionName: config.pool.instance,
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
    });

    return pool
}

async function Close(database) {
    database.end();
    // connector.close();
}

module.exports = { Open, Close }