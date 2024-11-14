module.exports = { Create, Read, Delete }

async function Create(database, data) {
    let query = {
        sql: `INSERT INTO signedevents (user_id, event_id) VALUES (${data.user}, ${data.event})`
    }

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

async function Read(database, data) {
    let query = {
        sql: `SELECT * FROM signedevents LEFT JOIN events ON signedevents.event_id = events.id WHERE user_id = ${data.user} ORDER BY date`
    }

    try {
        console.log(query.sql)
        const { rows } = await database.query(query.sql)
        return rows
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}

async function Delete(database, data) {
    let query = {
        sql: `DELETE FROM signedevents WHERE user_id = ${data.user} AND event_id = ${data.event}`
    }

    try {
        console.log(query.sql)
        const response = await database.query(query.sql)
        console.log('event removed')
        return response
    } catch (err) {
        console.error(err);
        return err
    }
}