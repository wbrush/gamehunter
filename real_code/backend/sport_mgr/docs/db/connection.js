module.exports = { Open, Close }

const pg = require("pg")
const {Connector} = require("@google-cloud/cloud-sql-connector")
const {Pool} = pg;
const connector = new Connector();

async function Open(instance, hostName, databaseName, userName) {

    //  connect to postgres DB here
    const clientOpts = await connector.getOptions({
        instanceConnectionName: instance,
        authType: 'IAM',
        ipType: 'PRIVATE'
    });

    const pool = new Pool({
        ...clientOpts,
        host: hostName,
        database: databaseName,
        // user: userName,
        user: "postgres",
        password: "postgres",
        max: 5
    });

    return pool
}

async function Close(database) {
    database.end();
    // connector.close();
}
