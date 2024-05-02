module.exports = { Open, Read, Close }

function Open() {

    const projectId = 'GameHunter';
    const instanceId = 'game-hunter-db-5d65';
    const databaseId = '';
    
    // Imports the Google Cloud client library
    const {Spanner} = require('@google-cloud/spanner');

    // Creates a client
    const spanner = new Spanner({
        projectId: projectId,
    });

    // Gets a reference to a Cloud Spanner instance and database
    const instance = spanner.instance(instanceId);
    const database = instance.database(databaseId);

    return database
}

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

async function Close(database) {
    await database.close()
}
