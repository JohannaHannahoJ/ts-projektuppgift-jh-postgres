const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function install() {
    try {
        await client.connect();
        console.log("Ansluten till Render Postgres");

        const sql = `

            DROP TABLE IF EXISTS courses;

            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                account_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS courses (
                id SERIAL PRIMARY KEY,
                course_code VARCHAR(10) NOT NULL,
                course_name VARCHAR(100) NOT NULL,
                points DECIMAL(10,2) NOT NULL,
                subject VARCHAR(100) NOT NULL,
                syllabus VARCHAR(100) NOT NULL,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INTEGER NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                CONSTRAINT user_course UNIQUE (course_code,user_id)
            );

        `;

        await client.query(sql);
        console.log("Tabeller skapade"); // om lyckade tabeller

    } catch (error) {
        console.error(error); // logga ev fel

    } finally {
        await client.end(); // stäng databasen
    }
}

// anropa funktionen
install();