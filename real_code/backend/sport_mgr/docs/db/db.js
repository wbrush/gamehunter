module.exports = { Read }

async function Read(database) {
    const query = {
        sql: 'SELECT SingerId, AlbumId, AlbumTitle FROM Albums',
    };

    // Queries rows from the Albums table
    try {
        var numrows = 0
        const [rows] = await database.run(query);

        rows.forEach(row => {
            const json = row.toJSON();
            console.log(
            `test: ${json.test}`
            );
            numrows = numrows+1
        });

        console.log("read ${numrows} of data")
    } catch (err) {
        console.error('ERROR:', err);
    }
}
