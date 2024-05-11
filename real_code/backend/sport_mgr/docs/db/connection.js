const { Connector } = require("@google-cloud/cloud-sql-connector")
const Knex = require('knex')

const connectWithIAM = async config => {
    const connector = new Connector()
    const clientOpts = await connector.getOptions({
        instanceConnectionName: config.pool.instance,
        ipType: 'PRIVATE',
        authType: 'IAM'
    })

    const dbConfig = {
        client: 'pg',
        connection: {
            ...clientOpts,
            user: config.pool.user,
            database: config.pool.db
        }
    }

    return Knex(dbConfig)
}

module.exports = connectWithIAM
