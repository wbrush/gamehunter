module.exports = { Create, Read, Update, Delete }

async function Create() {
    let query = {
        sql: 'INSERT INTO test VALUES (), ()'
    }

    return
}

async function Read(database) {
    let query = {
        sql: 'SELECT * FROM users',
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