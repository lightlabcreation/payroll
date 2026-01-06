const db = require('./src/config/mysql');
async function run() {
    try {
        const [rows] = await db.query('SHOW TABLES');
        const tables = rows.map(t => Object.values(t)[0]);
        console.log('TABLES:', JSON.stringify(tables));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
run();
