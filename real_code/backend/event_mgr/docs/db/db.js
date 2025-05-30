module.exports = { Create, Read, Update, Delete }

async function Create(database, data) {
    let query
    if (data.method == 'signup') {
        query = `INSERT INTO signedevents (user_id, event_id) VALUES (${data.user}, ${data.event})`
    } else {
        query = `INSERT INTO events (start_date, end_date, event_type, players) VALUES ('${data.start_date}', '${data.end_date}', '${data.event_type}', ${data.players})`
    }

    try {
        console.log(query)
        const response = await database.query(query)
        console.log('event created')
        return response
    } catch (err) {
        console.error(err);
        return err
    }
}

async function Read(database) {
    let query = `SELECT * FROM events ORDER BY start_date`

    try {
        console.log(query)
        const { rows } = await database.query(query)
        return rows
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}

async function Update(database, data) {
    let query = `UPDATE events SET players = players ${data.method} 1 WHERE id = ${data.id}`

    try {
        console.log(query)
        const response = await database.query(query)
        return response
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}

async function Delete(database, data) {
    let query = `DELETE FROM signedevents WHERE user_id = ${data.user} AND event_id = ${data.event}`

    try {
        console.log(query)
        const response = await database.query(query)
        console.log('event removed')
        return response
    } catch (err) {
        console.error(err);
        return err
    }
}