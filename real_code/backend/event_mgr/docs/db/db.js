module.exports = { Create, Read, Delete }

async function Create(database, link, table) {
    let query = {
        sql: `INSERT INTO ${table} (user_id, event_id) VALUES (${link.user_id}, ${link.event_id})`
    }

    // Queries rows from the Albums table
    try {
        console.log(query.sql)
        const response = await database.query(query.sql)
        console.log('event saved')
        return response
    } catch (err) {
        console.error(err);
        return err
    }
}

async function Read(database, user, table) {
    let query = {
        sql: `SELECT * FROM ${table} WHERE email ILIKE '${user.email}' AND password ILIKE '${user.password}'`,
    }

    // Queries rows from the Albums table
    try {
        console.log(query.sql)
        const { rows } = await database.query(query.sql)
        return rows
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}

async function Delete() {
    let query = {
        sql: `DELETE FROM ${table}`
    }

    return
}