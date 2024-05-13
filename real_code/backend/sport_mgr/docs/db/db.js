module.exports = { Read }

async function Read(database) {
    const query = {
        sql: 'SELECT * FROM test',
    }

    // Queries rows from the Albums table
    try {
        const { rows } = await database.query(query.sql)

        console.log(`read ${rows} of data`)
        return rows
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}
