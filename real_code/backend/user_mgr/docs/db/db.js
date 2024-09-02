module.exports = { Create, Read, Update, Delete }

async function Create(database, name, email, password) {
    let query = {
        sql: `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`
    }

    try {
        console.log(query.sql)
        const res = await database.query(query.sql)
        return res
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}

async function Read(database, name, email, password) {
    let query = {
        sql: `SELECT * FROM users WHERE name ILIKE '${name}' AND email ILIKE '${email}' AND password ILIKE '${password}'`,
    }

    // Queries rows from the Albums table
    try {
        console.log(query.sql)
        const res = await database.query(query.sql)
        return res
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
        sql: 'DELETE FROM test'
    }

    return
}