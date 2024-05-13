module.exports = { Read }

async function Read(database, sport, location, date) {
    let query = {
        sql: 'SELECT * FROM test',
    }

    console.log(sport, location, date)

    if (sport, location, date) {
        query.sql += ` WHERE location = '${location}' AND sport = '${sport}'`
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
