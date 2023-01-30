import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise();

async function getRecords() {
    const [records] = await pool.query(`
    select *from
    session_23; `)
    return records;
}


// const result = await getRecords()
async function getIndividual(id) {
    const [record] = await pool.query(`
    select *from session_23
    where id = ?`, [id])
    return record[0];
}

// const result = await getIndividual('alfredchrisayo@gmail.com');

async function createRec(surname, firstname, email, password, matric, department, dob) {
    const [record] = await pool.query(`
    insert into session_23(surname, firstname, email, password, matric, department, dob, reg_tim)
    values(?,?,?,?,?,?,?,current_timestamp())`, [surname, firstname, email, password, matric, department, dob]);
    const id = record.insertId;
    return (getIndividual(id));
}

// const result = await createRec('Alexa', 'Honeydrop', 'honeyfoodl@info.co', 'qwerty1235', 'HND/33832', 'food engineering', '1994-09-12')

async function updateRec(surname, firstname, email) {
    const [record] = await pool.query(`
    update session_23
    set surname = ?,
    firstname = ?
    where email = ? `, [surname, firstname, email])
    return record;
}

// const result = await updateRec('Jolade', 'ismail', 'alfredchrisayo@gmail.com')

async function DeleteRec(email) {
    const [record] = await pool.query(`
    delete from session_23
    where email = ?`, [email])
    return record;

}
const result = await DeleteRec('alfredchrisayo@gmail.com');

console.log(result);
