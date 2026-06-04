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
            'SELECT course_code as "courseCode", course_name as "courseName", points, subject, syllabus FROM courses WHERE user_id = $1 ORDER BY added_at DESC', [userId]
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

        await client.query(
            "INSERT INTO courses (user_id, course_code, course_name, points, subject, syllabus) VALUES ($1, $2, $3, $4, $5, $6)", [userId, courseCode, courseName, points, subject, syllabus]
        );

        res.status(201).json({ message: courseName + " tillagd." });

    } catch (error) {
        if (error?.code === "23505") {
            res.status(400).json({ message: "Kurs redan tillagd" });
        } else {
            res.status(500).json({ message: "Serverfel" });
        }
        console.error(error);
    }
});

// Ta bort kurs
router.delete("/:courseCode", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const courseCode = req.params.courseCode;

        if (!courseCode) {
            return res.status(400).json({ message: "Välj en kurs!" });
        }

        const result = await client.query(
            "DELETE FROM courses WHERE course_code = $1 AND user_id = $2",
            [courseCode, userId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Kurs hittades inte" });
        }

        res.json({ message: "Kurs borttagen" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Serverfel" });
    }

});


module.exports = router;