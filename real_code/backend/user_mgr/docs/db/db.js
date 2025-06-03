module.exports = { Create, Read, Update, Delete }

async function Create(database, user) {
    let query = {
        sql: `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}') RETURNING *`
    }

    // Queries rows from the Albums table
    try {
        console.log(query.sql)
        const { rows } = await database.query(query.sql)
        return rows[0]
    } catch (err) {
        console.error(err);
        return err
    }
}

async function Read(database, data) {
    let query

    if (data.method === 'login') {
        query = {
            sql: `SELECT * FROM users WHERE email ILIKE '${data.user.email}'`,
        }
    } else if (data.method === 'read') {
        query = {
            sql: `SELECT * FROM signedevents WHERE user_id = ${data.user.id}`,
        }
    }
    
    // Queries rows from the Albums table
    try {
        console.log(query.sql)
        const { rows } = await database.query(query.sql)
        
        if (data.method === 'login') {
            console.log('User found:', rows[0])
            return rows[0]
        } else if (data.method === 'read') {
            console.log('Events found', rows)
            return rows
        }
    } catch (err) {
        console.error(err);
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