const db = require('./src/config/mysql');
async function run() {
    const [users] = await db.query('SELECT id, name, email, role, company_id FROM users WHERE id IN (29, 31)');
    console.log('USERS:', JSON.stringify(users));
    process.exit(0);
}
run();
