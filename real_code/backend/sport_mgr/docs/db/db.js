module.exports = { Create, Read, Update, Delete }

async function Create(sport, location, date) {
     //!date format: YYYY-MM-DDTHH:MM:SSZ
    let query = {
        sql: `INSERT INTO events (sport, location, date) VALUES ('${sport}', '${location}', '${date}')`
    }

    return
}

async function Read(database, sport, location, date) {
    let query = {
        sql: 'SELECT * FROM events',
    }

    if (sport, location, date) {
        query.sql += ` WHERE location ILIKE '${location}' AND sport ILIKE '${sport}'`
    }

    query.sql += ' ORDER BY date'

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

async function Update() {
    let query = {
        sql: 'UPDATE'
    }

    return
}

async function Delete() {
    let query = {
        sql: 'DELETE FROM events'
    }

    return
}