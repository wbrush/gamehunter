module.exports = { Read }

async function Read(database) {
    const query = {
        sql: 'SELECT * FROM public.test',
    };

    // Queries rows from the Albums table
    try {
        let numrows = 0
        const response = await database.query(query.sql);

        // rows.forEach(row => {
        //     const json = row.toJSON();
        //     console.log(
        //     `test: ${json.test}`
        //     );
        //     numrows = numrows+1
        // });

        console.log(`read ${response} of data`)
        return response
    } catch (err) {
        console.error('ERROR:', err);
        return err
    }
}
