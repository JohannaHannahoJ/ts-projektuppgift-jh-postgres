// Routes för att skapa, läsa, uppdatera och radera inlägg

const express = require("express");
const router = express.Router();
const client = require("../db");
const authenticateToken = require("../middleware/authenticateToken");

// skyddade routes
// hämta användarens kurser
router.get("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;// användar-id från autentiserad token

        const result = await client.query(
            "SELECT course_code, course_name, points, subject, syllabus FROM courses WHERE user_id = $1 ORDER BY added_at DESC", [userId]
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Serverfel" });
    }
});

// Lägg till ny kurs
router.post("/", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseCode, courseName, points, subject, syllabus } = req.body;

        if (!courseCode) {
            return res.status(400).json({ message: "Välj en kurs!" });
        }

        // lägg till validering för at kolla om kursen reedna finns..

        await client.query(
            "INSERT INTO courses (user_id, course_code, course_name, points, subject, syllabus) VALUES ($1, $2, $3, $4, $5, $6)", [userId, courseCode, courseName, points, subject, syllabus]
        );

        res.status(201).json({ message: courseName + " tillagd." });

    } catch (error) {
        if (error?.code === "23505"){
            res.status(400).json({ message: "Kurs redan tillagd" });
        } else {
            res.status(500).json({ message: "Serverfel" });
        }
        console.error(error);
    }
});

module.exports = router;