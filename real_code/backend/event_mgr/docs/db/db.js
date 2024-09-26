module.exports = { Create, Read, Update, Delete }

async function Create(database, user) {
    let query = {
        sql: `INSERT INTO users (name, email, password) VALUES ('${user.name}, '${user.email}', '${user.password}')`
    }

    // Queries rows from the Albums table
    try {
        console.log(query.sql)
        const response = await database.query(query.sql)
        return response
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}

async function Read(database, user) {
    let query = {
        sql: `SELECT * FROM users WHERE email ILIKE '${user.email}' AND password ILIKE '${user.password}'`,
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