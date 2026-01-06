const db = require('./src/config/mysql');
async function run() {
    const [employers] = await db.query('SELECT * FROM employers');
    const [companies] = await db.query('SELECT * FROM companies');
    console.log('EMPLOYERS:', JSON.stringify(employers));
    console.log('COMPANIES:', JSON.stringify(companies));
    process.exit(0);
}
run();
